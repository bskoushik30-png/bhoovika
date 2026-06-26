# Deployment Guide

## 1. Create Supabase project
Create a Supabase project and open the SQL editor.

## 2. Create ERP table
Run the SQL from `supabase-schema.sql`.

## 3. Add Vercel environment variables
Add these values in Vercel project settings:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ERP_SESSION_SECRET`

Use a long random value for `ERP_SESSION_SECRET`.

## 4. Login credentials
The app is locked to one user:

- Email: `bskoushik06@gmail.com`
- Password: `admin@123`

## 5. Deploy
Run a normal Vercel deploy from this repo.

## 6. Verify after deploy
Check these flows:

- Open `/login`
- Sign in with the fixed credentials
- Add a product or customer
- Open the app in another browser or device
- Confirm the same ERP data appears there too

## Notes
- ERP records are stored in Supabase through the server API, so they are shared across browsers.
- The Supabase service role key must stay only in server-side environment variables. Do not expose it in client code.
