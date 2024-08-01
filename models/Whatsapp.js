export const whatsapp = `
CREATE TABLE leads(
id serial primary key,
version int default 1,
name varchar(50) not null,
phone varchar(20) not null,
service varchar(50) not null
);
`