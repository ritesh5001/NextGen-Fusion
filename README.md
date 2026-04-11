
This project is a design agency website built with Next.js.

## Admin Login

The site now includes a MongoDB-backed admin login flow.

### Routes

- `/login` - admin sign-in page
- `/admin` - protected dashboard shell
- `/api/auth/login` - validates credentials and sets the session cookie
- `/api/auth/logout` - clears the session cookie
- `/api/auth/me` - returns the current admin session state

### Environment

Copy [.env.example](.env.example) to `.env.local` and set these values:

- `MONGODB_URI`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_NAME` optional
- `NEXT_PUBLIC_SITE_URL` optional

### Local setup

1. Install dependencies with `npm install`.
2. Configure `.env.local`.
3. Run `npm run dev`.
4. Visit `/login` and sign in with the seeded admin credentials.

The admin session is stored in an httpOnly cookie and the password is hashed before it is stored in MongoDB.




