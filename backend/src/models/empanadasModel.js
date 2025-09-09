// backend/src/models/empanadasModel.js
import { pool } from "../db.js";

export async function findAll() {
  const [rows] = await pool.execute(
    "SELECT * FROM empanadas ORDER BY id DESC"
  );
  return rows;
}

export async function create({
  name,
  type,
  filling = null,
  price = null,
  is_sold_out = false
}) {
  const [result] = await pool.execute(
    "INSERT INTO empanadas (name, type, filling, price, is_sold_out) VALUES (?,?,?,?,?)",
    [name, type, filling, price, Boolean(is_sold_out)]
  );
  return { id: result.insertId };
}

export async function update(id, data) {
  const {
    name,
    type,
    filling = null,
    price = null,
    is_sold_out = false
  } = data;

  const [result] = await pool.execute(
    "UPDATE empanadas SET name=?, type=?, filling=?, price=?, is_sold_out=? WHERE id=?",
    [name, type, filling, price, Boolean(is_sold_out), id]
  );

  return result.affectedRows; // 1 si actualizó, 0 si no encontró
}

export async function remove(id) {
  const [result] = await pool.execute(
    "DELETE FROM empanadas WHERE id=?",
    [id]
  );
  return result.affectedRows; // 1 si eliminó, 0 si no encontró
}
