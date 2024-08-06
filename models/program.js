const program = `
CREATE table program(
    id serial4 primary key,
    version int4 default 1,
    ideleted boolean default false,
    name varchar(50),
    image varchar(255),
    service varchar(100),
    user_id int4,
    video int4,
    Constraint user_fkey FOREIGN KEY (user_id) REFERENCES "users"(id),
    Constraint video_fkey FOREIGN KEY (video) REFERENCES "video"(id)
)
`