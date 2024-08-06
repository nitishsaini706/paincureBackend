const video = `
create table video(
    id serial4 primary key,
    version int4 default 1,
    ideleted boolean default false,
    url varchar(255),
    name varchar(50) unique
)`