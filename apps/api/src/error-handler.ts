import { Handler } from './types';

export const withErrorHandler = (handler: Handler): Handler => {
	return async (request, env) => {
		try {
			return await handler(request, env);
		} catch (e) {
			console.error(e);
			return new Response('Internal Server Error', { status: 500 });
		}
	};
};
