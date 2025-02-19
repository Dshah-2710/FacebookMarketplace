const path = require("path");
const multer = require("multer");

// Multer Storage for File Uploads
const storage = multer.diskStorage({
    destination: "./public/uploads/",  // Folder where images will be saved
    filename: function (req, file, cb) {
        // Generate a unique filename for each uploaded image
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage }).single("image");

// Temporary storage for products (replace with a database later)
const products = [];

// GET: Display Add Product Form
exports.getAddProduct = (req, res) => {
    console.log("GET /add-product - Display Add Product Form");
    res.render("add-product", { title: "Add Product" });
};

// POST: Handle Product Submission
exports.postAddProduct = (req, res) => {
    console.log("POST /add-product - Handling product submission");
    upload(req, res, (err) => {
        if (err) {
            console.error("File upload error:", err);
            return res.status(500).send("File Upload Error");
        }

        console.log("Uploaded File:", req.file); // Debug uploaded file
        console.log("Request Body:", req.body); // Debug request body

        const { title, category, description, price } = req.body;
        const conditions = req.body.condition || [];

        // Validation
        if (!title || !category || !description || !price) {
            console.error("Missing required fields");
            return res.status(400).send("All fields are required");
        }

        if (isNaN(price)) {
            console.error("Invalid price:", price);
            return res.status(400).send("Invalid price");
        }

        // Create a new product object
        const product = {
            id: products.length + 1, // Simple auto-increment for ID
            title,
            category,
            description,
            price: parseFloat(price),  // Parse price as a float
            conditions: Array.isArray(conditions) ? conditions : [conditions],
            image: req.file ? req.file.filename : "default.jpg",  // Default image if none uploaded
        };

        console.log("Created Product:", product); // Debug created product

        // Add product to the temporary products array
        products.push(product);
        console.log("Products Array After Addition:", products); // Debug array of products

        res.redirect("/products-list");  // Redirect to product listing page
    });
};

// GET: Display All Products
exports.getProducts = (req, res) => {
    console.log("GET /products - Displaying all products");
    res.render("product-list", { title: "Products", products });
};
