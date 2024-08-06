const Patients=`
CREATE table patients(
    id serial4 primary key,
    version int4 default 1,
    name varchar(20),
    phone varchar(15),
    image varchar(255),
    isdeleted BOOLEAN DEFAULT false,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(500),
    creation_time TIMESTAMP DEFAULT timezone('utc', now()),
    time TIMESTAMP DEFAULT timezone('utc', now()),
    program int4 null, 
    users int4 null,
    Constraint service_fkey FOREIGN KEY (service) REFERENCES "program"(id),
    Constraint doctor_fkey FOREIGN KEY (users) REFERENCES "users"(id)
)
`
