import pool from '$lib/db.js';

export async function load({ locals }) {
	let conn;
	try {
		conn = await pool.getConnection();
		const pages = await conn.query("SELECT * FROM page");
		return {
			pages: pages,
			user: locals.user || null
		};
	} catch (err) {
		console.error(err);
		return {
			pages: [],
			error: 'Failed to load pages from database',
			user: locals.user || null
		};
	} finally {
		if (conn) conn.end();
	}
}
