# 🚗 Car Rental Website

A modern full-stack **Car Rental Platform** built using the **MERN Stack**. The application allows users to browse available cars, check availability, make bookings, and enables car owners to manage their vehicles through a dedicated dashboard.

---

## 📌 Features

### 👤 User Features

* User Authentication
* Browse available rental cars
* View detailed car information
* Search cars by location
* Check real-time car availability
* Book cars for selected dates
* View booking history
* Responsive design for all devices

### 🚘 Owner Features

* Secure Owner Dashboard
* Add new cars with image upload
* Update car details
* Manage listed cars
* View booking statistics
* Upload and update vehicle images
* Track earnings and bookings

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer
* Cloudinary

### Database

* MongoDB Atlas

### Deployment

* Frontend: Vercel
* Backend: Render
* Images: Cloudinary

---

## 📂 Project Structure

```text
car-rental-website
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── config
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/shivank-pundir/car-rental-website.git
cd car-rental-website
```

---

### 2. Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd server
npm install
```

---

### 3. Environment Variables

#### Backend (`server/.env`)

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

FRONTEND_URL=http://localhost:5173
```

#### Frontend (`client/.env`)

```env
VITE_BASE_URL=http://localhost:5000
VITE_CURRENCY=₹
```

---

## ▶️ Running the Project

### Backend

```bash
cd server
npm run server
```

### Frontend

```bash
cd client
npm run dev
```
---

## 🌟 Future Improvements

* Online Payment Integration (Stripe/Razorpay)
* Email Notifications
* Booking Cancellation
* Reviews & Ratings
* Wishlist
* Admin Panel
* Google Maps Integration
* Advanced Search & Filters

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.

---

## 📄 License

This project is created for educational and portfolio purposes.

---

## 👨‍💻 Developer

**Shivank Pundir**

* GitHub: https://github.com/shivank-pundir
* LinkedIn: *(Add your LinkedIn profile here)*

If you found this project helpful, don't forget to ⭐ the repository!
