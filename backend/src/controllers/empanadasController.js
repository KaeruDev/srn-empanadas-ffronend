import * as Empanadas from "../models/empanadasModel.js";

export async function list(req, res) {
  try {
    const rows = await Empanadas.findAll();
    return res.json(rows);
  } catch (err) {
    console.error("list error:", err);
    return res.status(500).json({ error: "Error interno" });
  }
}

export async function createOne(req, res) {
  try {
    const { name, type } = req.body;
    if (!name || !type) {
      return res.status(400).json({ error: "name y type son obligatorios" });
    }
    const result = await Empanadas.create(req.body);
    return res.status(201).json(result); 
  } catch (err) {
    console.error("createOne error:", err);
    return res.status(500).json({ error: "Error interno" });
  }
}

export async function updateOne(req, res) {
  try {
    const { id } = req.params;
    const { name, type } = req.body;
    if (!id) return res.status(400).json({ error: "id requerido" });
    if (!name || !type) {
      return res.status(400).json({ error: "name y type son obligatorios" });
    }
    const affected = await Empanadas.update(id, req.body);
    if (!affected) return res.status(404).json({ error: "no existe" });
    return res.json({ updated: true });
  } catch (err) {
    console.error("updateOne error:", err);
    return res.status(500).json({ error: "Error interno" });
  }
}

export async function deleteOne(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "id requerido" });
    const affected = await Empanadas.remove(id);
    if (!affected) return res.status(404).json({ error: "no existe" });
    return res.status(204).send();
  } catch (err) {
    console.error("deleteOne error:", err);
    return res.status(500).json({ error: "Error interno" });
  }
}
