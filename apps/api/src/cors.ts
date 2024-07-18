export const corsMiddleware = (request: Request): Response | null => {
	console.log('corsMiddleware', request.method);
	if (request.method === 'OPTIONS') {
		return new Response(null, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
				'Access-Control-Allow-Headers':
					'Authorization, Content-Type, Accept-Language, Content-Language, Content-Length, Access-Control-Allow-Methods',
			},
		});
	}
	return null;
};
