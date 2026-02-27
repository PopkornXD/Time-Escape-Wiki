import { createPool } from 'mariadb';

if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
	throw new Error('Missing required environment variables: DB_USER, DB_PASSWORD, and DB_NAME must be set');
}

const pool = createPool({
     host: process.env.DB_HOST, 
     port: parseInt(process.env.DB_PORT),
     user: process.env.DB_USER, 
     password: process.env.DB_PASSWORD,
     connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
     database: process.env.DB_NAME,
     acquireTimeout: 30000,
     idleTimeout: 600,
     minimumIdle: 2,
     connectionResetAfterClose: true
});

// Log pool stats periodically for debugging
if (process.env.NODE_ENV !== 'production') {
	setInterval(() => {
		console.log('Pool stats:', {
			total: pool.totalConnections(),
			active: pool.activeConnections(),
			idle: pool.idleConnections()
		});
	}, 30000); // Every 30 seconds
}

export default pool;