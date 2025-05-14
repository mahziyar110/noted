import { supabase } from "./supabaseClient";

// Get all notes for current user
export const getNotes = async (userId) => {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

// Add a new note
export const addNote = async (userId, title, content) => {
  const { data, error } = await supabase
    .from("notes")
    .insert({ user_id: userId, title, content })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Update an existing note
export const updateNote = async (noteId, title, content) => {
  const { data, error } = await supabase
    .from("notes")
    .update({ title, content })
    .eq("id", noteId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Delete a note
export const deleteNote = async (noteId) => {
  const { error } = await supabase.from("notes").delete().eq("id", noteId);
  if (error) throw error;
};
