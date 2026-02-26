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
</style>

