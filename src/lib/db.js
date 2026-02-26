import mariadb from 'mariadb';

if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
	throw new Error('Missing required environment variables: DB_USER, DB_PASSWORD, and DB_NAME must be set');
}

const pool = mariadb.createPool({
     host: process.env.DB_HOST, 
     user: process.env.DB_USER, 
     password: process.env.DB_PASSWORD,
     connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '5'),
     database: process.env.DB_NAME
});

export default pool;