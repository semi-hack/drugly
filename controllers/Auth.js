import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const secret = "eggs"

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: req.body.email }).exec();
      if (!user) {
        return res.status(404).json({
          error: "user not found",
          success: false,
        });
      }
  
      user.comparePassword(req.body.password, (err, match) => {
        if (!match) {
          return response
            .status(400)
            .send({ message: "The password is invalid" });
        }
      });
  
      const token = jwt.sign({ _id: user._id }, secret, { expiresIn: '10h' });

      return res.json({
        success: true,
        data: token,
        payload: user,
      });
    } catch (error) {
      return res.status(500).json({
        err: "error login in",
        success: false,
      });
    }
};

export default { login }