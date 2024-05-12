import User from '../models/cv.model.js';
import puppeteer from 'puppeteer';
import fs from "fs";

export const convert = async (req, res) => {
    const { html } = req.body;

    if (!html) return res.status(400).json({ message: "HTML not provided" });

    // Lee el contenido del archivo CSS
    const cssContent = fs.readFileSync("./public/template1.css", "utf8");

    // Agrega el CSS al HTML generado
    const styledHTML = `
      <html>
        <head>
        <script src="https://kit.fontawesome.com/8fd2dbd2a5.js" crossorigin="anonymous"></script>
          <style>
            ${cssContent}
          </style>
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
    const cvs = await Cv.find({ user : req.user.id }).populate("user");
    res.json(cvs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCv = async (req, res) => {
  try {
    const { data } = req.body;
    const newCv = new Cv({
      data,
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

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCv = async (req, res) => {
  try {
    const { data } = req.body;
    const cvUpdated = await Cv.findOneAndUpdate(
      { _id: req.params.id },
      { data },
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