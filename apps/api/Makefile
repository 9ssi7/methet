install:
	yarn install

copy-wrangler:
	cp ./wrangler.example.toml ./wrangler.toml

migrate:
	npx wrangler d1 execute methet-db --file=./scheme/db.sql

migrate-remote:
	npx wrangler d1 execute example-db --remote --file=./scheme/db.sql

migrate-manual: migrate-manual-table migrate-username-index migrate-is-hidden-index

migrate-manual-table:
	npx wrangler d1 execute methet-db --command="CREATE TABLE IF NOT EXISTS praises (id STRING PRIMARY KEY, from_user_name STRING NOT NULL, to_user_name STRING NOT NULL, to_user_avatar_url STRING NOT NULL, message STRING NOT NULL, created_at DATE NOT NULL, is_hidden INTEGER NOT NULL);"

migrate-username-index:
	npx wrangler d1 execute methet-db --command="CREATE INDEX IF NOT EXISTS praises_to_user_name_index ON praises (to_user_name);"

migrate-is-hidden-index:
	npx wrangler d1 execute methet-db --command="CREATE INDEX IF NOT EXISTS praises_is_hidden_index ON praises (is_hidden);"

dev:
	npx wrangler dev