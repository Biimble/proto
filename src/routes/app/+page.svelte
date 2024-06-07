<script>
	import logo from '$lib/img/biimble-full.png';
	import { blur } from 'svelte/transition';
	import ActivityList from '../../components/ActivityList.svelte';
	import BiimbleButton from '../../components/BiimbleButton.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import ActivityCard from '../../components/ActivityCard.svelte';

	export let data;
	export let finalPlaces;
	let itinerary = false;
	let itineraryLoading = true;
	let routeOptions = [];
	let selectedRoute = undefined;
	async function getItinerary() {
		itinerary = true;
		const res = await fetch('/api/itinerary', {
			body: JSON.stringify(finalPlaces),
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST'
		});
		routeOptions = await res.json();
		selectedRoute = 0;
		itineraryLoading = false;
		console.log(finalPlaces);
	}
</script>

<header>
	<img src={logo} alt="Biimble" />
	<p>Prenez l'air</p>
</header>
{#if itinerary}
	{#if itineraryLoading}
		<div class="loading-container" transition:blur>
			<div class="loading-heading">
				<i class="bi bi-stars"></i>
				<p>Un peu de patience... <br />Notre IA vous concocte un super planning!</p>
			</div>
		</div>
	{:else}
		<div class="itinerary-container" transition:blur>
			<div class="itinerary-title">Votre itinéraire personnalisé</div>
			<div class="route-selector">
				<div class="select left" on:pointerdown={() => selectedRoute > 0 && selectedRoute--}>
					<span class="material-symbols-rounded"> chevron_left </span>
				</div>
				<div class="selection">Option {selectedRoute + 1}</div>
				<div class="select right">
					<span
						class="material-symbols-rounded"
						on:pointerdown={() => selectedRoute < 2 && selectedRoute++}
					>
						chevron_right
					</span>
				</div>
			</div>
			<div class="route-container">
				{#each routeOptions[selectedRoute].route as place, i}
					<div class="route-place">
						<div class="time-indicator">
							<span class="material-symbols-outlined"> schedule </span>
							<span>{place.time}min</span>
						</div>
						{#if true}
							{@const data = finalPlaces.find((p) => p.id === place.id)}
							<ActivityCard
								mapsLink={data.googleMapsUri}
								imageLink={data.imageLink}
								title={data.displayName.text}
								grade={data.rating}
								location={data.shortFormattedAddress}
								distance={data.distance}
								categories={[data.primaryTypeDisplayName?.text || data.primaryType]}
							/>
						{/if}
						{#if i !== routeOptions[selectedRoute].route.length - 1}
							<div class="time-to-next">
								<div class="info">
									<span class="material-symbols-rounded"> directions_walk </span>
									<span>{place.time_to_next}min</span>
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/if}
{:else}
	{#await data.places}
		<ActivityList loading={true} />
	{:then res}
		<ActivityList places={res[0].places} bind:finalPlaces coords={data.coords} />
		<BiimbleButton onClick={getItinerary} />
	{:catch error}
		{JSON.stringify(error)}
	{/await}
{/if}

<style>
	header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 40px;
	}
	header img {
		width: 70%;
		object-fit: contain;
	}

	header p {
		font: 600 8pt 'Poppins';
		margin: 0;
		color: var(--main-color);
		text-align: right;
		width: 70%;
	}

	.itinerary-title {
		font: 700 13pt 'Poppins';
		text-align: center;
		color: white;
	}

	.route-selector {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 20px 0;
		color: white;
		& .selection {
			font: 800 14pt 'Poppins';
		}

		& .select {
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 0 10px;
			border: 1px solid white;
			width: 32px;
			height: 32px;
			border-radius: 50%;
		}
	}

	.route-container {
		display: flex;
		flex-direction: column;
		padding: 0 10px;
		flex-shrink: 0;
		& .card {
			flex: 0 0 auto;
			width: 100%;
		}
	}
	.route-container .route-place {
		display: flex;
		align-items: center;
		flex-direction: column;
		& .time-indicator {
			color: white;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			background: var(--secondary-color);
			gap: 5px;
			margin: 5px 0;
			height: fit-content;
			z-index: 8888;
			width: 40px;
			& span:last-child {
				font: 11pt 'Roboto';
			}
		}

		& .time-to-next {
			height: 100px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			&:after {
				content: '';
				position: absolute;
				width: 0;
				top: 10px;
				left: 50%;
				height: 100%;
				border-left: 3px dotted #dedede;
			}
			& .info {
				z-index: 100;
				color: white;
				display: flex;
				justify-content: center;
				align-items: center;
				background: var(--secondary-color);
				& span:last-child {
					font:
						11pt 'Roboto',
						sans-serif;
				}
			}
		}
	}

	.loading-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		color: white;
		& i {
			font-size: 100pt;
		}
		font: 600 15pt 'Poppins';
	}

	.loading-container i {
		animation: blink 2s ease infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0.5;
		}
	}
</style>
