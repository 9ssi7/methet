import { Env } from './env';
import github from './github';

export const requiredAccessMiddleware = (request: Request): Response | null => {
	const token = request.headers.get('Authorization');
	if (!token) {
		return new Response('Unauthorized', { status: 401 });
	}
	return null;
};

export const exlcudedAccessMiddleware = (request: Request): Response | null => {
	const token = request.headers.get('Authorization');
	if (token) {
		return new Response('Forbidden', { status: 403 });
	}
	return null;
};

export const loginRoute = async (request: Request, env: Env): Promise<Response> => {
	switch (request.method) {
		case 'GET': {
			return github.startAuth(env.GITHUB_CLIENT_ID);
		}
		case 'POST': {
			const body: any = await request.json();
			if (!body || !body.code || typeof body.code !== 'string') {
				return new Response('Bad Request', { status: 400 });
			}
			return github.finishAuth(body.code, env.GITHUB_CLIENT_ID, env.GITHUB_CLIENT_SECRET);
		}
		default: {
			return new Response('Method Not Allowed', { status: 405 });
		}
	}
};

export const userRoute = async (request: Request, env: Env): Promise<Response> => {
	if (request.method !== 'GET') {
		return new Response('Method Not Allowed', { status: 405 });
	}
	const token = request.headers.get('Authorization');
	if (!token) {
		return new Response('Unauthorized', { status: 401 });
	}
	const user = await github.fetchUser(token);
	return new Response(JSON.stringify(user), { status: 200 });
};

export const routes = {
	'/auth/login': loginRoute,
	'/auth/user': userRoute,
};
