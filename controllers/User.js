import User from '../models/User.js';
import axios from 'axios';
import Transaction from '../models/Transaction.js'
import crypto from 'crypto'
import Order from '../models/Order.js'
import dotenv from 'dotenv';
import { INSPECT_MAX_BYTES } from 'buffer';

dotenv.config();


// SignUp User
const createUser = async (req, res) => {
  try {

    const exist = await User.findOne({ email: req.body.email }).exec();
    if (exist) {
      return res.status(409).json({
        error: "This user exists",
        success: false,
      });
    }


    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      dob: req.body.dob,
      phone: req.body.phone,
      gender: req.body.gender,
      blood_group: req.body.blood_group,
      blood_type: req.body.blood_type
    });

    await user.save();

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      error: "server error",
      success: false,
    });
  }
};

// get user
const getUser = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.query._id }).populate({
      path: 'orders',
      populate: {
        path: 'item.productId',
        model: 'Product'
      }
    });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      error: "server error",
      success: false,
    })
  }
}

// Save Item
const saveItem = async (req, res) => {
  try {
    let user = await User.findOneAndUpdate({ _id: req.body._id}, {$push: { saved: req.body.item}}, {new: true}).populate('saved')

    if(!user) {
      return res.status(409).json({
        error: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      error: "server error",
      success: false,
    })
  }
}

// delete saved item
const deleteSavedItem = async (req, res) => {
  try {
    let user = await User.findOneAndUpdate({_id: req.body._id}, {$pull: {saved: req.body.item}}, {new: true}).populate('saved')

    if(!user) {
      return res.status(409).json({
        error: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      error: "server error",
      success: false,
    })
  }
}

// charge card
const chargeCard = async (req, res) => {
  let response = await axios.post('https://api.paystack.co/charge', {
    card: {
      number: req.body.number,
      cvv: req.body.cvv,
      expiry_year: req.body.expiry_year,
      expiry_month: req.body.expiry_month
    },
    email: req.body.email,
    amount: req.body.amount * 100
  }, {
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK}`
    }
  })

  if (response.data.data.status === 'success') {
    let transPayload = {
      Amount: req.body.amount,
      Email: req.body.email,
      userId: req.body.userId,
      reference: crypto.randomBytes(4).toString("hex"),
      status: response.data.data.status
    }

    let orderPayload = {
      userId: req.body.userId,
      item: req.body.item,
      address: req.body.address
    }

    const user_order = await Order.create(orderPayload);

    const returned_user = await User.findOneAndUpdate({ _id: req.body.userId }, { $push: { orders: user_order } }, { new: true })

    await Transaction.create(transPayload);


    return res.status(200).json({
      success: true,
      data: returned_user
    })

  } else {

    let transPayload = {
      Amount: req.body.amount,
      Email: req.body.email,
      userId: req.body.userId,
      reference: crypto.randomBytes(4).toString("hex"),
      status: response.data.data.status
    }

    await Transaction.create(transPayload);

    return res.json(403).status({
      success: false
    })
  }


}

const corserr = async (req, res) => {
  res.send("hey man, its not a cors error")
}

export default { createUser, saveItem, deleteSavedItem, getUser, chargeCard, corserr }