# CV Builder

CV Builder is a web application designed to simplify and professionalize the creation of resumes (CVs). Users can generate personalized CVs through an intuitive interface and download the final result in PDF format. The goal is to help individuals, especially those without advanced editing skills, create high-quality resumes quickly and reliably.

![Sin título (1)](https://github.com/raulgodii/CV-Builder/assets/102313699/acd7f4c5-3425-4511-be5b-2f2915fa0e3f)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Guided form for creating CVs with necessary and sufficient fields
- High-quality PDF generation using Puppeteer
- User authentication and authorization using JWT
- Profile photo storage using Google Drive integration
- Interactive and responsive UI with React and Anime.js
- MongoDB for flexible and scalable data storage

## Technologies Used

### Frontend

- **React**: For building the user interface
- **React Hook Form**: For handling form validation and submission
- **React Router DOM**: For client-side routing
- **Framer Motion**: For animations

### Backend

- **Node.js**: For server-side programming
- **Express**: For handling HTTP requests and routing
- **Puppeteer**: For PDF generation
- **MongoDB**: For NoSQL database
- **Mongoose**: For object data modeling with MongoDB
- **JWT (JSON Web Tokens)**: For user authentication and authorization
- **Multer**: For handling file uploads
- **Morgan**: For HTTP request logging
- **dotenv**: For managing environment variables
- **Google APIs**: For integrating Google Drive storage

## API Endpoints
- POST /api/auth/register: Register a new user
- POST /api/auth/login: Authenticate a user
- POST /api/convert: Generate a CV in PDF format
- POST /api/convertImage: Generate a CV in PNG format
- GET /api/cvs: Get your CVs
- POST /api/cvs: Create CV
- GET /api/cvs/:id: Get CV
- PUT /api/cvs/:id: Update CV
- DELETE /api/cvs/:id: Delete CV
- POST /api/cv/uploadFoto/:id: Upload file
- DELETE /api/cv/deleteFoto/:id: Delete file
- GET /api/cv/files/:file: Get file

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any improvements or bug fixes.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for checking out CV Builder! We hope you find this project useful. If you have any questions or suggestions, feel free to open an issue or contact us directly.
