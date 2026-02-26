import { getUserById } from '$lib/auth.js';

export async function handle({ event, resolve }) {
	const session = event.cookies.get('session');
	
	if (session) {
		try {
			const userId = JSON.parse(session).userId;
			const user = await getUserById(userId);
			if (user) {
				event.locals.user = user;
			}
		} catch (err) {
			console.error('Session error:', err);
		}
	}
	
	return resolve(event);
}
