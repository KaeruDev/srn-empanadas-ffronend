CREATE TABLE IF NOT EXISTS empanadas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  filling TEXT,
  price DECIMAL(10,2),
  is_sold_out BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO empanadas (type, name, filling, price) VALUES
('Horno', 'Pino', NULL, 2500),
('Frita', 'Queso', NULL, 2200),
('Horno', 'Vegetariana', 'choclo/aceituna', 2300),
('Frita', 'Camarón queso', NULL, 2900);
