create table users  ( 
    id serial primary key,
    name varchar() NOT NULL,
    email varchar() NOT NULL,
    password varchar() NOT NULL
);

create table to_do (
    id serial primary key,
    task text,
    status boolean,
    user_id, integer REFERENCES users (id)
);



