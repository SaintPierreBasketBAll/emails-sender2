<script lang="ts">
	const { data } = $props();
</script>

<h1>Statistiques de participation</h1>
{#if data.participants.length}
	<table>
		<thead>
			<tr>
				<th>Licence</th>
				<th>Nom</th>
				<th>Prénom</th>
				<th>Participations</th>
				<th>Total (€)</th>
			</tr>
		</thead>
		<tbody>
			{#each data.participants as p (p.license_number)}
				<tr>
					<td>{p.license_number}</td>
					<td>{p.last_name}</td>
					<td>{p.first_name}</td>
					<td>{p.count}</td>
					<td>{p.total}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{:else}
	<p>Aucune participation enregistrée.</p>
{/if}
