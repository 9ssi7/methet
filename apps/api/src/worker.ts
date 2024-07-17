import { routes as authRoutes } from './auth';
import { corsMiddleware } from './cors';
import { Env } from './env';
import { runMiddlewares } from './middleware';
import { Routes } from './types';

const allRoutes: Routes = {
	...authRoutes,
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
		/*
		if (pathname === '/api/beverages') {
			// If you did not use `DB` as your binding name, change it here
			const { results } = await env.DB.prepare('SELECT * FROM Customers WHERE CompanyName = ?').bind('Bs Beverages').all();
			return Response.json(results);
		}

		return new Response('Call /api/beverages to see everyone who works at Bs Beverages');
		*/
	},
} satisfies ExportedHandler<Env>;
