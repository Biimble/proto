import { PlacesClient } from '@googlemaps/places';
import { PUBLIC_GOOGLE_API_KEY } from '$env/static/public';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const places = new PlacesClient({
		key: PUBLIC_GOOGLE_API_KEY
	});

	const body = await request.json();
	const name = body.name;
	if (!name) {
		return json({
			image: null
		});
	}
	const res = places.getPhotoMedia(
		{ name: name + '/media', maxHeightPx: 300 },
		{
			otherArgs: {
				headers: {
					'X-Goog-FieldMask': '*'
				}
			}
		}
	);
	return json({
		image: (await res)[0]?.photoUri || null
	});
}
