<script>
	import ActivityCard from './ActivityCard.svelte';
	import LoadingCard from './LoadingCard.svelte';
	export let loading = false;
	export let places;
	export let finalPlaces;
	export let coords;
	finalPlaces = places;
	function calculateDistance(point1, point2) {
		const [lon1, lat1] = point1.map((deg) => deg * (Math.PI / 180));
		const [lon2, lat2] = point2.map((deg) => deg * (Math.PI / 180));

		const dlon = lon2 - lon1;
		const dlat = lat2 - lat1;

		const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		const radius = 6371; // Radius of the Earth in kilometers
		const distance = radius * c;

		return distance < 1 ? `${Math.floor(distance * 1000)}m` : `${distance.toFixed(1)}km`;
	}

	$: {
		if (places) {
			for (const place of places) {
				place.distance = calculateDistance(coords, [
					place.location.longitude,
					place.location.latitude
				]);
			}
		}
	}
</script>

<div class="activities-container">
	{#if loading}
		{#each Array(10) as _}
			<LoadingCard />
		{/each}
	{:else}
		{#each places as place}
			<ActivityCard
				mapsLink={place.googleMapsUri}
				title={place.displayName.text}
				categories={[place.primaryTypeDisplayName?.text || place.primaryType]}
				distance={place.distance}
				image={place.photos[0]?.name}
				location={place.shortFormattedAddress}
				grade={place.rating}
				bind:imageLink={place.imageLink}
			/>
		{/each}
	{/if}
</div>

<style>
	.activities-container {
		width: 100%;
		margin: 10px 0;
		gap: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
