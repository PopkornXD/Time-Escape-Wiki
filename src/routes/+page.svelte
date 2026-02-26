<script>
	export let data;


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
	<div class="main-container">

		<div class="top-container">
			<img class="front-img" src="/uploads/HeadlessPreacher.png" alt="">
			<p>
				Welcome to the Time Escape Wiki! 
				Here you can find all the information regarding Time Escape. 
				Be it units and their abilities, battles, rewards, 
				and even the real historical/mythical inspiration behind the mechanics!
			</p>
			<nav>
				<a href="/pages">View All Pages</a>
			</nav>
		</div>


		{#each Object.keys(data.category) as category}
			<div class="category-container">
				<h2>{category}</h2>
				<div class="category-sub-container">
					{#each data.category[category] as page}
						<a href="/pages/{page.title}" class="page-link">
							<div class="page-container">
								{#if getFirstImage(page.images)}
									<div class="page-img">
										<img src={getFirstImage(page.images)} alt={page.title} />
									</div>
								{/if}
								<h4>{page.title}</h4>
							</div>
						</a>
					{/each}
				</div>
			</div>
		{/each}
	</div>
	
</div>

<style>


	.front-img {
		width: 500px;
	}


	h2 {
		margin: 20px;
		font-size: 2vw;
	}

	p {
		width: 700px;
		margin-top: 20px;
		line-height: 1.8;
		font-size: 18px;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 20px;
	}

	.top-container {
		background-color: antiquewhite;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.main-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: antiquewhite;
		border-radius: 20px;
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

	.category-container {
		width: 60vw;
		border: green solid 2px;
		border-radius: 10px;
		margin: 20px;
	}

	.category-sub-container {
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
		flex-direction: row;
	}

	.page-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 20px;
	}

	.page-img {
		flex-shrink: 0;
		width: 200px;
		height: 150px;
		border-radius: 6px;
		overflow: hidden;
	}

	.page-img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	nav {
		margin-top: 20px;
	}

	nav a {
		display: inline-block;
		padding: 10px 20px;
		background-color: #2196F3;
		color: white;
		text-decoration: none;
		border-radius: 5px;
		transition: background-color 0.3s;
	}

	nav a:hover {
		background-color: #1976D2;
	}
</style>
