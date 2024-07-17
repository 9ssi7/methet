import { Env } from './env';
import { Routes } from './types';

type TopHonorableUserDto = {
	user_name: string;
	avatar_url: string;
	praise_count: number;
};

const listTopHonorableUsers = async (request: Request, env: Env): Promise<Response> => {
	if (request.method !== 'GET') {
		return new Response('Method Not Allowed', { status: 405 });
	}
	const stmt = await env.DB.prepare(
		'SELECT to_user_name, to_user_avatar_url, COUNT(*) as praise_count FROM praises WHERE is_hidden = 0 GROUP BY to_user_name ORDER BY praise_count DESC LIMIT 30'
	).all();
	const result: TopHonorableUserDto[] = stmt.results.map(
		(row): TopHonorableUserDto => ({
			user_name: row.to_user_name as string,
			avatar_url: row.to_user_avatar_url as string,
			praise_count: row.praise_count as number,
		})
	);
	return new Response(JSON.stringify(result), { status: 200 });
};

const hotTopHonorableRoute = async (request: Request, env: Env): Promise<Response> => {
	if (request.method !== 'GET') {
		return new Response('Method Not Allowed', { status: 405 });
	}
	return listTopHonorableUsers(request, env);
};

export const routes: Routes = {
	'/top-honorables': {
		middlewares: [],
		handler: hotTopHonorableRoute,
	},
};
