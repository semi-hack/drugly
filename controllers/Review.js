import mongoose from "mongoose";
import Product from "../models/Product.js";
import Review from "../models/Review.js";
import User from "../models/User.js";

// add a review
const addReview = async (req, res) => {
  const reviews = new Review({
    product: req.body.product,
    user: req.body.user,
    rating: req.body.rating,
    message: req.body.message,
  });

  await reviews.save();

  try {
    const data = await Product.findByIdAndUpdate(
      req.body.product,
      {
        $push: {
          review: reviews,
        },
      },
      { new: true }
    ).populate({ path: "review", populate: [{ path: "user", model: "User" }] });

    if (!data) {
      return res.status(400).json({
        message: "error creating review",
      });
    }

    return res.json({
      success: true,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      error: "There was an error.",
      success: false,
    });
  }
};


export default { addReview }