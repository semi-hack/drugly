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

const getProductById = async(req, res) => {
    try {
        const product = await Product.findOne({ _id: req.query._id }).exec()

        if(!product) {
            return res.status(400).json({
                success: false,
                data: "could not get product"
            })
        }

        return res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            err: "error",
            success: false,
        })
    }
}

const getProductByCategory = async(req, res) => {
    try {
        const { page, perPage, searchQuery } = req.query;
        const options = {
          page: parseInt(page, 10) || 1,
          limit: parseInt(perPage, 20) || 50,
        };

        const data = await Product.paginate({ category: searchQuery }, options)
        // const products = await Product.find({ category: req.query.category }).exec()

        if(!data) {
            return res.status(400).json({
                success: false,
                data: "could not get product"
            })
        }

        return res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        return res.status(500).json({
            err: "error",
            success: false,
        })
    }

}

const getProductByName = async (req, res) => {
    try {
        const product = await Product.findOne({ name: req.query.name }).exec()

        if(!product) {
            return res.status(400).json({
                success: false,
                data: "could not get product"
            })
        }

        return res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            err: "error",
            success: false,
        })
    }
}

export default { addProduct, getAllProducts, getProductById, getProductByCategory, getProductByName }