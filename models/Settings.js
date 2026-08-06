import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
    {
        websiteName: {
            type: String,
            default: "Book Library Store",
        },
        websiteLogo: {
            type: String,
            default: "",
        },
        contactEmail: {
            type: String,
            default: "",
        },
        contactPhone: {
            type: String,
            default: "",
        },
        currency: {
            type: String,
            default: "INR",
        },
        taxRate: {
            type: Number,
            default: 0,
        },
        shippingCharge: {
            type: Number,
            default: 0,
        },
        paymentGateway: {
            provider: String,
            apiKey: String,
            secretKey: String,
            enabled: {
                type: Boolean,
                default: false,
            },
        },
        emailSettings: {
            smtpHost: String,
            smtpPort: Number,
            smtpUser: String,
            smtpPassword: String,
            fromEmail: String,
            fromName: String,
        },
        maintenanceMode: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;