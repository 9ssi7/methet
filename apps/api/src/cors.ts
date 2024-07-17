export const corsMiddleware = (request: Request): Response | null => {
	if (request.method === 'OPTIONS') {
		return new Response(null, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
				'Access-Control-Allow-Headers': 'Authorization, Content-Type',
				'Access-Control-Max-Age': '86400',
			},
		});
	}
	return null;
};
