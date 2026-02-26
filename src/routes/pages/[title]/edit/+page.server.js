import { redirect, fail } from '@sveltejs/kit';
import pool from '$lib/db.js';
import fs from 'fs';
import path from 'path';

export async function load({ params, locals }) {
	if (!locals.user || !locals.user.is_admin) {
		throw redirect(303, '/');
	}
	
	const pageTitle = params.title;
	
	let conn;
	try {
		conn = await pool.getConnection();
		const pages = await conn.query("SELECT * FROM page WHERE title = ?", [pageTitle]);
		
		if (pages.length === 0) {
			throw redirect(303, '/pages');
		}
		
		return {
			page: pages[0],
			user: locals.user
		};
	} catch (err) {
		console.error(err);
		throw redirect(303, '/pages');
	} finally {
		if (conn) conn.end();
	}
}

export const actions = {
	update: async ({ request, locals, params }) => {
		if (!locals.user || !locals.user.is_admin) {
			return fail(403, { error: 'Unauthorized' });
		}
		
		const pageTitle = params.title;
		const data = await request.formData();
		const title = data.get('title');
		const content = data.get('content');
		const category = data.get('category');
		const imageFiles = data.getAll('images');
		
		if (!title || !content) {
			return fail(400, { error: 'Title and content are required' });
		}
		
		const newImagePaths = [];
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
			
			newImagePaths.push(`/uploads/${filename}`);
		}
		
		let conn;
		try {
			conn = await pool.getConnection();
			
			const existingPages = await conn.query("SELECT images FROM page WHERE title = ?", [pageTitle]);
			let allImages = [];
			
			if (existingPages.length > 0 && existingPages[0].images) {
				try {
					allImages = JSON.parse(existingPages[0].images);
				} catch (e) {
					allImages = [];
				}
			}
			
			allImages = [...allImages, ...newImagePaths];
			
			const imagesJson = allImages.length > 0 ? JSON.stringify(allImages) : null;
			
			await conn.query(
				"UPDATE page SET title = ?, content = ?, category = ?, images = ?, author = ? WHERE title = ?",
				[title, content, category, imagesJson, locals.user.username, pageTitle]
			);
			
			return { success: true, message: 'Page updated successfully!', newTitle: title };
		} catch (err) {
			console.error(err);
			return fail(500, { error: 'Failed to update page' });
		} finally {
			if (conn) conn.end();
		}
	},
	
	delete: async ({ locals, params }) => {
		if (!locals.user || !locals.user.is_admin) {
			return fail(403, { error: 'Unauthorized' });
		}
		
		const pageTitle = params.title;
		
		let conn;
		try {
			conn = await pool.getConnection();
			
			const pages = await conn.query("SELECT images FROM page WHERE title = ?", [pageTitle]);
			
			if (pages.length > 0 && pages[0].images) {
				try {
					const images = JSON.parse(pages[0].images);
					const uploadsDir = path.join(process.cwd(), 'static');
					
					for (const imagePath of images) {
						const filepath = path.join(uploadsDir, imagePath);
						if (fs.existsSync(filepath)) {
							fs.unlinkSync(filepath);
						}
					}
				} catch (e) {
					console.error('Error deleting images:', e);
				}
			}
			
			await conn.query("DELETE FROM page WHERE title = ?", [pageTitle]);
			
			throw redirect(303, '/pages');
		} catch (err) {
			if (err.status === 303) throw err;
			console.error(err);
			return fail(500, { error: 'Failed to delete page' });
		} finally {
			if (conn) conn.end();
		}
	}
};

