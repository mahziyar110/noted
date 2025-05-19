import { supabase } from "./supabaseClient";

export const getRowsFromTableByUserId = async (
  table,
  userId,
  orderBy = "created_at",
  ascOrder = false
) => {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("user_id", userId)
    .order(orderBy, { ascending: ascOrder });

  if (error) throw error;
  return data;
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
