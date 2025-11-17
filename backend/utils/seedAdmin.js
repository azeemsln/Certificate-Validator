import Admin from '../models/Admin.js'; 
import bcrypt from "bcryptjs"; // 👈 Now this import will be utilized!

const seedDefaultAdmin = async () => {
    try {
        // --- Define Default Credentials ---
        const defaultName = process.env.DEFAULT_ADMIN_NAME || 'Super Admin';
        const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@ten.com';
        const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'admin123'; 
        
        // 1. Check if an admin with the default email already exists
        const adminExists = await Admin.findOne({ email: defaultEmail });

        if (adminExists) {
            // console.log('✅ Default admin already exists. Skipping creation.');
            return;
        }

        // --- HASH THE PASSWORD DIRECTLY BEFORE CREATION (The Critical Fix) ---
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(defaultPassword, salt);
        // -------------------------------------------------------------------

        // 2. Create the default admin using the HASHED password
        await Admin.create({
            name: defaultName,
            email: defaultEmail,
            password: hashedPassword, // 👈 Use the pre-hashed password
        });

        // NOTE: We only log the plain password for debugging/reference purposes.
        // console.log(`✨ Default admin created: ${defaultEmail} (Password: ${defaultPassword})`);

    } catch (error) {
        // If the hashing fails or database creation fails
        // console.error('❌ Error seeding default admin:', error.message);
    }
};

export default seedDefaultAdmin;