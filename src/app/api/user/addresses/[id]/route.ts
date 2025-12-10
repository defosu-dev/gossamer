import { supabaseServer } from '@/lib/supabase/supabaseServer';
import { addressSchema } from '@/lib/validator/user';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const validatedData = addressSchema.partial().parse(body);

    if (validatedData.isDefault) {
      await supabase
        .from('user_addresses')
        .update({ is_default: false })
        .eq('user_id', user.id)
        .neq('id', id);
    }

    const { error } = await supabase
      .from('user_addresses')
      .update({
        title: validatedData.title,
        address_line1: validatedData.addressLine1,
        address_line2: validatedData.addressLine2,
        city: validatedData.city,
        state: validatedData.state,
        zip_code: validatedData.zipCode,
        country: validatedData.country,
        phone: validatedData.phone,
        is_default: validatedData.isDefault,
      })
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { error } = await supabase
    .from('user_addresses')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
