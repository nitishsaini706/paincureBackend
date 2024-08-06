const availability=`
CREATE table availability(
    id serial4 primary key,
    version int4 default 1,
    monday BOOLEAN[3] DEFAULT ARRAY[true, true, true],
    tuesday BOOLEAN[3] DEFAULT ARRAY[true, true, true],
    wednesday BOOLEAN[3] DEFAULT ARRAY[true, true, true],
    thursday BOOLEAN[3] DEFAULT ARRAY[true, true, true],
    friday BOOLEAN[3] DEFAULT ARRAY[true, true, true],
    saturday BOOLEAN[3] DEFAULT ARRAY[true, true, true],
    sunday BOOLEAN[3] DEFAULT ARRAY[true, true, true],
    isdeleted BOOLEAN DEFAULT false,
    creation_time TIMESTAMP DEFAULT timezone('utc', now())
)
`