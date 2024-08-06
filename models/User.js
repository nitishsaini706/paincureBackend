const user = `
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    version INT,
    isdeleted BOOLEAN DEFAULT false,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(50),
    phone VARCHAR(15),
    password VARCHAR(500),
    creation_time TIMESTAMP DEFAULT timezone('utc', now())
);


alter table users add column image varchar(255) null;

alter table users add column role varchar(10) default 'admin';

alter table users add column bio text default null;

alter table users add column degree varchar(500) default null;

alter table users add column avail_id int4 default null;

alter table users add constraint avail_fkey foreign key (avail_id) REFERENCES "availability"(id); 

`
//calendar availability
//charges 