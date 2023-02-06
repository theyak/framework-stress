<script>
  import { tick } from "svelte";


	const token = () => Math.random().toString(36).substring(2, 10);
	const getTokenList = () => {
		const tokens = [];
		for (let i = 0; i < 500; i++) {
			tokens.push({name: token(), id: i});
		}
		return tokens;
	}
	let count = 0;
	let endAt = null;
	let tokens = getTokenList();

	const go = async () => {
		const newList = [];
		for (let i = 0; i < 500; i++) {
			newList.push({ name: token(), id: i });
		}

		tokens = newList;
		count++;

		if (Date.now() < endAt) {
			requestAnimationFrame(go);
		}
	};

	const start = () => {
		endAt = Date.now() + 10000;
		count = 0;
		requestAnimationFrame(go);
	}
</script>

<h1>
	Svelte ({count})
</h1>

<button style="display:block; margin-bottom: 1em" on:click={start}>
	Run!
</button>

<ul>
	{#each tokens as token}
		<li>
			{token.name}
		</li>
	{/each}
</ul>
