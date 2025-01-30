#!/bin/bash

# Define project name
PROJECT_NAME="marketplace-project"

echo "🚀 Setting up the $PROJECT_NAME project..."

# Create main project folder
mkdir $PROJECT_NAME && cd $PROJECT_NAME

# Create Backend
echo "📂 Creating backend..."
mkdir -p backend/{config,models,routes,controllers,middleware,uploads}
cd backend

# Initialize backend package.json
npm init -y

# Install backend dependencies
npm install express mongoose dotenv cors multer jsonwebtoken bcryptjs morgan

# Install dev dependencies
npm install --save-dev nodemon

# Create essential backend files
cat <<EOL > server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('./config/db');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`🚀 Server running on port \${PORT}\`));
EOL

cat <<EOL > config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

connectDB();
EOL

cat <<EOL > .env
MONGO_URI=mongodb://localhost:27017/marketplace
JWT_SECRET=your_jwt_secret
EOL

echo "✅ Backend setup completed."

# Move back to the project root
cd ..

# Create Frontend
echo "📂 Creating frontend..."
mkdir -p frontend/{public/assets/{images,css,js},views}
cd frontend

# Initialize frontend package.json
npm init -y

# Install frontend dependencies
npm install ejs axios

# Create essential frontend files
cat <<EOL > app.js
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`🌍 Frontend running on port \${PORT}\`));
EOL

cat <<EOL > views/home.ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marketplace</title>
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
    <h1>Welcome to the Marketplace</h1>
</body>
</html>
EOL

echo "✅ Frontend setup completed."

# Move back to project root
cd ..

# Create a .gitignore file
cat <<EOL > .gitignore
node_modules
.env
uploads
EOL

echo "🎉 Setup complete! Run 'cd backend && npm start' to start the backend."
