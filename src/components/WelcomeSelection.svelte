<script>
	import { blur } from 'svelte/transition';
	import logo from '$lib/img/biimble-full.png';
	import { PLACE_TYPES } from '$lib/placeTypes.js';
	import userInterests from '$lib/userInterests.js';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	const selectedTypes = {};

	let selectedCount = 0;
	for (const type in PLACE_TYPES) {
		selectedTypes[type] = false;
	}
	$: selectedCount = Object.values(selectedTypes).reduce((acc, cur) => (cur ? acc + 1 : acc), 0);

	function goNext() {
		const interests = Object.entries(selectedTypes)
			.filter((v) => v[1])
			.map((v) => v[0])
			.join(',');
		console.log(interests);
		userInterests.set(interests);
		if (browser) goto('/');
	}
</script>

<div class="welcome-screen">
	<div class="welcome-heading">
		<img src={logo} alt="Biimble" />
		<p class="welcome-text">Bienvenue sur Biimble</p>
		<p class="welcome-prompt">Pour commencer, dites-nous en plus sur ce que vous aimez.</p>
		<p class="welcome-instructions">Sélectionnez au moins <b>3</b> catégories.</p>
	</div>
	<div class="welcome-selector">
		{#each Object.keys(PLACE_TYPES) as key}
			<div
				class={`place-type ${selectedTypes[key] ? 'selected' : ''}`}
				on:pointerdown={() => (selectedTypes[key] = !selectedTypes[key])}
			>
				<span>
					{PLACE_TYPES[key]}
				</span>
			</div>
		{/each}
	</div>
	<div class={`go-next ${selectedCount >= 3 ? 'enabled' : ''}`}>
		{#if selectedCount < 3}
			<span transition:blur>
				<span class="counter">
					{#if selectedCount === 0}
						<span transition:blur>3</span>
					{:else if selectedCount === 1}
						<span transition:blur>2</span>
					{:else}
						<span transition:blur>1</span>
					{/if}
				</span>
				de plus
			</span>
		{:else}
			<span transition:blur on:pointerdown={goNext}>
				Continuer <span class="material-symbols-outlined"> arrow_right_alt </span>
			</span>
		{/if}
	</div>
</div>

<style>
	.welcome-screen {
		width: 100%;
		height: 100%;
		padding: 10px 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.welcome-heading {
		text-align: center;
	}

	img {
		width: 80%;
		object-fit: contain;
		margin: 10px auto;
	}

	p {
		color: white;
		margin: 0;
		font-family: 'Poppins', sans-serif;
		padding: 0 10px;
	}

	.welcome-text {
		font-size: 23pt;
		font-weight: 800;
	}

	.welcome-prompt {
		font-size: 12pt;
	}

	.welcome-instructions {
		margin-top: 10px;
		font-size: 10pt;
		font-weight: 500;
	}

	.welcome-selector {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 7px;
		padding: 10px 3px;
	}

	.welcome-selector .place-type {
		display: inline-block;
		border: 1px solid #fff4;
		padding: 5px 8px;
		border-radius: 10em;
		font: 700 10pt 'Poppins';
		color: white;
		transition: 0.2s ease;
		cursor: pointer;
		&.selected {
			background: var(--main-color);
			color: var(--secondary-color);
		}
	}

	.go-next {
		font: 800 15pt 'Poppins';
		color: white;
		width: 190px;
		height: 55px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid #fff8;
		border-radius: 10em;
		margin: 10px 0;
		cursor: pointer;
		& > span {
			position: absolute;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		& .counter {
			display: inline-block;
			width: 14pt;
			& span {
				top: 50%;
				transform: translateY(-50%);
				position: absolute;
			}
		}
		&.enabled {
			border-color: var(--main-color);
			background: var(--main-color);
			color: var(--secondary-color);
		}
	}

	.material-symbols-outlined {
		margin-left: 10px;
		animation: arrow-bounce 1s infinite alternate;
	}

	@keyframes arrow-bounce {
		to {
			transform: translateX(20%);
		}
	}
</style>
