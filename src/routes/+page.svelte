<script>
	import userInterests from '$lib/userInterests.js';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	if (browser && $userInterests === '') goto('/welcome');
	else if (browser) goto('/app?c=' + $userInterests);
</script>
