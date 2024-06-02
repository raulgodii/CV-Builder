import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurar Multer para almacenar archivos
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // const uploadDir = `uploads/${req.user.id}`;
//     const uploadDir = path.join(__dirname, '..', '..', 'uploads', req.user.id.toString());
//     fs.access(uploadDir, (err) => {
//       if (err) {
//         fs.mkdir(uploadDir, (err) => {
//           if (err) {
//             console.error('Error al crear la carpeta de uploads:', err);
//             cb(err, null);
//           } else {
//             cb(null, uploadDir);
//           }
//         });
//       } else {
//         cb(null, uploadDir);
//       }
//     });
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
const storage = multer.memoryStorage();

const upload = multer({ storage });

export const uploadFoto = (req, res, next) => {
  upload.single('foto')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: 'Error al cargar la foto' });
    } else if (err) {
      console.log(err)
      return res.status(500).json({ message: 'Error interno del servidor' });
    }

    next();
  });
};
