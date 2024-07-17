import { MiddlewareHandler } from './types';

export const runMiddlewares = (...middlewares: MiddlewareHandler[]): MiddlewareHandler => {
	return async (request, env) => {
		for (const middleware of middlewares) {
			const response = await middleware(request, env);
			if (response) {
				return response;
			}
		}
		return null;
	};
};
