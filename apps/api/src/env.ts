export interface Env {
	// If you set another name in wrangler.toml as the value for 'binding',
	// replace "DB" with the variable name you defined.
	DB: D1Database;

	GITHUB_CLIENT_ID: string;
	GITHUB_CLIENT_SECRET: string;
}
