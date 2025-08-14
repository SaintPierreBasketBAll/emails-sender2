<script lang="ts">
	const { data } = $props();
	let match_number = $state('');
	let teams = $state('');
	let date = $state('');
	let location = $state('');
	let convocations = $state([{ license_number: '', last_name: '', first_name: '' }]);

	function addConvocation() {
		convocations.push({ license_number: '', last_name: '', first_name: '' });
	}
</script>

<h1>Gestion des matchs</h1>
<form method="post" action="?/createMatch">
	<input name="match_number" placeholder="Numéro de match" bind:value={match_number} />
	<input name="teams" placeholder="Équipes" bind:value={teams} />
	<input type="date" name="date" bind:value={date} />
	<input name="location" placeholder="Lieu" bind:value={location} />

	<h2>Convocations</h2>
	{#each convocations as conv, i (i)}
		<div>
			<input name="license_number" placeholder="Licence" bind:value={conv.license_number} />
			<input name="last_name" placeholder="Nom" bind:value={conv.last_name} />
			<input name="first_name" placeholder="Prénom" bind:value={conv.first_name} />
		</div>
	{/each}
	<button type="button" onclick={addConvocation}>Ajouter un licencié</button>
	<button type="submit">Enregistrer</button>
</form>

{#if data.matches.length}
	<h2>Matchs existants</h2>
	{#each data.matches as match (match.id)}
		<section>
			<h3>{match.match_number} - {match.teams} ({match.date})</h3>
			<p>{match.location}</p>
			<ul>
				{#each match.convocations as conv (conv.id)}
					<li>
						{conv.first_name}
						{conv.last_name}
						<form method="post" action="?/updateAttendance">
							<input type="hidden" name="convocation_id" value={conv.id} />
							<input
								type="checkbox"
								name="present"
								checked={conv.present}
								onchange={(e) => e.currentTarget.form?.requestSubmit()}
							/>
						</form>
					</li>
				{/each}
			</ul>
		</section>
	{/each}
{/if}
