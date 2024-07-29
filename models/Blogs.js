const Blogs = `
  CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  version INT,
  isdeleted BOOLEAN DEFAULT false,
  created_by int4,
  updated_by int4 null,
  creation_time TIMESTAMP DEFAULT timezone('utc', now()),
  updated_time TIMESTAMP,
  title VARCHAR(255),
  service VARCHAR(255),
  body TEXT,
  ispublished BOOLEAN,
  image VARCHAR(255),
  slug VARCHAR(255) UNIQUE,
  CONSTRAINT blogs_created_by_fkey FOREIGN KEY (created_by) REFERENCES "users"(id),
  CONSTRAINT blogs_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES "users"(id)
);

`