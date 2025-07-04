const Product = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch products" });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch product" });
  }
};

exports.createProduct = async (req, res) => {
  console.log('req.body', req.body)
  const { name, description, price, category, brand, stock, isAvailable } =
    req.body;

  if (!name || name.trim().length < 2) {
    return res
      .status(400)
      .json({ error: "Name is required and must be at least 2 characters" });
  }

  if (!description || description.trim().length < 10) {
    return res
      .status(400)
      .json({
        error: "Description is required and must be at least 10 characters",
      });
  }

  if (price === undefined || price < 0) {
    return res
      .status(400)
      .json({ error: "Price is required and cannot be negative" });
  }

  if (!category || category.trim() === "") {
    return res.status(400).json({ error: "Category is required" });
  }

  if (stock === undefined || stock < 0) {
    return res
      .status(400)
      .json({ error: "Stock is required and cannot be negative" });
  }

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      brand,
      stock,
      isAvailable,
    });

    const saved = await newProduct.save();
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, brand, stock, isAvailable } =
    req.body;

  if (!name || name.trim().length < 2) {
    return res
      .status(400)
      .json({ error: "Name must be at least 2 characters" });
  }

  if (!description || description.trim().length < 10) {
    return res
      .status(400)
      .json({ error: "Description must be at least 10 characters" });
  }

  if (price === undefined || price < 0) {
    return res.status(400).json({ error: "Price cannot be negative" });
  }

  if (!category || category.trim() === "") {
    return res.status(400).json({ error: "Category is required" });
  }

  if (stock === undefined || stock < 0) {
    return res.status(400).json({ error: "Stock cannot be negative" });
  }

  try {
    const updated = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        category,
        brand,
        stock,
        isAvailable,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) return res.status(404).json({ error: "Product not found" });

    return res.status(200).json(updated);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete product" });
  }
};
