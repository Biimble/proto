import getRoute from '$lib/gpt-wrapper.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const places = await request.json();
	const options = await getRoute(places);
	return json(options);
}
