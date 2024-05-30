import Cv from '../models/cv.model.js';
import puppeteer from 'puppeteer';
import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const convertPdf = async (req, res) => {
  const { html } = req.body;

  if (!html) return res.status(400).json({ message: "HTML not provided" });

  // Lee el contenido del archivo CSS
  const cssPath = path.join(__dirname, '..', '..', 'public', 'template1.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  console.log(html)
  // Agrega el CSS al HTML generado
  const styledHTML = `
      <html>
        <head>
        <script src="https://kit.fontawesome.com/8fd2dbd2a5.js" crossorigin="anonymous"></script>
          <style>
            ${cssContent}
          </style>
          <script>
        // Función para encontrar el elemento a una altura específica de la página
        document.addEventListener('DOMContentLoaded', function () {
            const habilidades = document.querySelectorAll('.section1_habilidades ul li');      
            const experiencias = document.querySelectorAll('.experiencias ul li');
            const formaciones = document.querySelectorAll('.formaciones ul li');
            const idiomas = document.querySelectorAll('.idiomas ul li');
            const formacionesContainer = document.getElementsByClassName('formaciones')[0];    
            const idiomasContainer = document.getElementsByClassName('idiomas')[0];

            const section1 = document.getElementsByClassName('section1')[0];
            const section2 = document.getElementsByClassName('section2')[0];
            const section1bottom = section1.getBoundingClientRect().bottom;
            const section2bottom = section2.getBoundingClientRect().bottom;

            let pageBreakInserted = false;
            let hasBreak = false;

            habilidades?.forEach((element) => {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.bottom;

                // Verificar si el borde superior del elemento está cerca de la altura objetivo
                if (elementTop > section1bottom && !pageBreakInserted) {
                    // Insertar un div de clase page-break justo antes de este elemento        
                    const breakDiv = document.createElement('div');
                    breakDiv.className = 'page_break';
                    element.parentNode.insertBefore(breakDiv, element);
                    pageBreakInserted = true;
                    hasBreak = true;
                }
            });

            pageBreakInserted = false;

            experiencias?.forEach((element) => {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.bottom;

                // Verificar si el borde superior del elemento está cerca de la altura objetivo
                if (elementTop > section2bottom && !pageBreakInserted) {
                    // Insertar un div de clase page-break justo antes de este elemento        
                    const breakDiv = document.createElement('div');
                    breakDiv.className = 'page_break';
                    element.parentNode.insertBefore(breakDiv, element);
                    pageBreakInserted = true;
                    hasBreak = true;
                }
            });

            if (formacionesContainer?.getBoundingClientRect().top > (section2bottom - 60) && !pageBreakInserted) {

                // Insertar un div de clase page-break justo antes de este elemento
                const breakDiv = document.createElement('div');
                breakDiv.className = 'page_break';
                formacionesContainer.parentNode.insertBefore(breakDiv, formacionesContainer);  
                pageBreakInserted = true;
                hasBreak = true;
            }

            if (formacionesContainer?.getBoundingClientRect().top > (section2bottom - 130) && !pageBreakInserted) {

                // Insertar un div de clase page-break justo antes de este elemento
                const breakDiv = document.createElement('div');
                breakDiv.className = 'page_break_large';
                formacionesContainer.parentNode.insertBefore(breakDiv, formacionesContainer);  
                pageBreakInserted = true;
                hasBreak = true;
                console.log(formacionesContainer.getBoundingClientRect().bottom + " " + section2bottom + " " + section1bottom)
            }

            formaciones?.forEach((element) => {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.bottom;

                // Verificar si el borde superior del elemento está cerca de la altura objetivo
                if (elementTop > section2bottom && !pageBreakInserted) {
                    // Insertar un div de clase page-break justo antes de este elemento        
                    const breakDiv = document.createElement('div');
                    breakDiv.className = 'page_break';
                    element.parentNode.insertBefore(breakDiv, element);
                    pageBreakInserted = true;
                    hasBreak = true;
                }
            });

            if (idiomasContainer?.getBoundingClientRect().top > (section2bottom - 60) && !pageBreakInserted) {

                // Insertar un div de clase page-break justo antes de este elemento
                const breakDiv = document.createElement('div');
                breakDiv.className = 'page_break';
                idiomasContainer.parentNode.insertBefore(breakDiv, idiomasContainer);
                pageBreakInserted = true;
                hasBreak = true;
            }

            if (idiomasContainer?.getBoundingClientRect().top > (section2bottom - 130) && !pageBreakInserted) {

                // Insertar un div de clase page-break justo antes de este elemento
                const breakDiv = document.createElement('div');
                breakDiv.className = 'page_break_large';
                idiomasContainer.parentNode.insertBefore(breakDiv, idiomasContainer);
                pageBreakInserted = true;
                hasBreak = true;
                console.log(idiomasContainer.getBoundingClientRect().bottom + " " + section2bottom + " " + section1bottom)
            }

            idiomas?.forEach((element) => {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.bottom;

                // Verificar si el borde superior del elemento está cerca de la altura objetivo
                if (elementTop > (section2bottom - 37.8) && !pageBreakInserted) {
                    // Insertar un div de clase page-break justo antes de este elemento        
                    const breakDiv = document.createElement('div');
                    breakDiv.className = 'page_break';
                    element.parentNode.insertBefore(breakDiv, element);
                    pageBreakInserted = true;
                    hasBreak = true;
                    console.log(element)
                }
            });

            if (hasBreak) {
                const template1 = document.getElementsByClassName('template1')[0];
                const computedHeight = window.getComputedStyle(template1).height;
                const originalHeight = parseFloat(computedHeight.replace('px', ''));
                template1.style.height = (originalHeight * 2) + 'px';
            }
        });
    </script>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(styledHTML, { waitUntil: 'networkidle0' });
    await page.evaluate(() => {

    });
    await page.emulateMediaType('screen');

    const pdf = await page.pdf({
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
      printBackground: true,
      format: 'A4',
    });

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const convertPng = async (req, res) => {
  const { html } = req.body;

  if (!html) return res.status(400).json({ message: "HTML not provided" });

  const cssPath = path.join(__dirname, '..', '..', 'public', 'template1.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  console.log(html)
  // Agrega el CSS al HTML generado
  const styledHTML = `
      <html>
        <head>
        <script src="https://kit.fontawesome.com/8fd2dbd2a5.js" crossorigin="anonymous"></script>
          <script src="https://kit.fontawesome.com/8fd2dbd2a5.js" crossorigin="anonymous"></script>
          <style>
            ${cssContent}

            .template1 {
              height: auto;
                min-height: 29.7cm !important;
              }
  
              .section1 {
                  height: auto;
                min-height: 100% !important;
              }
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;

  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });

  try {
    const page = await browser.newPage();

    await page.setContent(styledHTML, { waitUntil: 'networkidle0' });

    const screenshot = await page.screenshot({ fullPage: true });

    // Envía la imagen PNG como respuesta
    res.setHeader('Content-Type', 'image/png');
    res.send(screenshot);
  } catch (error) {
    res.status(500).send({ message: error.message });
  } finally {
    await browser.close();
  }
};

// export const updateCv = async (req, res) => {
//     const userFound = await User.findById(req.user.id);
//     if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

//     try {
//         const { data } = req.body;
//         const userUpdated = await User.findByIdAndUpdate(
//             req.user.id, // Usamos req.user.id directamente para buscar por ID
//             {
//                 cv: data
//             },
//             { new: true }
//         );
//         return res.json(userUpdated);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

export const getCvs = async (req, res) => {
  try {
    const cvs = await Cv.find({ user: req.user.id }).populate("user");
    res.json(cvs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCv = async (req, res) => {
  try {
    const { data } = req.body;
    console.log(data)
    const newCv = new Cv({
      data: data,
      user: req.user.id,
    });
    await newCv.save();
    res.json(newCv);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCv = async (req, res) => {
  try {
    const deletedCv = await Cv.findByIdAndDelete(req.params.id);
    if (!deletedCv)
      return res.status(404).json({ message: "Cv no encontrado" });

    const fotoPerfil = deletedCv.data?.perfil?.foto;

    if (fotoPerfil) {
      fs.unlinkSync(`uploads/${req.user.id}/${fotoPerfil}`);
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const uploadFotoRequest = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se ha subido ninguna foto" });
    }

    const cv = await Cv.findById(req.params.id);

    if (cv?.data?.perfil?.foto) {
      console.log(cv.data.perfil.foto)
      fs.unlinkSync(`uploads/${req.user.id}/${cv.data.perfil.foto}`);
    }

    const filename = req.file.filename;

    const cvUpdated = await Cv.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { 'cv.perfil.foto': filename } },
      { new: true }
    );

    return res.json(filename);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const deleteFoto = async (req, res) => {
  try {
    const { foto } = req.body;

    if (!foto) {
      return res.status(400).json({ message: "No se ha subido ninguna foto" });
    }

    const cv = await Cv.findById(req.params.id);

    if (cv?.data?.perfil?.foto) {
      console.log(cv.data.perfil.foto)
      fs.unlinkSync(`uploads/${req.user.id}/${cv.data.perfil.foto}`);
    }

    const cvUpdated = await Cv.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { 'cv.perfil.foto': null } },
      { new: true }
    );

    return res.sendStatus(204);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message });
  }
};

// export const loadFoto = async (req, res) => {
//   try {
//     const { nombreFoto } = req.params;

//     const rutaFoto = path.join(`/uploads/${nombreFoto}`);

//     fs.access(rutaFoto, fs.constants.F_OK, (err) => {
//       if (err) {
//         return res.status(404).json({ message: 'Foto no encontrada' });
//       }

//       res.sendFile(rutaFoto);
//     });
//   } catch (error) {
//     console.error('Error al obtener la foto:', error);
//     res.status(500).json({ message: 'Error interno del servidor' });
//   }
// };

export const loadFoto = async (req, res) => {
  try {
    const { file } = req.params;

    if (!file) {
      return res.status(400).json({ message: 'Nombre de foto no proporcionado' });
    }

    const rutaFoto = path.resolve(`uploads/${req.user.id}/${file}`);

    if (!fs.existsSync(rutaFoto)) {
      return res.status(404).json({ message: 'Foto no encontrada en el servidor' });
    }

    res.sendFile(rutaFoto);
  } catch (error) {
    console.error('Error al obtener la foto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updateCv = async (req, res) => {
  try {
    const { data } = req.body;
    console.log(req.body)
    const cvUpdated = await Cv.findOneAndUpdate(
      { _id: req.params.id },
      { data: data },
      { new: true }
    );
    return res.json(cvUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCv = async (req, res) => {
  try {
    const cv = await Cv.findById(req.params.id);
    if (!cv) return res.status(404).json({ message: "Cv no encontrado" });
    return res.json(cv);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};