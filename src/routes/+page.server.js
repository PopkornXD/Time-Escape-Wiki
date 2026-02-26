import pool from '$lib/db.js';

export async function load({ locals }) {
	let conn;
	try {
		conn = await pool.getConnection();
		const categories = await conn.query("SELECT DISTINCT category FROM page");

		let categories_map = {};
		
		for (let category of categories){
			category = category.category;
			let matching_pages = await conn.query("SELECT * FROM page WHERE category = ?", category);
			categories_map[category] = matching_pages;

		};


		return {
			category: categories_map,
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