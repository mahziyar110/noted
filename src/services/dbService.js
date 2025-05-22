import { supabase } from "./supabaseClient";

export const getRowsFromTableByUserId = async (
  table,
  userId,
  page = 0,
  limit = 50,
  orderBy = "created_at",
  ascOrder = false
) => {
  const from = page * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from(table)
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .order(orderBy, { ascending: ascOrder })
    .range(from, to);

  if (error) throw error;
  return { data, count };
};

export const addRowInTable = async (table, dataObj) => {
  const { data, error } = await supabase
    .from(table)
    .insert(dataObj)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateRowInTableById = async (table, id, dataObj) => {
  const { data, error } = await supabase
    .from(table)
    .update(dataObj)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteRowInTableById = async (table, id) => {
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error;
};
