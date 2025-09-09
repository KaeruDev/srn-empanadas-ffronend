import request from "supertest";
import app from "../app.js";

// 1) Salud del server (no requiere DB)
test("GET /health responde 200 y { ok: true }", async () => {
  const res = await request(app).get("/health");
  expect(res.status).toBe(200);
  expect(res.body).toEqual({ ok: true });
});

// 2) Validación en POST (sin DB)
test("POST /api/empanada con campos vacíos devuelve 400", async () => {
  const res = await request(app)
    .post("/api/empanada")
    .send({ name: "", type: "" }); // el controller valida antes de tocar el modelo
  expect(res.status).toBe(400);
  expect(res.body.error).toMatch(/obligatorios/i);
});

// 3) Validación en PUT (sin DB)
test("PUT /api/empanada/:id con datos inválidos devuelve 400", async () => {
  const res = await request(app)
    .put("/api/empanada/123")
    .send({ name: "", type: "" }); // también cae por validación
  expect(res.status).toBe(400);
  expect(res.body.error).toMatch(/obligatorios/i);
});
