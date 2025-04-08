import { useMemo } from 'react';
import { getSupabaseBrowserClient } from '../supabase/supabaseClient';

function useSupabase() {
 return useMemo(getSupabaseBrowserClient, []);
}

export default useSupabase;
