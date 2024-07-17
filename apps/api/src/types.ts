import { Env } from './env';

export type Handler = (request: Request, env: Env) => Promise<Response> | Response;
export type MiddlewareHandler = (request: Request, env: Env) => Promise<Response | null> | Response | null;

export type Route = {
	handler: Handler;
	middlewares?: MiddlewareHandler[];
};

export type Routes = Record<string, Route>;
