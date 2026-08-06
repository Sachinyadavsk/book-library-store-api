import Order from '../models/Order.js';

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const createOrder = async (req, res) => {
    try {
        const {
            items,
            discount = 0,
            tax = 0,
            shippingCharge = 0,
            paymentMethod,
            shippingAddress
        } = req.body;

        const subtotal = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const totalAmount =
            subtotal - discount + tax + shippingCharge;

        const order = await Order.create({
            user: req.user._id,
            items,
            subtotal,
            discount,
            tax,
            shippingCharge,
            totalAmount,
            paymentMethod,
            shippingAddress
        });

        res.status(201).json({
            success: true,
            data: order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order: updatedOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const cancelOrder = async (req, res) => {
    try {
        const canceledOrder = await Order.findByIdAndUpdate(req.params.id, { status: 'canceled' }, { new: true });
        if (!canceledOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Order canceled successfully",
            order: canceledOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Order deleted successfully",
            order: deletedOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const userOrders = await Order.find({ userId: req.params.userId });
        res.status(200).json({
            success: true,
            orders: userOrders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const generateInvoice = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        // Generate invoice logic here
        res.status(200).json({
            success: true,
            message: "Invoice generated successfully",
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
