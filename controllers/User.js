import User from '../models/User.js';
import Transaction from '../models/Transaction.js'


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

// Add to Cart

// charge card
const chargeCard = async (req, res) => {

    const response = await axios.post('https://api.paystack.co/charge', {
         card: {
             number: req.body.number,
             cvv: req.body.cvv,
             expiry_year: req.body.expiry_year,
             expiry_month: req.body.expiry_month
         },
         email: req.body.email,
         amount: req.body.amount*100
     }, {
         headers: {
             Authorization: 'Bearer sk_test_a012302ce0ed747bf015189fe0b914b0f4742e2c'
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
 
         await Transaction.create(transPayload);
 
  
         return res.status(200).json({
             success: true,
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


export default { createUser, chargeCard }