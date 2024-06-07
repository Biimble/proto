import { OPENAI_KEY } from '$env/static/private';
import OpenAI from 'openai';

const gpt = new OpenAI({
	apiKey: OPENAI_KEY
});

export default async function getRoute(places) {
	// return [
	// 	{
	// 		route: [
	// 			{ id: 'ChIJN4tOxqNx5kcRsa159MJv2Q0', time: 80, time_to_next: 15 },
	// 			{ id: 'ChIJd4rmbqFx5kcRo6vbwGGpfwk', time: 70, time_to_next: 20 },
	// 			{ id: 'ChIJ-4c951xx5kcRyxU8OoDlwMc', time: 90, time_to_next: 25 },
	// 			{ id: 'ChIJVQ-Qu45z5kcRJfUMOvT-qf8', time: 80, time_to_next: 20 },
	// 			{ id: 'ChIJkcFbzspz5kcRb-ZM-zORMb0', time: 60, time_to_next: 30 },
	// 			{ id: 'ChIJd4rmbqFx5kcRo6vbwGGpfwk', time: 70, time_to_next: 30 },
	// 			{ id: 'ChIJEw3ksZdz5kcRpHOy2jDM2Vo', time: 120, time_to_next: 0 }
	// 		],
	// 		total_time: 645
	// 	},
	// 	{
	// 		route: [
	// 			{ id: 'ChIJu0KgMGRx5kcR41a-6U9Mkws', time: 120, time_to_next: 46 },
	// 			{ id: 'ChIJN4tOxqNx5kcRsa159MJv2Q0', time: 90, time_to_next: 47 },
	// 			{ id: 'ChIJ0a5C4o1x5kcR5B_Y4Srlf9U', time: 180, time_to_next: 25 },
	// 			{ id: 'ChIJBcqIjGNx5kcR2Ed-JuDhAPo', time: 90, time_to_next: 49 },
	// 			{ id: 'ChIJGT9-twJ05kcRnHm-Rdj5W5c', time: 120, time_to_next: 23 },
	// 			{ id: 'ChIJEw3ksZdz5kcRpHOy2jDM2Vo', time: 180 }
	// 		],
	// 		total_time: 942
	// 	},
	// 	{
	// 		route: [
	// 			{ id: 'ChIJu0KgMGRx5kcR41a-6U9Mkws', time: 60, time_to_next: 20 },
	// 			{ id: 'ChIJN4tOxqNx5kcRsa159MJv2Q0', time: 70, time_to_next: 25 },
	// 			{ id: 'ChIJ0a5C4o1x5kcR5B_Y4Srlf9U', time: 90, time_to_next: 30 },
	// 			{ id: 'ChIJBcqIjGNx5kcR2Ed-JuDhAPo', time: 75, time_to_next: 15 },
	// 			{ id: 'ChIJkcFbzspz5kcRb-ZM-zORMb0', time: 90, time_to_next: 20 },
	// 			{ id: 'ChIJN8d9PMxz5kcRsyCLJF4CiuI', time: 95 }
	// 		],
	// 		total_time: 475
	// 	}
	// ];
	let formattedPlaces = '';
	for (const p of places) {
		formattedPlaces += `${p.id} - ${p.displayName.text} - ${p.primaryTypeDisplayName?.text || p.primaryType} - $ ${p.shortFormattedAddress} - ${p.distance} - ${p.rating}`;
		formattedPlaces += '\n';
	}
	const prompt = `Id - Nom - Type - Adresse - Distance - Note À partir de ces lieux, génère moi un itinéraire cohérent, je veux faire quelques activités pour remplir une partie de ma journée. Choisis alors des activities pertinentes, non répétitives, cohérentes avec l'heure actuelle. Donne moi la durée que je devrais passer dans chaque lieu, puis le temps à pieds ou en transports pour aller de l'une à l'autre. Choisis en fonction de la distance et de la note, trouve le juste équilibre. Ne répète pas trop le même type d'activité si possible. Donne ces informations au format JSON suivant: {route:[ {id: "id_activite_1", time: duree du lieu total en minutes time_to_next: "temps pour le prochain lieu"}, {...}], total_time: DUrée totale en minutes } TA RÉPONSE NE DOIT RIEN INCLURE DE PLUS QUE LE CODE JSON SANS AUCUN COMMENTAIRE SUPPLÉMENTAIRE NI MISE EN FORME, PAS MÊME DE MARKDOWN. JE VEUX LE TEXTE BRUT DE CE JSON.
${formattedPlaces}
HEURE: ${new Date().toLocaleTimeString({ lang: 'fr-FR' })}`;
	console.log(prompt);
	const response = await gpt.chat.completions.create({
		messages: [
			{
				role: 'user',
				content: prompt
			}
		],
		model: 'gpt-4',
		n: 3
	});
	const res = [];
	console.log(response);
	for (const option of response.choices) {
		try {
			res.push(JSON.parse(option.message.content));
		} catch (err) {}
	}
	return res;
}
