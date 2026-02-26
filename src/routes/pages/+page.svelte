<script>
	
	export let data;
	
	let searchQuery = '';
	
	$: filteredPages = data.pages.filter(page => 
		page.title.toLowerCase().includes(searchQuery.toLowerCase())
	);
	
	function cutWords(text, maxWords = 50) {
		if (!text) return '';
		const words = text.trim().split(/\s+/);
		if (words.length <= maxWords) return text;
		return words.slice(0, maxWords).join(' ') + '...';
	}
	
	function shouldShowReadMore(text, maxWords = 50) {
		if (!text) return false;
		const words = text.trim().split(/\s+/);
		return words.length > maxWords;
	}
	
	function formatDate(dateString) {
		if (!dateString) return 'Unknown date';
		const date = new Date(dateString);
		return date.toLocaleDateString('en-GB', { 
			year: 'numeric', 
			month: 'short', 
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
	
	function getFirstImage(imagesJson) {
		if (!imagesJson) return null;
		try {
			const images = JSON.parse(imagesJson);
			return images.length > 0 ? images[0] : null;
		} catch (e) {
			console.error('Failed to parse images:', e);
			return null;
		}
	}
</script>

<div class="container">
	<div class="header">
		<a href="/" class="back-link">← Back to Home</a>
		{#if data.user?.is_admin}
			<a href="/pages/new" class="btn-create">+ Create New Page</a>
		{/if}
	</div>
	
	<h1>All Wiki Pages</h1>
	
	<div class="search-container">
		<input 
			type="text" 
			bind:value={searchQuery} 
			placeholder="Search pages by title..." 
			class="search-input"
		/>
		{#if searchQuery}
			<span class="search-results-count">
				Found {filteredPages.length} page{filteredPages.length !== 1 ? 's' : ''}
			</span>
		{/if}
	</div>

	{#if data.error}
		<div class="error">{data.error}</div>
	{:else if filteredPages.length == 0}
		<div class="no-pages">
			{#if searchQuery}
				No pages found matching "{searchQuery}"
			{:else}
				No pages found in the database.
			{/if}
		</div>
	{:else}
		{#each filteredPages as page}
			<a href="/pages/{page.title}" class="page-link">
				<div class="page">
					{#if getFirstImage(page.images)}
						<div class="page-thumbnail">
							<img src={getFirstImage(page.images)} alt={page.title} />
						</div>
					{/if}
					<div class="page-details">
						<div class="page-title">{page.title}</div>
						<div class="page-content">
							{cutWords(page.content, 50)}
							{#if shouldShowReadMore(page.content, 50)}
								<span class="read-more">Read more →</span>
							{/if}
						</div>
						<div class="page-meta">
							Last updated: {formatDate(page.updated_at || page.created_at)}
						</div>
					</div>
				</div>
			</a>
		{/each}
	{/if}
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
		background-color: antiquewhite;
		border-radius: 20px;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;

	}

	.back-link {
		color: #2196F3;
		text-decoration: none;
		font-size: 14px;
	}

	.back-link:hover {
		text-decoration: underline;
	}

	.btn-create {
		display: inline-block;
		padding: 10px 20px;
		background-color: #4CAF50;
		color: white;
		text-decoration: none;
		border-radius: 5px;
		font-size: 14px;
		font-weight: 500;
		transition: background-color 0.3s;
	}

	.btn-create:hover {
		background-color: #45a049;
	}

	h1 {
		color: #333;
		border-bottom: 3px solid #4CAF50;
		padding-bottom: 10px;
		margin-bottom: 30px;
	}
	
	.search-container {
		margin-bottom: 30px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	
	.search-input {
		width: 100%;
		padding: 12px 20px;
		font-size: 16px;
		border: 2px solid #ddd;
		border-radius: 8px;
		transition: border-color 0.3s;
	}
	
	.search-input:focus {
		outline: none;
		border-color: #2196F3;
		box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
	}
	
	.search-results-count {
		color: #666;
		font-size: 14px;
		font-style: italic;
	}

	.page-link {
		text-decoration: none;
		color: inherit;
		display: block;
		transition: transform 0.2s;
	}

	.page-link:hover {
		transform: translateY(-2px);
	}

	.page-link:hover .page {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		border-left: 4px solid #2196F3;
	}

	.page {
		background-color: white;
		margin: 20px 0;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		border-left: 4px solid transparent;
		transition: all 0.3s;
		cursor: pointer;
		display: flex;
		gap: 20px;
		align-items: flex-start;
	}
	
	.page-thumbnail {
		flex-shrink: 0;
		width: 200px;
		height: 150px;
		border-radius: 6px;
		overflow: hidden;
		background-color: #f5f5f5;
	}
	
	.page-thumbnail img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	
	.page-details {
		flex: 1;
		min-width: 0;
	}

	.page-title {
		color: #2196F3;
		font-size: 24px;
		margin-bottom: 10px;
	}

	.page-content {
		color: #555;
		line-height: 1.6;
		margin: 15px 0;
		white-space: pre-wrap;
		overflow: hidden;
	}
	
	.read-more {
		color: #2196F3;
		font-weight: 500;
		margin-left: 5px;
		display: inline-block;
	}

	.page-meta {
		color: #888;
		font-style: italic;
		font-size: 14px;
		margin-top: 10px;
	}

	.no-pages,
	.error {
		text-align: center;
		color: #888;
		padding: 40px;
	}

	.error {
		color: #d32f2f;
		background-color: #ffebee;
		border-radius: 8px;
	}
	
	@media (max-width: 768px) {
		.page {
			flex-direction: column;
		}
		
		.page-thumbnail {
			width: 100%;
			height: 200px;
		}
	}
</style>
