import { neon } from '@netlify/neon';
import bcrypt from "bcryptjs"; // necesitas instalarlo con npm

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { correo, password } = req.body;
    const sql = neon();

    // Busca el usuario por correo
    const [user] = await sql`SELECT * FROM usuarios WHERE correo = ${correo}`;

    if (!user) {
      return res.status(401).json({ success: false, message: "Usuario no encontrado" });
    }

    // Verificar contraseña con bcrypt
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
    }

    // ✅ Si todo está bien
    return res.status(200).json({ success: true });
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Error en el servidor" });
  }
}