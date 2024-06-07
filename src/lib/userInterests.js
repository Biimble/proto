import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const defaultValue = '';
const initialValue = browser
	? window.localStorage.getItem('interests') ?? defaultValue
	: defaultValue;

const interests = writable(initialValue);

interests.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('interests', value);
	}
});

export default interests;
