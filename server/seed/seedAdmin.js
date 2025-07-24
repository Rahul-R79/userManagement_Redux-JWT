import User from "../model/User.js";

export const seedAdmin = async () => {
    try{
        const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });

        if (existingAdmin) {
            console.log("Admin already exists");
            return;
        }

        const Admin = new User({
            userName: process.env.ADMIN_USERNAME,
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD, 
            role: "admin",
        });

        await Admin.save();
        console.log("Admin created successfully:");
    }catch(err) {
        console.error("Error at creating admin:", err.message);
    }
};
