import type { Database } from "@/types/supabase";
import { supabaseServer } from "../supabaseServer";

type OrderInsert = Omit<
  Database["public"]["Tables"]["orders"]["Insert"],
  "created_at"
>;

export const createOrder = async (data: OrderInsert) => {
  const supabase = await supabaseServer();
  return supabase.from("orders").insert(data).select().single();
};
