install:
	yarn install

copy-wrangler:
	cp ./wrangler.example.toml ./wrangler.toml

migrate:
	npx wrangler d1 execute example-db --file=./scheme/db.sql

migrate-remote:
	npx wrangler d1 execute example-db --remote --file=./scheme/db.sql

dev:
	npx wrangler dev