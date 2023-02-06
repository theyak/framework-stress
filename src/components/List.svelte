<script>
	const lots = [...Array(30000).keys()];
</script>

{#each lots as i}
	<div key={i}>{i}</div>
{/each}
