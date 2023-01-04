<script>
	import { onMount } from 'svelte';

	export let longList = false;

	const endAt = Date.now() + 10000;

	const token = () => Math.random().toString(36).substring(2, 10);
	const lots = [...Array(30000).keys()];
	let count = 0;
	let list = [];

	for (let i = 0; i < 500; i++) {
		list.push({ name: token(), id: i });
	}

	onMount(() => {
		const go = () => {
			list.forEach((item, i) => {
				item.name = token()
			});
			list = list;
			count++;
			if (Date.now() < endAt) {
				setTimeout(() => go(), 1);
			}
		}
		go();
	});
</script>

<h1>Svelte ({count})</h1>
<ul>
	{#each list as item, i}
		<li key={i}>{item.name}</li>
	{/each}
</ul>

{#if longList}
	<div>
		{#each lots as i}
			<div key={i}>{i}</div>
		{/each}
	</div>
{/if}