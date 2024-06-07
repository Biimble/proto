<script>
	export let onClick;
</script>

<div class="biimble-button" on:click={onClick}>
	<i class="bi bi-stars"></i>
	Je me laisse guider
</div>

<style>
	.biimble-button {
		position: fixed;
		z-index: 10000;
		background-image: linear-gradient(111.4deg, rgba(238, 113, 113, 1) 1%, rgb(252, 205, 118) 58%);
		box-shadow:
			0 4px 10px 3px rgba(238, 113, 113, 0.61),
			0 6px 30px 3px rgba(252, 205, 118, 0.3),
			0 12px 80px 3px rgba(238, 113, 113, 0.2);
		bottom: 15px;
		gap: 5px;
		left: 50%;
		transform: translateX(-50%);
		padding: 10px 20px;
		border-radius: 10em;
		font: 600 12pt 'Poppins';
		width: fit-content;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: transform 0.4s ease;
		& i {
			font-size: 15pt;
		}

		&:active,
		&.clicked {
			transform: translateX(-50%) scale(0.9);
		}
	}
</style>
