import { verifyUser } from '$lib/auth.js';
import { redirect, fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');
		
		if (!username || !password) {
			return fail(400, { error: 'Username and password are required' });
		}
		
		const result = await verifyUser(username, password);
		
		if (!result.success) {
			return fail(401, { error: result.error });
		}
		
		cookies.set('session', JSON.stringify({ userId: result.user.id }), {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 99999999
		});
		
		throw redirect(303, '/');
	}
};
