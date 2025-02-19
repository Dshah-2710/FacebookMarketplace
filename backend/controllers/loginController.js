const bcrypt = require('bcrypt');
const User = require('../models/user');

// ✅ Render login page
const loginPage = (req, res) => {
    res.render('login'); // Automatically looks for 'login.ejs'
}

// ✅ Render registration page
const registerPage = (req, res) => {
    res.render('register'); // Automatically looks for 'register.ejs'
}

// ✅ Handle login (with test user logic)
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const testUserEmail = 'sd@gmail.com';
    const testUserPassword = 'testPassword123';

    if (email === testUserEmail && password === testUserPassword) {
        // Sample product data
        const sampleProducts = [
            { id: 1, name: "Samsung Galaxy S21 Ultra", image: "/images/samsung.jpg", price: 999, description: "A flagship Android phone." },
            { id: 2, name: "iPhone", image: "/images/phone2.jpg", price: 1099, description: "The latest iPhone with dynamic island design." },
            { id: 3, name: "iPad 10th Gen (M2, 2022)", image: "/images/ipad.jpg", price: 1200, description: "Lightweight laptop powered by the M2 chip." },
            { id: 4, name: "Truck", image: "/images/truck.jpg", price: 499, description: "Next-gen gaming console." },
            { id: 5, name: "Bose Headphones", image: "/images/headphones.jpg", price: 299, description: "Noise-cancelling headphones." },
            { id: 6, name: "Nothing Phone1", image: "/images/phone2.jpg", price: 399, description: "Stylish smartwatch with health monitoring." },
            { id: 7, name: "Electric Bicycle", image: "/images/bicycle.jpg", price: 899, description: "Eco-friendly e-bike with pedal assist." },
            { id: 8, name: "Logitech Headphones", image: "/images/headphone2.jpg", price: 99, description: "Ergonomic mouse with customizable buttons." }
        ];

        return res.render('product-list', { products: sampleProducts });
    } else {
        // Pass error message to login page
        return res.render('login', { errorMessage: ' '});
    }
};

const registerUser = async (req, res) => {
    const { email, password, gender, age, profession } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('register', { errorMessage: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            gender,
            age,
            profession,
        });

        await newUser.save();

        // ✅ Correct absolute redirect
        res.redirect('/product-list');  
    } catch (err) {
        res.status(500).render('register', { errorMessage: 'Server error' });
    }
};


// ✅ Handle logout
const logoutUser = (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'Logout successful' });
};

module.exports = { loginPage, registerPage, loginUser, logoutUser, registerUser };
