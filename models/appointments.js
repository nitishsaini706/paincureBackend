const appointments=`
CREATE table appointments(
    id serial4 primary key,
    version int4 default 1,
    appointment_time TIMESTAMP,
    patient_id int4,
    user_id int4,
    isdeleted BOOLEAN DEFAULT false,
    creation_time TIMESTAMP DEFAULT timezone('utc', now()),
    Constraint user_fkey FOREIGN KEY (user_id) REFERENCES "users"(id),
    Constraint patient_fkey FOREIGN KEY (patient_id) REFERENCES "patient"(id)
)
` 