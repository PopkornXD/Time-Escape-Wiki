<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	
	export let data;
	export let form;
	
	let selectedFiles = [];
	let previews = [];
	let existingImages = [];
	let showDeleteConfirm = false;
	
	// Parse existing images
	$: {
		if (data.page.images) {
			try {
				existingImages = JSON.parse(data.page.images);
			} catch (e) {
				existingImages = [];
			}
		}
	}
	
	function handleFileSelect(event) {
		selectedFiles = Array.from(event.target.files);
		
		previews = [];
		selectedFiles.forEach(file => {
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
	
	function confirmDelete() {
		showDeleteConfirm = true;
	}
	
	function cancelDelete() {
		showDeleteConfirm = false;
	}
	
	$: if (form?.success) {
		setTimeout(() => {
			goto(`/pages/${form.newTitle || data.page.title}`);
		}, 1500);
	}
</script>

<div class="container">
	<h1>Edit Wiki Page</h1>
	
	{#if form?.error}
		<div class="error">{form.error}</div>
	{/if}
	
	{#if form?.success}
		<div class="success">
			{form.message}
			<br>
			<small>Redirecting to page...</small>
		</div>
	{/if}
	
	<form method="POST" action="?/update" enctype="multipart/form-data" use:enhance>
		<div class="form-group">
			<label for="title">Page Title</label>
			<input 
				type="text" 
				id="title" 
				name="title" 
				required 
				placeholder="Enter page title"
				value={data.page.title}
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
				value={data.page.content}
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
				value={data.page.category}
			/>
		</div>
		
		{#if existingImages.length > 0}
			<div class="existing-images">
				<h3>Current Images:</h3>
				<div class="preview-grid">
					{#each existingImages as image}
						<div class="preview-item">
							<img src={image} alt="" />
						</div>
					{/each}
				</div>
			</div>
		{/if}
		
		<div class="form-group">
			<label for="images">Add More Images (optional)</label>
			<input 
				type="file" 
				id="images" 
				name="images" 
				accept="image/*"
				multiple
				on:change={handleFileSelect}
			/>
			<small class="help-text">Add additional images. Existing images will be kept. Supported formats: JPG, PNG, GIF, WebP</small>
		</div>
		
		{#if previews.length > 0}
			<div class="previews">
				<h3>New Images to Add:</h3>
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
			<button type="button" class="btn-danger" on:click={confirmDelete}>Delete Page</button>
			<a href="/pages/{data.page.title}" class="btn-secondary">Cancel</a>
			<button type="submit" class="btn-primary">Update Page</button>
		</div>
	</form>
	
	{#if showDeleteConfirm}
		<div class="modal-overlay" on:click={cancelDelete} on:keydown={(e) => e.key === 'Escape' && cancelDelete()} role="button" tabindex="0">
			<div class="modal" on:click|stopPropagation on:keydown|stopPropagation role="dialog" tabindex="-1">
				<h2>Confirm Delete</h2>
				<p>Are you sure you want to delete the page "<strong>{data.page.title}</strong>"?</p>
				<p class="warning-text">This action cannot be undone. All images will also be deleted.</p>
				<div class="modal-actions">
					<button type="button" class="btn-secondary" on:click={cancelDelete}>Cancel</button>
					<form method="POST" action="?/delete" use:enhance>
						<button type="submit" class="btn-danger">Delete Permanently</button>
					</form>
				</div>
			</div>
		</div>
	{/if}
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
	
	.btn-primary, .btn-secondary, .btn-danger {
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

	.btn-danger {
		background-color: #d32f2f;
		color: white;
	}
	
	.btn-danger:hover {
		background-color: #b71c1c;
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
	
	.existing-images {
		margin: 20px 0;
		padding: 20px;
		background-color: #f0f8ff;
		border-radius: 4px;
		border: 1px solid #2196F3;
	}
	
	.existing-images h3 {
		margin-top: 0;
		color: #2196F3;
		font-size: 16px;
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
	
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}
	
	.modal {
		background-color: white;
		padding: 30px;
		border-radius: 8px;
		max-width: 500px;
		width: 90%;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
	}
	
	.modal h2 {
		margin-top: 0;
		color: #d32f2f;
		border-bottom: 2px solid #d32f2f;
		padding-bottom: 10px;
	}
	
	.modal p {
		line-height: 1.6;
		color: #333;
	}
	
	.warning-text {
		color: #d32f2f;
		font-weight: 500;
		font-style: italic;
	}
	
	.modal-actions {
		display: flex;
		gap: 10px;
		justify-content: flex-end;
		margin-top: 20px;
	}
	
	.modal-actions form {
		display: inline;
	}
</style>
