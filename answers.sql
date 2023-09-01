-- Problem 1
SELECT email FROM customers ORDER BY email;

-- Problem 2
SELECT id FROM orders WHERE customer_id = (
    SELECT id FROM customers WHERE fname = 'Elizabeth' AND lname = 'Crocker'
);

-- Problem 3
SELECT SUM(num_cupcakes) FROM orders WHERE processed = 'f';

-- Problem 4
SELECT cupcakes.name, SUM(orders.num_cupcakes) FROM cupcakes JOIN orders ON (cupcakes.id = orders.cupcake_id) GROUP BY cupcakes.name ORDER BY name;

-- Problem 5
SELECT customers.email, SUM(orders.num_cupcakes) AS total FROM customers JOIN orders ON (customers.id = orders.customer_id) GROUP BY customers.email ORDER BY SUM(orders.num_cupcakes) DESC;

-- Problem 6
SELECT fname, lname, email FROM customers WHERE id = (SELECT customer_id FROM orders WHERE processed = 't' AND cupcake_id = (
    SELECT id FROM cupcakes WHERE name = 'funfetti'
) GROUP BY id LIMIT 1); 