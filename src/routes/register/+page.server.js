import { createUser } from '$lib/auth.js';
import { redirect, fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const email = data.get('email');
		const password = data.get('password');
		
		if (!username || !email || !password) {
			return fail(400, { error: 'All fields are required' });
		}
		
		const result = await createUser(username, password, email);
		
		if (!result.success) {
			return fail(400, { error: result.error });
		}
		
		throw redirect(303, '/login');
	}
};
