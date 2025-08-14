import type { Actions, PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';

export const load: PageServerLoad = async () => {
	const { data } = await supabase()
		.from('matchs')
		.select(
			'id, match_number, teams, date, location, convocations:convocations(id, license_number, first_name, last_name, present)'
		)
		.order('date', { ascending: true });
	return { matches: data ?? [] };
};

export const actions: Actions = {
	createMatch: async ({ request }) => {
		const form = await request.formData();
		const match_number = form.get('match_number') as string;
		const teams = form.get('teams') as string;
		const date = form.get('date') as string;
		const location = form.get('location') as string;
		const license_numbers = form.getAll('license_number') as string[];
		const first_names = form.getAll('first_name') as string[];
		const last_names = form.getAll('last_name') as string[];

		const client = supabase();
		const { data: match, error } = await client
			.from('matchs')
			.insert({ match_number, teams, date, location })
			.select()
			.single();

		if (error || !match) {
			return { success: false, error: error?.message };
		}

		const convocations = license_numbers.map((license_number, i) => ({
			match_id: match.id,
			license_number,
			first_name: first_names[i],
			last_name: last_names[i],
			present: false
		}));

		if (convocations.length) {
			await client.from('convocations').insert(convocations);
		}

		return { success: true };
	},
	updateAttendance: async ({ request }) => {
		const form = await request.formData();
		const id = form.get('convocation_id') as string;
		const present = form.get('present') === 'on';
		await supabase().from('convocations').update({ present }).eq('id', id);
		return { success: true };
	}
};
