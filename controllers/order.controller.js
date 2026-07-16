const Order = require("../models/order.model");
const Cart = require("../models/cart.model");


// Get Logged User Orders

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    })
      .populate("products.product")
      .populate("user", "name email");

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// Create Order
const createOrder = async (req, res) => {
  try {

    const {
      products,
      totalPrice
    } = req.body;


    const order = await Order.create({

      user: req.user.id,

      products,

      totalPrice,

    });
    await Cart.deleteMany({
      user: req.user.id
    });



    const populatedOrder = await Order.findById(order._id)
      .populate("products.product");


    res.status(201).json({

      message: "Order Placed Successfully",

      order: populatedOrder,

    });


  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }
};




// Update Order Status

const updateOrder = async (req, res) => {

  try {


    const order = await Order.findOneAndUpdate(

      {
        _id: req.params.id,
        user: req.user.id,
      },

      req.body,

      {
        new: true,
      }

    );


    if (!order) {

      return res.status(404).json({

        message: "Order Not Found",

      });

    }


    res.status(200).json({

      message: "Order Updated",

      order,

    });


  } catch(error){

    res.status(500).json({

      message:error.message,

    });

  }

};





// Delete Order

const deleteOrder = async (req,res)=>{

  try{


    const order = await Order.findOneAndDelete({

      _id:req.params.id,

      user:req.user.id,

    });



    if(!order){

      return res.status(404).json({

        message:"Order Not Found",

      });

    }



    res.status(200).json({

      message:"Order Deleted Successfully",

    });



  }catch(error){

    res.status(500).json({

      message:error.message,

    });

  }

};



module.exports = {

  getOrders,

  createOrder,

  updateOrder,

  deleteOrder,

};