<script>
	import logo from '$lib/img/biimble-full.png';
</script>

<div class="splash-art">
	<img src={logo} alt="Biimble Logo" />
	<div class="slogan">Get some fresh air</div>
</div>

<style>
	.splash-art {
		width: 100%;
		height: 100%;
		background: var(--secondary-color);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	img {
		width: 80%;
	}

	.slogan {
		color: var(--main-color);
	}
</style>
