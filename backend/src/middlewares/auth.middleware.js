import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    // Leer cookie del token desde las cabeceras
    const { token } = req.cookies;
    
    // Si no hay token, error
    if(!token) return res.status(401).json({ message: "Authorization denied "});

    // Verificar que es un token válido
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if(err) return res.status(403).json({ message: "Invalid token" })

        req.user = decoded;

        next();
    });
}