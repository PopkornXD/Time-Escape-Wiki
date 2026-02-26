# Time Escape Wiki

A modern wiki application built with SvelteKit and MariaDB.

## Features

- 📝 View and manage wiki pages
- 🔐 User authentication (login/register)
- � Admin-only page creation
- �💾 MariaDB database integration
- ⚡ Fast and responsive SvelteKit frontend

## Project Structure

```
TimeEscapeWiki/
├── database/
│   └── schema.sql         # Database schema
├── src/
│   ├── lib/
│   │   ├── auth.js        # Authentication utilities
│   │   └── db.js          # Database connection pool
│   ├── routes/
│   │   ├── +layout.svelte      # Layout wrapper
│   │   ├── +page.svelte        # Home page
│   │   ├── +page.server.js     # Home page server logic
│   │   ├── login/              # Login page
│   │   ├── register/           # Registration page
│   │   ├── logout/             # Logout endpoint
│   │   └── pages/              # Wiki pages listing
│   ├── app.css            # Global styles
│   ├── app.html           # HTML template
│   └── hooks.server.js    # Server hooks (session)
├── static/                # Static assets
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies
├── svelte.config.js       # SvelteKit config
├── vite.config.js         # Vite config
└── README.md              # This file
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure database:**
   - Copy `.env.example` to `.env` and update credentials
   - Or directly update credentials in `src/lib/db.js`
   - Run the schema file to create tables:
     ```bash
     mysql -u username -p database_name < database/schema.sql
     ```
   - If updating existing database, add admin column:
     ```bash
     mysql -u username -p database_name < database/add_admin.sql
     ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Visit:** http://localhost:5173

## Admin Setup

To create wiki pages, you need admin access:

1. **Register a regular account** at `/register`
2. **Make your account admin:**
   ```bash
   mysql -u username -p database_name
   ```
   ```sql
   UPDATE users SET is_admin = TRUE WHERE username = 'your_username';
   ```
   Or use the helper script:
   ```bash
   # Edit database/make_admin.sql first
   mysql -u username -p database_name < database/make_admin.sql
   ```
3. **Log out and log back in** to activate admin privileges
4. **Create pages** at `/pages/new` (only visible to admins)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Tech Stack

- **Frontend:** SvelteKit 2.x, Svelte 5.x
- **Backend:** SvelteKit server routes
- **Database:** MariaDB
- **Authentication:** bcrypt for password hashing
- **Build Tool:** Vite 6.x
