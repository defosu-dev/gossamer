import { supabaseServer } from '@/lib/supabase/supabaseServer';
import { addressSchema } from '@/lib/validator/user';
import type { AddressDTO } from '@/types/api';
import type { QueryData } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const queryBuilder = supabase
    .from('user_addresses')
    .select('*')
    .eq('user_id', user.id)
    .order('is_default', { ascending: false })
    .order('created_at', { ascending: false });

  type AddressResponse = QueryData<typeof queryBuilder>;

  const { data, error } = await queryBuilder;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const addressesRaw = data as AddressResponse;

  const addresses: AddressDTO[] = addressesRaw.map((addr) => ({
    id: addr.id,
    title: addr.title,
    addressLine1: addr.address_line1,
    addressLine2: addr.address_line2,
    city: addr.city,
    state: addr.state,
    zipCode: addr.zip_code,
    country: addr.country,
    phone: addr.phone,
    isDefault: addr.is_default ?? false,
  }));

  return NextResponse.json(addresses);
}

export async function POST(request: NextRequest) {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const validatedData = addressSchema.parse(body);

    if (validatedData.isDefault) {
      await supabase.from('user_addresses').update({ is_default: false }).eq('user_id', user.id);
    } else {
      const { count } = await supabase
        .from('user_addresses')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);
      if (count === 0) validatedData.isDefault = true;
    }

    const { error } = await supabase.from('user_addresses').insert({
      user_id: user.id,
      title: validatedData.title,
      address_line1: validatedData.addressLine1,
      address_line2: validatedData.addressLine2 || null,
      city: validatedData.city,
      state: validatedData.state || null,
      zip_code: validatedData.zipCode,
      country: validatedData.country,
      phone: validatedData.phone || null,
      is_default: validatedData.isDefault,
    });

    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to add address' }, { status: 500 });
  }
}
