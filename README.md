# Time Escape Wiki

A wiki for my game Time Escape, using an external database hosted on a virtual machine, and deployed with Cloudflare at my private domain: 

**https://espolin.dev/**

The login feature enables admins to further develop the wiki by creating, editing, or deleting pages using built-in UI. This allows me (the developer) to outsource work on the content of the wiki through a rigorous easy-to-use framework, instead of having them meddle in the database or code directly. However, pull requests are still welcome if it is pertaining to the UI or UX of the website.

If you would like to be an admin and contribute to the content of the wiki, you can contact me through email: iver.espolin.johnson@gmail.com

## Features

- **User Authentication**: Secure login and registration system with bcrypt password hashing
- **Page Management**: Create, edit, and view wiki pages with a clean interface
- **Image Uploads**: Support for uploading and embedding images in wiki pages
- **External Database**: MariaDB database hosted on a separate virtual machine for scalability
- **Modern Stack**: Built with SvelteKit 5 for optimal performance and developer experience
- **Cloudflare Tunnel**: Secure reverse proxy deployment without exposing server IP

## Tech Stack

- **Frontend**: SvelteKit 5, Svelte 5
- **Backend**: SvelteKit server-side routes
- **Database**: MariaDB
- **Authentication**: Custom auth with bcrypt
- **Process Manager**: PM2
- **Deployment**: Cloudflare Tunnel (Zero Trust) with reverse proxy
- **Build Tool**: Vite 6

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Access to a MariaDB database
- PM2 installed globally (`npm install -g pm2`)
- Cloudflare account with Tunnel configured

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/PopkornXD/Time-Escape-Wiki.git
cd Time-Escape-Wiki
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory with your database credentials:
```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=3306
```

### Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building

Build the application for production:
```bash
npm run build
```

### Preview

Preview the production build locally:
```bash
npm run preview
```

### Deployment

The application is deployed using PM2 for process management and Cloudflare Tunnel for secure reverse proxying:

1. **Build the application**:
```bash
npm run build
```

2. **Start with PM2**:
```bash
pm2 start npm --name "time-escape-wiki" -- start
pm2 save
pm2 startup
```

3. **Configure Cloudflare Tunnel**:
   - Install `cloudflared`: Follow [Cloudflare's installation guide](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/)
   - Create a tunnel: `cloudflared tunnel create time-escape-wiki`
   - Configure the tunnel to proxy to your local server (default: `localhost:3000`)
   - Route your domain through the tunnel in Cloudflare Zero Trust dashboard

4. **Manage PM2 process**:
```bash
pm2 list              # View running processes
pm2 logs              # View logs
pm2 restart all       # Restart application
pm2 stop all          # Stop application
```

## Project Structure

```
Time-Escape-Wiki/
├── src/
│   ├── lib/
│   │   ├── auth.js          # Authentication utilities
│   │   └── db.js            # Database connection
│   ├── routes/
│   │   ├── login/           # Login page
│   │   ├── register/        # Registration page
│   │   ├── logout/          # Logout endpoint
│   │   └── pages/           # Wiki pages
│   │       ├── [title]/     # Individual page view
│   │       │    └── edit/   # Page editing
│   │       └── new/         # New page creation
│   ├── app.css              # Global styles
│   └── app.html             # HTML template
├── static/
│   └── uploads/             # Uploaded images
├── package.json
├── svelte.config.js
└── vite.config.js
```

## License

ISC

## Links

- Live Site: [https://espolin.dev/](https://espolin.dev/)
- Repository: [https://github.com/PopkornXD/Time-Escape-Wiki](https://github.com/PopkornXD/Time-Escape-Wiki)
