import Product from "../../models/Product.js";
import dotenv from "dotenv";

dotenv.config();
const URL_ = process.env.URL_;

// upload product image
const handleImageUpload = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }

    const imageUrl = `:${URL_}/api/uploads/images/${req.file.filename}`;

    res.json({
      success: true,
      result: {
        url: imageUrl,
      },
    });
  } catch (error) {
    console.error("Error handling image upload:", error); // Log the error
    res.status(500).json({
      success: false,
      message: "An error occurred while uploading the image.",
    });
  }
};

// add a new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;
    const productAlreadyExist = await Product.findOne({ title: title });
    if (productAlreadyExist)
      return res.json({
        success: false,
        message: "Product name already exist please change the name",
      });

    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    });

    await newProduct.save();
    res.status(200).json({
      success: true,
      message: "Product Added",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// fetch all products

const fetchAllProducts = async (req, res) => {
  try {
    const productsList = await Product.find({});
    res.status(200).json({
      success: true,
      data: productsList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// update a product

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    const findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    findProduct.image = image;
    findProduct.title = title;
    findProduct.description = description;
    findProduct.category = category;
    findProduct.brand = brand;
    findProduct.price = price;
    findProduct.salePrice = salePrice;
    findProduct.totalStock = totalStock;
    findProduct.averageReview = averageReview;

    await findProduct.save();

    res.status(200).json({
      success: true,
      message: "Product Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await Product.findByIdAndDelete(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

export {
  handleImageUpload,
  addProduct,
  updateProduct,
  deleteProduct,
  fetchAllProducts,
};
