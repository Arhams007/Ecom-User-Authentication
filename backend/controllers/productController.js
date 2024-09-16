import productModal from "../models/productModal.js";
import fs from "fs";
import slugify from "slugify";

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required" });

      case !description:
        return res.status(400).send({ error: "Description is required" });

      case !price:
        return res.status(400).send({ error: "Price is required" });

      case !category:
        return res.status(400).send({ error: "Category is required" });

      case !quantity:
        return res.status(400).send({ error: "Quantity is required" });

      case photo && photo.size > 1000000: // 1MB
        return res.status(400).send({ error: "Photo should be less than 1MB" });
    }

    const product = new productModal({ ...req.fields, slug: slugify(name) });

    if (photo) {
      product.photo = {}; // Ensure photo is initialized as an object
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating product",
      error,
    });
  }
};

//get all product

export const getProductController = async (req, res) => {
  try {
    const products = await productModal
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countotal: products.length,
      message: "allproducts",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all product",
      error: error.message,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const products = await productModal
      .findOne({ slug: req.params.slug })
      .select("photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "single-products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting single product",
      error,
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModal.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error,
    });
  }
};


export const deleteProductController = async (req,res)=>{
  try {
     await productModal.findByIdAndDelete(req.params.pid).select("-photo")
     res.status(200).send({
      success:true,
      message:"product Deleted successfully"
     })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
}


export const updateProductController = async (req,res) =>{
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required" });

      case !description:
        return res.status(400).send({ error: "Description is required" });

      case !price:
        return res.status(400).send({ error: "Price is required" });

      case !category:
        return res.status(400).send({ error: "Category is required" });

      case !quantity:
        return res.status(400).send({ error: "Quantity is required" });

      case photo && photo.size > 1000000: // 1MB
        return res.status(400).send({ error: "Photo should be less than 1MB" });
    }

    const product = await productModal.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true})

    if (photo) {
      product.photo = {}; // Ensure photo is initialized as an object
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.status(201).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating product",
      error,
    });
  }
}