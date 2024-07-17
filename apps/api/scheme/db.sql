CREATE TABLE IF NOT EXISTS praises {
  id STRING PRIMARY KEY,
  from_user_name STRING NOT NULL,
  to_user_name STRING NOT NULL,
  to_user_avatar_url STRING NOT NULL,
  message STRING NOT NULL,
  created_at DATE NOT NULL,
  is_hidden INTEGER NOT NULL
};
CREATE INDEX IF NOT EXISTS praises_to_user_name_index ON praises (to_user_name);
CREATE INDEX IF NOT EXISTS praises_is_hidden_index ON praises (is_hidden);