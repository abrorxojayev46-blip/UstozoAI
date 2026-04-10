import { createClient } from '@supabase/supabase-js'

// Bularni Supabase Settings -> API bo'limidan olasiz
const supabaseUrl = 'https://nyqsjlhrnehujxtfumzx.supabase.co'
const supabaseAnonKey = 'sb_publishable_Ke26KPMyo0OnTzKE0DIdeA_vS_npzY1'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)