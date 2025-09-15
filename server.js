import { neon } from '@netlify/neon';

export default async function handler(req, res) {
  try {
    const sql = neon(); // usa NETLIFY_DATABASE_URL automáticamente

    // Consulta segura (usa parámetros, evita inyecciones SQL)
    const [user] = await sql`SELECT * FROM usuarios WHERE correo = ${req.body.correo}`;

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al consultar la base de datos" });
  }
}