import { routes as authRoutes } from './auth';
import { corsMiddleware } from './cors';
import { Env } from './env';
import { withErrorHandler } from './error-handler';
import { runMiddlewares } from './middleware';
import { routes as praiseRoutes } from './praise';
import { routes as profileRoutes } from './profile';
import { Handler, Routes } from './types';

const allRoutes: Routes = {
	...authRoutes,
	...praiseRoutes,
	...profileRoutes,
};

const withCorsHeaders = (res: Response): Response => {
	res.headers.set('Access-Control-Allow-Origin', '*');
	res.headers.set('Access-Control-Allow-Credentials', 'true');
	return res;
};

const worker: Handler = async (request, env): Promise<Response> => {
	const { pathname } = new URL(request.url);
	const res = corsMiddleware(request);
	if (res) return withCorsHeaders(res);

	const route = allRoutes[pathname];
	if (!route) {
		return new Response('Not Found', { status: 404 });
	}
	if (route.middlewares) {
		const res = await runMiddlewares(...route.middlewares)(request, env);
		if (res) return withCorsHeaders(res);
	}
	return withCorsHeaders(await route.handler(request, env));
};

export default {
	fetch: withErrorHandler(worker),
} satisfies ExportedHandler<Env>;
