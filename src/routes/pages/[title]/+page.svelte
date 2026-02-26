
<script>
	export let data;
	
	let images = [];
	let selectedImage = null;
	
	$: {
		if (data.page.images) {
			try {
				images = JSON.parse(data.page.images);
			} catch (e) {
				console.error('Failed to parse images:', e);
				images = [];
			}
		}
	}
	
	function formatDate(dateString) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-GB', { 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
	
	function openLightbox(image) {
		selectedImage = image;
	}
	
	function closeLightbox() {
		selectedImage = null;
	}

</script>

<div class="container">
	<div class="header">
		<a href="/pages" class="back-link">← Back to All Pages</a>
	</div>
	
	<article class="page-detail">
		<h1 class="page-title">{data.page.title}</h1>
		
		<div class="page-meta">
			<span class="author">Editor: {data.page.author}</span>
			{#if data.page.created_at}
				<span class="date">Created: {formatDate(data.page.created_at)}</span>
			{/if}
			{#if data.page.updated_at && data.page.updated_at !== data.page.created_at}
				<span class="date">Updated: {formatDate(data.page.updated_at)}</span>
			{/if}
		</div>
		
		{#if images.length > 0}
			<div class="image-gallery">
				{#each images as image}
					<button class="image-item" onclick={() => openLightbox(image)} type="button">
						<img src={image} alt="" />
					</button>
				{/each}
			</div>
		{/if}
		
		<div class="page-content">
			{@html data.page.linkedContent}
		</div>

		{#if data.user?.is_admin}
			<br><br><br>
			<a href="/pages/{data.page.title}/edit" class="btn-edit">Edit Page</a>
		{/if}
	</article>
</div>


{#if selectedImage}
	<div class="lightbox" onclick={closeLightbox} role="button" tabindex="0" onkeydown={(e) => e.key === 'Escape' && closeLightbox()}>
		<button class="close-btn" onclick={closeLightbox} type="button">×</button>
		<img src={selectedImage} alt="Full size" />
	</div>
{/if}

<style>
	.container {
		max-width: 900px;
		margin: 0 auto;
		padding: 20px;
	}
	
	.header {
		margin-bottom: 30px;
	}
	
	.back-link {
		color: #2196F3;
		text-decoration: none;
		font-size: 14px;
		display: inline-flex;
		align-items: center;
		gap: 5px;
	}
	
	.back-link:hover {
		text-decoration: underline;
	}
	
	.page-detail {
		background-color: white;
		padding: 40px;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}
	
	.page-title {
		color: #333;
		font-size: 36px;
		margin: 0 0 20px 0;
		border-bottom: 3px solid #4CAF50;
		padding-bottom: 15px;
	}
	
	.page-meta {
		display: flex;
		gap: 20px;
		margin-bottom: 30px;
		padding-bottom: 20px;
		border-bottom: 1px solid #e0e0e0;
		flex-wrap: wrap;
	}
	
	.author {
		color: #2196F3;
		font-weight: 500;
	}
	
	.date {
		color: #888;
		font-size: 14px;
	}
	
	.page-content {
		color: #333;
		line-height: 1.8;
		font-size: 16px;
		white-space: pre-wrap;
		word-wrap: break-word;
	}
	
	.image-gallery {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 15px;
		margin: 30px 0;
	}
	
	.image-item {
		border: none;
		padding: 0;
		cursor: pointer;
		border-radius: 8px;
		overflow: hidden;
		transition: transform 0.2s;
		background: none;
		
	}
	
	.image-item:hover {
		transform: scale(1.05);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}
	
	.image-item img {
		width: 100%;
		height: 250px;
		object-fit: cover;
		display: block;
	}
	
	.lightbox {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.9);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
		cursor: pointer;
	}
	
	.lightbox img {
		max-width: 90%;
		max-height: 90%;
		object-fit: contain;
		border-radius: 4px;
	}
	
	.close-btn {
		position: absolute;
		top: 20px;
		right: 30px;
		font-size: 48px;
		color: white;
		background: none;
		border: none;
		cursor: pointer;
		z-index: 1001;
		line-height: 1;
		padding: 0;
		width: 48px;
		height: 48px;
	}
	
	.close-btn:hover {
		color: #ccc;
	}
	
	@media (max-width: 768px) {
		.page-detail {
			padding: 20px;
		}
		
		.page-title {
			font-size: 28px;
		}
		
		.image-gallery {
			grid-template-columns: 1fr;
		}
	}
</style>
