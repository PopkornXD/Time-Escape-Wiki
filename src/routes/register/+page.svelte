<script>
	import { enhance } from '$app/forms';
	
	export let form;
</script>

<div class="container">
	<div class="auth-box">
		<h1>Register</h1>
		
		{#if form?.error}
			<div class="error">{form.error}</div>
		{/if}
		
		{#if form?.success}
			<div class="success">Account created! Redirecting to login...</div>
		{/if}
		
		<form method="POST" use:enhance>
			<div class="form-group">
				<label for="username">Username</label>
				<input 
					type="text" 
					id="username" 
					name="username" 
					required 
					minlength="3"
					autocomplete="username"
				/>
			</div>
			
			<div class="form-group">
				<label for="email">Email</label>
				<input 
					type="email" 
					id="email" 
					name="email" 
					required 
					autocomplete="email"
				/>
			</div>
			
			<div class="form-group">
				<label for="password">Password</label>
				<input 
					type="password" 
					id="password" 
					name="password" 
					required 
					minlength="6"
					autocomplete="new-password"
				/>
			</div>
			
			<button type="submit">Register</button>
		</form>
		
		<p class="switch-auth">
			Already have an account? <a href="/login">Login</a>
		</p>
	</div>
</div>

<style>
	.container {
		max-width: 400px;
		margin: 50px auto;
		padding: 20px;
	}
	
	.auth-box {
		background: white;
		padding: 40px;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}
	
	h1 {
		color: #333;
		text-align: center;
		margin-bottom: 30px;
	}
	
	.form-group {
		margin-bottom: 20px;
	}
	
	label {
		display: block;
		margin-bottom: 5px;
		color: #555;
		font-weight: 500;
	}
	
	input {
		width: 100%;
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 14px;
	}
	
	input:focus {
		outline: none;
		border-color: #2196F3;
	}
	
	button {
		width: 100%;
		padding: 12px;
		background-color: #4CAF50;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 16px;
		cursor: pointer;
		transition: background-color 0.3s;
	}
	
	button:hover {
		background-color: #45a049;
	}
	
	.error {
		background-color: #ffebee;
		color: #d32f2f;
		padding: 10px;
		border-radius: 4px;
		margin-bottom: 20px;
		text-align: center;
	}
	
	.success {
		background-color: #e8f5e9;
		color: #2e7d32;
		padding: 10px;
		border-radius: 4px;
		margin-bottom: 20px;
		text-align: center;
	}
	
	.switch-auth {
		text-align: center;
		margin-top: 20px;
		color: #666;
	}
	
	.switch-auth a {
		color: #2196F3;
		text-decoration: none;
	}
	
	.switch-auth a:hover {
		text-decoration: underline;
	}
</style>
