<script>
	export let mapsLink;
	export let image;
	export let title;
	export let location;
	export let categories;
	export let distance;
	export let grade;

	export let imageLink;
	console.log(mapsLink);
	function imageLoad(node) {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(async (entry) => {
				if (entry.isIntersecting && image && !imageLink) {
					const res = await fetch('/api/place-images', {
						body: JSON.stringify({
							name: image
						}),
						headers: {
							'Content-Type': 'application/json'
						},
						method: 'POST'
					});
					imageLink = (await res.json()).image;
				}
			});
		});
		observer.observe(node);

		return {
			destroy: () => observer.disconnect()
		};
	}
</script>

<a
	class="card"
	style={imageLink ? `background-image: url(${imageLink})` : ''}
	use:imageLoad
	href={mapsLink}
	target="_blank"
>
	<div class="card-grade">{grade}</div>
	<div class="card-content">
		<div class="card-content-backdrop"></div>
		<div class="card-categories">
			{#each categories as cat}
				<div class="category">{cat}</div>
			{/each}
		</div>
		<div class="card-title">{title}</div>
		<div class="card-location">{location} • à {distance}</div>
	</div>
</a>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

	.card {
		display: block;
		background-image: url($lib/img/placeholder-card.png);
		position: relative;
		width: 90%;
		height: 120px;
		background-size: cover;
		background-position: center;
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
		font-family: 'Roboto', sans-serif;
	}

	.card-grade {
		position: absolute;
		color: white;
		font-size: 0.8rem;
		top: 5px;
		right: 5px;
		width: 1.8rem;
		height: 1.8rem;
		background: #0004;
		backdrop-filter: blur(5px);
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		border: 1px solid white;
	}
	.card-content {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 1rem;
		color: #fff;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		overflow: hidden;
	}
	.card-content-backdrop {
		position: absolute;
		bottom: 0;
		left: -1px;
		background: linear-gradient(to top, #0008, transparent);
		height: 80%;
		width: 100%;
	}
	.card-title {
		font-size: 1.1rem;
		font-weight: 700;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.card-content .card-location {
		font-size: 0.8rem;
	}
	.card-categories .category {
		display: inline-block;
		border: 1px solid #fff4;
		padding: 3px 8px;
		border-radius: 10em;
		background: #0008;
		backdrop-filter: blur(5px);
		font-size: 0.7rem;
		margin-right: 3px;
	}
</style>
