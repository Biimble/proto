import { PlacesClient } from '@googlemaps/places';
import { PUBLIC_GOOGLE_API_KEY } from '$env/static/public';

export async function load({ url }) {
	const places = new PlacesClient({
		key: PUBLIC_GOOGLE_API_KEY
	});
	let coords = {
		latitude: 48.788791,
		longitude: 2.363746
	};
	const res = places.searchNearby(
		{
			locationRestriction: {
				circle: {
					center: coords,
					radius: 5000
				}
			},
			includedTypes: url.searchParams.get('c').split(','),
			languageCode: 'fr',
			maxResultCount: 20
		},
		{
			otherArgs: {
				headers: {
					'X-Goog-FieldMask':
						'places.id,places.displayName,places.primaryTypeDisplayName,places.primaryType,places.location,places.photos,places.shortFormattedAddress,places.rating,places.googleMapsUri'
				}
			}
		}
	);
	return {
		places: res,
		coords: [coords.longitude, coords.latitude]
	};
}
