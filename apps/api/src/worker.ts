import { routes as authRoutes } from './auth';
import { corsMiddleware } from './cors';
import { Env } from './env';
import { runMiddlewares } from './middleware';
import { routes as praiseRoutes } from './praise';
import { routes as profileRoutes } from './profile';
import { Routes } from './types';

const allRoutes: Routes = {
	...authRoutes,
	...praiseRoutes,
	...profileRoutes,
};

export default {
	async fetch(request, env): Promise<Response> {
		const { pathname } = new URL(request.url);
		const res = corsMiddleware(request);
		if (res) return res;

		const route = allRoutes[pathname];
		if (!route) {
			return new Response('Not Found', { status: 404 });
		}
		if (route.middlewares) {
			const res = await runMiddlewares(...route.middlewares)(request, env);
			if (res) return res;
		}
		return route.handler(request, env);
	},
} satisfies ExportedHandler<Env>;
