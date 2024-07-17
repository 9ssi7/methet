type AccessTokenErrorResult = {
	error: string;
};

type AccessTokenSuccessResult = {
	access_token: string;
};

type AccessTokenResult = AccessTokenErrorResult | AccessTokenSuccessResult;

export type FetchUserResult = {
	login: string;
	id: number;
	avatar_url: string;
	html_url: string;
	name: string;
	company: string;
	blog: string;
	location: string;
	email: string;
	hireable: boolean;
	bio: string;
	twitter_username: string;
	public_repos: number;
	public_gists: number;
	followers: number;
	following: number;
	created_at: string;
	updated_at: string;
};

/*
{
    "login": "9ssi7",
    "avatar_url": "https://avatars.githubusercontent.com/u/76786120?v=4",
    "gravatar_id": "",
    "html_url": "https://github.com/9ssi7",
    "type": "User",
    "site_admin": false,
    "name": "Sami Salih İbrahimbaş",
    "company": "@monopayments",
    "blog": "https://9ssi7.dev",
    "location": "Istanbul, Turkiye",
    "email": "contact@9ssi7.dev",
    "hireable": true,
    "bio": "product developer",
    "twitter_username": "9ssi7",
    "public_repos": 44,
    "public_gists": 15,
    "followers": 197,
    "following": 122,
    "created_at": "2020-12-30T16:33:31Z",
    "updated_at": "2024-07-16T15:16:43Z"
  }
*/

const startAuth = (clientId: string): Response => {
	return Response.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`, 302);
};

const finishAuth = async (code: string, clientId: string, clientSecret: string): Promise<Response> => {
	const response = await fetch('https://github.com/login/oauth/access_token', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'user-agent': 'cloudflare-worker-github-oauth-login-demo',
			accept: 'application/json',
		},
		body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
	});
	const result: AccessTokenResult = await response.json();
	const headers = {
		'Access-Control-Allow-Origin': '*',
	};

	if ('error' in result) {
		return new Response(JSON.stringify(result), { status: 401, headers });
	}

	return new Response(JSON.stringify({ token: result.access_token }), {
		status: 201,
		headers,
	});
};

const fetchUser = async (token: string): Promise<FetchUserResult> => {
	const getUserResponse = await fetch('https://api.github.com/user', {
		headers: {
			accept: 'application/vnd.github.v3+json',
			authorization: `token ${token}`,
		},
	});
	const result: FetchUserResult = await getUserResponse.json();
	return result;
};

export default {
	startAuth,
	finishAuth,
	fetchUser,
};
