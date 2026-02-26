import { redirect, fail } from '@sveltejs/kit';
import pool from '$lib/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function load({ locals }) {
	if (!locals.user || !locals.user.is_admin) {
		throw redirect(303, '/');
	}
	
	return {
		user: locals.user
	};
}

export const actions = {
	default: async ({ request, locals }) => {
		if (!locals.user || !locals.user.is_admin) {
			return fail(403, { error: 'Unauthorized' });
		}
		
		const data = await request.formData();
		const title = data.get('title');
		const content = data.get('content');
        const category = data.get('category');
		const imageFiles = data.getAll('images');
		
		if (!title || !content) {
			return fail(400, { error: 'Title and content are required' });
		}
		
		const imagePaths = [];
		const uploadsDir = path.join(process.cwd(), 'static', 'uploads');
		
		if (!fs.existsSync(uploadsDir)) {
			fs.mkdirSync(uploadsDir, { recursive: true });
		}
		
		for (const file of imageFiles) {
			if (!file || file.size === 0) continue;
			
			const timestamp = Date.now();
			const randomStr = Math.random().toString(36).substring(2, 8);
			const ext = path.extname(file.name);
			const filename = `${timestamp}-${randomStr}${ext}`;
			const filepath = path.join(uploadsDir, filename);
			
			const buffer = Buffer.from(await file.arrayBuffer());
			fs.writeFileSync(filepath, buffer);
			
			imagePaths.push(`/uploads/${filename}`);
		}
		
		let conn;
		try {
			conn = await pool.getConnection();
			
			const imagesJson = imagePaths.length > 0 ? JSON.stringify(imagePaths) : null;
			
			await conn.query(
				"INSERT INTO page (title, content, category, images, author) VALUES (?, ?, ?, ?, ?)",
				[title, content, category, imagesJson, locals.user.username]
			);
			
			return { success: true, message: 'Page created successfully!' };
		} catch (err) {
			console.error(err);
			return fail(500, { error: 'Failed to create page' });
		} finally {
			if (conn) conn.end();
		}
	}
};

