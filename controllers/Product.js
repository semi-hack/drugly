import Product from "../models/Product.js";

const addProduct = async (req, res) => {
    const { name, brand, description } = req.body

    try {
        const drug = await Product.create({
            name: req.body.name,
            brand: req.body.brand,
            description: req.body.description,
        })

        return res.status(201).json({
            success: true,
            data: drug
        })

    } catch (error) {
        return res.status(500).json({
            err: "error",
            success: false,
        })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products =  await Product.find({}).exec()

        if(!products) {
            return res.status(400).json({
                success: false,
                data: "could not get products"
            })
        }

        return res.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {
        return res.status(500).json({
            err: "error",
            success: false,
        })
    }
}

export default { addProduct, getAllProducts }