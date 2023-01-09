<script>
	import { onMount, tick } from 'svelte';
	import List from "./List.svelte";

	export let longList = true;

	const token = () => Math.random().toString(36).substring(2, 10);
	let count = 0;
	let list = [];

	for (let i = 0; i < 500; i++) {
		list.push({ name: token(), id: i });
	}

	onMount(() => {
		const go = async () => {
			list.forEach((item, i) => {
				item.name = token()
			});
			list = list;
			count++;
			if (Date.now() < endAt) {
				setTimeout(go, 1);
			}
		}

		let endAt = Date.now() + 10000;
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
	<List />
{/if}