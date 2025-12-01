import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const database = createClient('https://rvxdszfrgrnfjhqhhhri.supabase.co',
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2eGRzemZyZ3JuZmpocWhoaHJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3ODkyNjYsImV4cCI6MjA3OTM2NTI2Nn0.8dNdhKr2DGVrtu7jz_yYPPmV06vEHk6Ecv8vj-0azJ4');
export default database;
