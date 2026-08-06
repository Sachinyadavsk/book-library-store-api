import Settings from '../models/Settings.js';

export const getSettings = async (req, res) => {
    try {
        const settings = await Settings.findOne();
        res.status(200).json({
            success: true,
            data: settings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateSettings = async (req, res) => {
    try {
        const { siteName, siteDescription, contactEmail } = req.body;
        const settings = await Settings.findOneAndUpdate({}, { siteName, siteDescription, contactEmail }, { new: true });
        res.status(200).json({
            success: true,
            data: settings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updatePaymentSettings = async (req, res) => {
    try {
        const { paymentGateway, apiKey, apiSecret } = req.body;
        const settings = await Settings.findOneAndUpdate({}, { paymentGateway, apiKey, apiSecret }, { new: true });
        res.status(200).json({
            success: true,
            data: settings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateEmailSettings = async (req, res) => {
    try {
        const { smtpHost, smtpPort, smtpUser, smtpPass } = req.body;
        const settings = await Settings.findOneAndUpdate({}, { smtpHost, smtpPort, smtpUser, smtpPass }, { new: true });
        res.status(200).json({
            success: true,
            data: settings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateWebsiteSettings = async (req, res) => {
    try {
        const { siteName, siteDescription, contactEmail } = req.body;
        const settings = await Settings.findOneAndUpdate({}, { siteName, siteDescription, contactEmail }, { new: true });
        res.status(200).json({
            success: true,
            data: settings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
