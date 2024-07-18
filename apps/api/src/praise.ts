import { v4 as uuidv4 } from 'uuid';
import { requiredAccessMiddleware } from './auth';
import { Env } from './env';
import github from './github';
import { withDefaultPagi } from './pagi';
import { Routes } from './types';

type PraiseCreateDto = {
	id: string;
	from_user_name: string;
	to_user_name: string;
	to_user_avatar_url: string;
	message: string;
	created_at: string;
	is_hidden: boolean;
};

type PraiseViewDto = {
	to_user_name: string;
	to_user_avatar_url: string;
	message: string;
	created_at: string;
};

const createPraise = async (request: Request, env: Env): Promise<Response> => {
	if (request.method !== 'POST') {
		return new Response('Method Not Allowed', { status: 405 });
	}
	const userAgent = request.headers.get('User-Agent');
	if (!userAgent) {
		return new Response('Bad Request', { status: 400 });
	}

	const body: PraiseCreateDto = await request.json();
	if (!body || !body.to_user_name || !body.message) {
		return new Response('Bad Request', { status: 400 });
	}
	const token = request.headers.get('Authorization');
	const fromUser = await github.fetchUser(token!, userAgent);
	const toUser = await github.fetchUserByName(body.to_user_name, userAgent);
	if (!toUser) {
		return new Response('Not Found', { status: 404 });
	}

	if (fromUser?.login === toUser.login) {
		return new Response('Bad Request', { status: 400 });
	}

	const praise: PraiseCreateDto = {
		id: uuidv4(),
		from_user_name: fromUser!.login,
		to_user_name: toUser.login,
		to_user_avatar_url: toUser.avatar_url,
		message: body.message,
		created_at: new Date().toISOString(),
		is_hidden: false,
	};

	const stmt = await env.DB.prepare(
		'INSERT INTO praises (id, from_user_name, to_user_name, to_user_avatar_url, message, created_at, is_hidden) VALUES (?, ?, ?, ?, ?, ?, ?)'
	)
		.bind(
			praise.id,
			praise.from_user_name,
			praise.to_user_name,
			praise.to_user_avatar_url,
			praise.message,
			praise.created_at,
			praise.is_hidden ? 1 : 0
		)
		.run();

	if (stmt.success) {
		return new Response(
			JSON.stringify({
				to_user_name: praise.to_user_name,
				to_user_avatar_url: praise.to_user_avatar_url,
				message: praise.message,
				created_at: praise.created_at,
			}),
			{ status: 201 }
		);
	}
	return new Response('Internal Server Error', { status: 500 });
};

const listLatestPraises = async (request: Request, env: Env): Promise<Response> => {
	if (request.method !== 'GET') {
		return new Response('Method Not Allowed', { status: 405 });
	}

	const params = new URL(request.url).searchParams;

	const pagi = withDefaultPagi(params.get('page'), params.get('per_page'));

	const stmt = await env.DB.prepare(
		'SELECT to_user_name, to_user_avatar_url, message, created_at FROM praises WHERE is_hidden = 0 ORDER BY created_at DESC LIMIT ? OFFSET ?'
	)
		.bind(pagi[1], (pagi[0] - 1) * pagi[1])
		.all();

	const result: PraiseViewDto[] = stmt.results.map(
		(row): PraiseViewDto => ({
			to_user_name: row.to_user_name as string,
			to_user_avatar_url: row.to_user_avatar_url as string,
			message: row.message as string,
			created_at: row.created_at as string,
		})
	);

	return new Response(JSON.stringify(result), { status: 200 });
};

const listPraisesByUser = async (request: Request, env: Env): Promise<Response> => {
	if (request.method !== 'GET') {
		return new Response('Method Not Allowed', { status: 405 });
	}

	const params = new URL(request.url).searchParams;
	const toUserName = params.get('to_user_name');
	if (!toUserName) {
		return new Response('Bad Request', { status: 400 });
	}

	const pagi = withDefaultPagi(params.get('page'), params.get('per_page'));

	const stmt = await env.DB.prepare(
		'SELECT to_user_name, to_user_avatar_url, message, created_at FROM praises WHERE is_hidden = 0 AND to_user_name = ? ORDER BY created_at DESC LIMIT ? OFFSET ?'
	)
		.bind(toUserName, pagi[1], (pagi[0] - 1) * pagi[1])
		.all();

	const result: PraiseViewDto[] = stmt.results.map(
		(row): PraiseViewDto => ({
			to_user_name: row.to_user_name as string,
			to_user_avatar_url: row.to_user_avatar_url as string,
			message: row.message as string,
			created_at: row.created_at as string,
		})
	);

	return new Response(JSON.stringify(result), { status: 200 });
};

const praiseRoute = async (request: Request, env: Env): Promise<Response> => {
	switch (request.method) {
		case 'POST':
			const res = await requiredAccessMiddleware(request, env);
			if (res) {
				return res;
			}
			return createPraise(request, env);
		case 'GET':
			return listLatestPraises(request, env);
		default:
			return new Response('Method Not Allowed', { status: 405 });
	}
};

export const routes: Routes = {
	'/praises': {
		middlewares: [],
		handler: praiseRoute,
	},
	'/praises/by-user': {
		middlewares: [],
		handler: listPraisesByUser,
	},
};
