const assessments = 
 `CREATE table assessments(
    id serial4 primary key,
    version int4 default 1,
    full_name VARCHAR(50),
    email varchar(50),
    age int4,
    gender varchar(10),
    company_name varchar(50),
    designation varchar(50),
    sit_time varchar(10),
    exercise_time varchar(10),
    physical_activity varchar(100),
    sleep_time varchar(10),
    medical_condition varchar(50),
    medications varchar(50),
    surgeries varchar(50),
    services_interest varchar(500),
    goals varchar(100),
    isdeleted BOOLEAN DEFAULT false,
    creation_time TIMESTAMP DEFAULT timezone('utc', now())
)`