<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	
	export let form;
	
	let selectedFiles = [];
	let previews = [];
	
	function handleFileSelect(event) {
		selectedFiles = Array.from(event.target.files);
		
		previews = [];
		files.forEach(file => {
			const reader = new FileReader();
			reader.onload = (e) => {
				previews = [...previews, { name: file.name, url: e.target.result }];
			};
			reader.readAsDataURL(file);
		});
	}
	
	function removeFile(index) {
		selectedFiles = selectedFiles.filter((_, i) => i !== index);
		previews = previews.filter((_, i) => i !== index);
	}
	
	$: if (form?.success) {
		setTimeout(() => {
			goto('/pages');
		}, 1500);
	}
</script>

<div class="container">
	<h1>Create New Wiki Page</h1>
	
	{#if form?.error}
		<div class="error">{form.error}</div>
	{/if}
	
	{#if form?.success}
		<div class="success">
			{form.message}
			<br>
			<small>Redirecting to pages list...</small>
		</div>
	{/if}
	
	<form method="POST" enctype="multipart/form-data" use:enhance>
		<div class="form-group">
			<label for="title">Page Title</label>
			<input 
				type="text" 
				id="title" 
				name="title" 
				required 
				placeholder="Enter page title"
			/>
		</div>
		
		<div class="form-group">
			<label for="content">Content</label>
			<textarea 
				id="content" 
				name="content" 
				rows="15"
				required
				placeholder="Enter page content..."
			></textarea>
		</div>


        <div class="form-group">
			<label for="category">Category</label>
			<input 
				type="text" 
				id="category" 
				name="category" 
				required 
				placeholder="Enter the category of content"
			/>
		</div>
		
		<div class="form-group">
			<label for="images">Images (optional)</label>
			<input 
				type="file" 
				id="images" 
				name="images" 
				accept="image/*"
				multiple
				on:change={handleFileSelect}
			/>
			<small class="help-text">You can select multiple images. Supported formats: JPG, PNG, GIF, WebP</small>
		</div>
		
		{#if previews.length > 0}
			<div class="previews">
				<h3>Selected Images:</h3>
				<div class="preview-grid">
					{#each previews as preview, index}
						<div class="preview-item">
							<img src={preview.url} alt={preview.name} />
							<button type="button" class="remove-btn" on:click={() => removeFile(index)}>×</button>
							<p class="file-name">{preview.name}</p>
						</div>
					{/each}
				</div>
			</div>
		{/if}
		
		<div class="form-actions">
			<a href="/pages" class="btn-secondary">Cancel</a>
			<button type="submit" class="btn-primary">Create Page</button>
		</div>
	</form>
</div>

<style>
	.container {
		max-width: 900px;
		margin: 0 auto;
		padding: 20px;
        background-color: antiquewhite;
	}
	
	h1 {
		color: #333;
		border-bottom: 3px solid #4CAF50;
		padding-bottom: 10px;
		margin-bottom: 30px;
	}
	
	.form-group {
		margin-bottom: 20px;
	}
	
	label {
		display: block;
		margin-bottom: 8px;
		color: #555;
		font-weight: 500;
		font-size: 14px;
	}
	
	input, textarea {
		width: 100%;
		padding: 12px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 14px;
		font-family: inherit;
	}
	
	textarea {
		resize: vertical;
		min-height: 200px;
	}
	
	input:focus, textarea:focus {
		outline: none;
		border-color: #2196F3;
		box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
	}
	
	.form-actions {
		display: flex;
		gap: 10px;
		justify-content: flex-end;
		margin-top: 30px;
	}
	
	.btn-primary, .btn-secondary {
		padding: 12px 24px;
		border: none;
		border-radius: 4px;
		font-size: 16px;
		cursor: pointer;
		text-decoration: none;
		display: inline-block;
		transition: all 0.3s;
	}
	
	.btn-primary {
		background-color: #4CAF50;
		color: white;
	}
	
	.btn-primary:hover {
		background-color: #45a049;
	}
	
	.btn-secondary {
		background-color: #f5f5f5;
		color: #333;
		border: 1px solid #ddd;
	}
	
	.btn-secondary:hover {
		background-color: #e8e8e8;
	}
	
	.error {
		background-color: #ffebee;
		color: #d32f2f;
		padding: 12px;
		border-radius: 4px;
		margin-bottom: 20px;
	}
	
	.success {
		background-color: #e8f5e9;
		color: #2e7d32;
		padding: 12px;
		border-radius: 4px;
		margin-bottom: 20px;
	}
	
	.help-text {
		display: block;
		color: #666;
		font-size: 12px;
		margin-top: 5px;
	}
	
	.previews {
		margin: 20px 0;
		padding: 20px;
		background-color: #f9f9f9;
		border-radius: 4px;
	}
	
	.previews h3 {
		margin-top: 0;
		color: #333;
		font-size: 16px;
	}
	
	.preview-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: 15px;
		margin-top: 15px;
	}
	
	.preview-item {
		position: relative;
		border: 2px solid #ddd;
		border-radius: 4px;
		padding: 5px;
		background-color: white;
	}
	
	.preview-item img {
		width: 100%;
		height: 150px;
		object-fit: cover;
		border-radius: 2px;
	}
	
	.remove-btn {
		position: absolute;
		top: 10px;
		right: 10px;
		width: 25px;
		height: 25px;
		border-radius: 50%;
		background-color: #f44336;
		color: white;
		border: none;
		font-size: 18px;
		line-height: 1;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background-color 0.2s;
	}
	
	.remove-btn:hover {
		background-color: #d32f2f;
	}
	
	.file-name {
		margin: 5px 0 0;
		font-size: 12px;
		color: #666;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
