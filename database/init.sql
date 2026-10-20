CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(150) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'customer'
);
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'pending'
);
-- Dados totalmente ficticios. Os hashes abaixo sao marcadores, nunca senhas reais.
INSERT INTO users (name,email,password_hash,role) VALUES
('Ana Lima','ana@example.test','demo_hash_ana','customer'),
('Bruno Costa','bruno@example.test','demo_hash_bruno','customer'),
('Carla Souza','carla@example.test','demo_hash_carla','admin');
INSERT INTO products (name,price,stock) VALUES
('Teclado USB',79.90,15),('Mouse Optico',39.90,20),('Headset',149.90,8),('Webcam HD',119.90,5);
INSERT INTO orders (user_id,product_id,quantity,status) VALUES
(1,1,1,'paid'),(2,3,1,'pending'),(1,2,2,'shipped');
