import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';

export const load: PageServerLoad = async () => {
	const { data } = await supabase()
		.from('convocations')
		.select('license_number, first_name, last_name, present');

	const totals: Record<
		string,
		{ license_number: string; first_name: string; last_name: string; count: number; total: number }
	> = {};

	data?.forEach((c) => {
		const key = c.license_number as string;
		if (!totals[key]) {
			totals[key] = {
				license_number: c.license_number as string,
				first_name: c.first_name as string,
				last_name: c.last_name as string,
				count: 0,
				total: 0
			};
		}
		if (c.present) {
			totals[key].count += 1;
			totals[key].total = totals[key].count * 5;
		}
	});

	return { participants: Object.values(totals) };
};
