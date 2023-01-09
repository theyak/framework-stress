<script>
	$: lots = [...Array(30000).keys()];
</script>

<div>
	{#each lots as i}
		<div key={i}>{i}</div>
	{/each}
</div>
