const user = `
CREATE TABLE user (
    id SERIAL PRIMARY KEY,
    version INT,
    isdeleted BOOLEAN DEFAULT false,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(50),
    phone VARCHAR(15),
    password VARCHAR(500),
    creation_time TIMESTAMP DEFAULT timezone('utc', now())
);
`