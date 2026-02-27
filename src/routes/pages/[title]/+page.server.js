import pool from '$lib/db.js';
import { error } from '@sveltejs/kit';

export async function load({ params, locals }) {
	const pageTitle = params.title;
    console.log(pageTitle);
	
	let conn;
	try {
		conn = await pool.getConnection();
		const pages = await conn.query("SELECT * FROM page WHERE title = ?", [pageTitle]);
		
		if (pages.length === 0) {
			throw error(404, 'Page not found');
		}
		
		const allPages = await conn.query("SELECT title FROM page");
		const pageTitles = allPages.map(p => p.title);
		
		let content = String(pages[0].content);
		
		pageTitles.sort((a, b) => b.length - a.length);
		
		for (const title of pageTitles) {
			if (title === pageTitle) continue;
			
			const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
			
			const regex = new RegExp(`(^|\\s)(${escapedTitle})(\\s|$|\\b)`, 'gi');
			
			content = content.replace(regex, (match, before, matchedTitle, after, offset) => {
				const beforeContent = content.substring(0, offset);
				const lastOpenTag = beforeContent.lastIndexOf('<a ');
				const lastCloseTag = beforeContent.lastIndexOf('</a>');
				
				if (lastOpenTag > lastCloseTag) {
					return match;
				}
				
				return `${before}<a href="/pages/${matchedTitle}">${matchedTitle}</a>${after}`;
			});
		}
		
		return {
			page: {
				...pages[0],
				linkedContent: content
			},
			user: locals.user
		};
	} catch (err) {
		console.error(err);
		throw error(500, 'Failed to load page');
	} finally {
		if (conn) conn.release();
	}
}


