-- ====================================================================
-- SUPABASE DATABASE SCHEMA: Princess Anne B. Azucena Portfolio
-- ====================================================================

-- 1. Create table for contact messages / inquiries
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' NOT NULL, -- 'unread', 'read', 'responded'
    ip_address TEXT,
    user_agent TEXT
);

-- 2. Enable Row-Level Security (RLS)
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- 3. Allow anonymous public users to submit new inquiries (INSERT only)
CREATE POLICY "Public can insert contact messages"
ON public.contact_inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. Allow only authenticated admin users to read and update inquiries
CREATE POLICY "Admins can view contact inquiries"
ON public.contact_inquiries
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can update contact inquiries"
ON public.contact_inquiries
FOR UPDATE
TO authenticated
USING (true);

-- 5. Optional Index for query performance
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at
ON public.contact_inquiries(created_at DESC);
