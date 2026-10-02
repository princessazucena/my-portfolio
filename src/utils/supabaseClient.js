import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

/**
 * Save contact inquiry to Supabase database
 */
export async function submitContactInquiry({ name, email, subject, message }) {
  if (!supabase) {
    // If Supabase is not yet configured, return mock success
    console.warn('Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env');
    return { success: true, mode: 'local' };
  }

  try {
    const { data, error } = await supabase
      .from('contact_inquiries')
      .insert([
        {
          name,
          email,
          subject: subject || 'General Inquiry',
          message,
          status: 'unread',
        },
      ]);

    if (error) throw error;
    return { success: true, data, mode: 'supabase' };
  } catch (err) {
    console.error('Error sending inquiry to Supabase:', err);
    return { success: false, error: err.message };
  }
}
