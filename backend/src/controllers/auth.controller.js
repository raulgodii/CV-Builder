import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Buscar si hay un usuario existente con el mismo email
        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json(['El email ya está en uso']);

        // Encriptar contraseña
        const passwordHash = await bcrypt.hash(password, 10);

        // Crear nuevo modelo User
        const newUser = new User({
            username,
            email,
            authMethod: 'default',
            password: passwordHash
        });

        // Guardar User en BD y crear token
        const userSaved = await newUser.save();
        const token = await createAccessToken({
            id: userSaved.id
        });

        // Retornar cookie + user 
        res.cookie('token', token, {
            sameSite: process.env.NODE_ENV === 'production' ? 'none': '',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.json({
            id: userSaved.id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            udpatedAt: userSaved.updatedAt
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar si existe el usuario
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json(["No se ha encontrado ningún usuario con ese email"]);

        if (userFound.authMethod != 'default') return res.status(400).json(["Usuario registrado previamente con " + userFound.authMethod]);

        // Comprobar si las contraseñas coinciden
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json(["Contraseña incorrecta"]);

        // Crear nuevo token
        const token = await createAccessToken({
            id: userFound.id
        });

        // Retornar cookie + user
        res.cookie('token', token, {
            sameSite: process.env.NODE_ENV === 'production' ? 'none': '',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            udpatedAt: userFound.updatedAt
        });
    } catch (error) {
        res.status(500).json([error.message]);
    }
};

export const loginGoogle = async (req, res) => {
    const { data } = req.body;
    try {
        // Buscar si el usuario ya existe
        let user = await User.findOne({ email: data.email });
        if (!user) {
            // Si el usuario no existe, crear uno nuevo
            user = new User({
                username: data.name,
                email: data.email,
                authMethod: 'google'
            });
            await user.save();
        }

        // Crear un token de acceso para el usuario
        const token = await createAccessToken({
            id: user.id
        });

        // Retornar cookie + user
        res.cookie('token', token, {
            sameSite: process.env.NODE_ENV === 'production' ? 'none': '',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            udpatedAt: user.updatedAt
        });
    } catch (error) {
        res.status(500).json([error.message]);
    }
};


export const logout = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0)
    });
    return res.sendStatus(200);
};

export const verifyToken = async (req, res) => {
    // Leer cookie token de las cabeceras
    const { token } = req.cookies;

    // Si no hay cookie token return 401
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    // Si hay token => verificarlo
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        // Si el token no es válido return 401
        if (err) return res.status(401).json({ message: 'Unauthorized' });

        // Verificar si el usuario existe, si no return 401
        const userFound = await User.findById(user.id);
        if (!userFound) return res.status(401).json({ message: 'Unauthorized' });

        // Si el usuario es encontrado return user
        return res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email
        });

    });
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    return res.json({
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        udpatedAt: userFound.updatedAt
    });
};