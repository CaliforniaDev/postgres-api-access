-- Create a new schema for database testing outside the public schema
CREATE SCHEMA test;

-- Create a new table 'users' in the 'test' schema
CREATE TABLE test.users (
  id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
  username VARCHAR -- Username column with variable character length
);

-- Insert sample data into the 'test.users' table
INSERT INTO test.users (username)
VALUES
  ('luke'),
  ('vader');

-- Select all data from the 'test.users' table to verify the insertions
SELECT * FROM test.users;

-- Set the search path to include the user's default schema and the public schema
SET search_path 
TO '$user', public;

-- Select all data from the 'users' table in the public schema
SELECT * FROM users;
