# RESHAA — Every Thread Has a Tale. 🛍️

**RESHAA (WearReshaa)** is a modern clothing e-commerce platform designed to bring style, comfort, and individuality together. Built for a new generation of fashion lovers, the platform focuses on a clean shopping experience, product discovery, and customizable apparel.

## ✨ Features

- **Modern UI:** Responsive storefront with a clean, aesthetic design.
- **Product Catalogue:** Browse clothing products, collections, and product details.
- **Product Details:** View product information, fabric, fit, available sizes, colors, and images.
- **Custom Apparel:** A dedicated custom T-shirt experience for personalized clothing.
- **Authentication:** Google login and phone OTP authentication.
- **Shopping Cart:** Add products to the cart and manage selections.
- **Checkout & Orders:** Backend integration for creating and storing customer orders in MongoDB.
- **Responsive Design:** Designed to provide a smooth experience across desktop and mobile devices.

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router

### Backend

- Node.js
- Express.js
- REST APIs

### Database

- MongoDB
- Mongoose

### Authentication

- Google login
- Phone OTP authentication

### Development Tools

- Git
- GitHub
- Visual Studio Code
- npm

## 📁 Project Structure

```text
WearReshaa/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

*Note: The structure above is illustrative. Update it to match the actual folders and files in your repository.*

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js and npm
- MongoDB or a MongoDB Atlas database
- Git

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd WearReshaa
```

Replace `<YOUR_REPOSITORY_URL>` with your GitHub repository URL.

### 2. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

Vite will display the local development URL in your terminal.

### 3. Set up the backend

Open another terminal:

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory and add the environment variables required by your application.

Example:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
```

Add any additional variables required by your authentication and application configuration. Use the exact variable names expected by your code.

Start the backend using the script defined in `backend/package.json`, for example:

```bash
npm run dev
```

If your project uses a different script, use the configured command instead.

## 🔐 Security

Security is an important part of building a reliable e-commerce platform.

- Keep environment variables and API secrets out of source control.
- Validate incoming requests on the backend.
- Enforce authentication and authorization for protected endpoints.
- Verify product prices and order totals on the server.
- Restrict database access using appropriate permissions.
- Use HTTPS and secure production configuration.

The production security audit and payment integration should be verified before launch.

## 🗺️ Roadmap

- [x] React-based storefront
- [x] Product catalogue and product detail pages
- [x] Google login and phone OTP authentication
- [x] Shopping cart functionality
- [x] Backend order creation and MongoDB persistence
- [x] Complete custom product and customization ID integration
- [x] Complete security audit
- [x] Integrate and verify online payments
- [x] Production deployment and end-to-end testing

## 🎯 Project Goal

The goal of RESHAA is to create a seamless online shopping experience for contemporary clothing, combining thoughtful design with practical e-commerce functionality.

## 👩‍💻 Development

This project is being developed using modern web technologies, with an emphasis on responsive design, maintainable code, secure backend APIs, and a smooth customer experience.

## 📄 License

A license has not yet been specified. Add an appropriate license before distributing or reusing the project.

---

**RESHAA — Every Thread Has a Tale.** 🖤

*Wear your story. Make it yours.*
