<script>
	import '../app.css';
	
	export let data;
</script>

<div class="header">
	<a href="/"><h1>Time Escape Wiki</h1></a>
	
	<div class="user-info">
		{#if data.user}
			<span>Welcome, {data.user.username}!</span>
			<a href="/logout" class="logout-btn">Logout</a>
		{:else}
			<a href="/login" class="login-btn">Login</a>
			<a href="/register" class="register-btn">Register</a>
		{/if}
	</div>
</div>

<slot />

<footer class="footer">
	<div class="footer-content">
		<p>&copy; {new Date().getFullYear()} Time Escape Wiki. All rights reserved.</p>
		<div class="footer-links">
			<a href="/privacy_policy">Privacy Policy</a>
			<span class="separator">•</span>
			<a href="mailto:iver.espolin.johnson@gmail.com">Contact</a>
		</div>
	</div>
</footer>

<style>
	.header {
		position: sticky;
		top: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100vw;
		background-color: antiquewhite;
		padding: 20px;
		margin-bottom: 20px;
		z-index: 100;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	h1 {
		color: #333;
		border-bottom: 3px solid #4CAF50;
		padding-bottom: 10px;
		margin: 0;
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.user-info span {
		color: #555;
		margin-right: 10px;
	}

	.login-btn, .register-btn, .logout-btn {
		padding: 8px 16px;
		text-decoration: none;
		border-radius: 4px;
		transition: background-color 0.3s;
		font-size: 14px;
	}

	.login-btn {
		background-color: #2196F3;
		color: white;
	}

	.login-btn:hover {
		background-color: #1976D2;
	}

	.register-btn {
		background-color: #4CAF50;
		color: white;
	}

	.register-btn:hover {
		background-color: #45a049;
	}

	.logout-btn {
		background-color: #f44336;
		color: white;
	}

	.logout-btn:hover {
		background-color: #d32f2f;
	}

	a {
		text-decoration: none;
	}

	.footer {
		background-color: #2c3e50;
		color: #ecf0f1;
		padding: 20px;
		margin-top: 40px;
		text-align: center;
		width: 100vw;
	}

	.footer-content {
		max-width: 1200px;
		margin: 0 auto;
	}

	.footer-content p {
		margin: 0 0 10px 0;
		font-size: 14px;
	}

	.footer-links {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		font-size: 14px;
	}

	.footer-links a {
		color: #3498db;
		text-decoration: none;
		transition: color 0.3s;
	}

	.footer-links a:hover {
		color: #5dade2;
		text-decoration: underline;
	}

	.separator {
		color: #7f8c8d;
	}
</style>

