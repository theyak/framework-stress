<script>
	import List from "./List.svelte";
	import Tokens from "./Tokens.svelte";

	export let longList = true;
</script>

<Tokens />

{#if longList}
	<List />
{/if}