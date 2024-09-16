import categoryModal from "../models/categoryModal.js";
import slugify from "slugify";
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "name is required" });
    }
    const existingCategory = await categoryModal.findOne({ name });
    if (existingCategory) {
      res.status(200).send({
        success: "true",
        message: "Category Already Exists",
      });
    }
    const category = await new categoryModal({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: "true",
      message: "New Category  created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: "false",
      message: "Error in Category",
      error,
    });
  }
};

// update category controllers

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModal.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category update Succesfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: "false",
      message: "Error in while updating category",
      error,
    });
  }
};

export const categoryController =async (req,res) =>{
try {
    const category = await categoryModal.find({})
    res.status(200).send({
success:true,
message:'All categories List',
category
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
      success: "false",
      message: "Error in while getting all  category",
      error,
    });
}
}


export const singleCategoryController = async (req,res)=>{
    try {
        const category = await categoryModal.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:'get single categories success',
            category
                })
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: "false",
          message: "Error in while getting single  category",
          error,
        });
    }
}


export const  deleteCategoryController = async (req,res)=>{
    try {
        const {id} =req.params
        await categoryModal.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:' categories deleted successfully',
        
                })
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: "false",
          message: "Error  while deleting category",
          error,
        });
    }
}