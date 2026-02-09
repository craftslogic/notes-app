import jwt from "jsonwebtoken";
import { User } from "../models/user-model.js";
import sendEmail from "../Utilities/email.js";
import bcrypt from "bcrypt";

console.log(bcrypt)


export const createAccount = async (req, res) => {
    // index.js se create-account wali poori logic yahan copy-paste kar dein
    console.log("post method callled")
    try {

        const { username, email, password } = req.body;


        if (!username) {

            return res.status(400).json({ error: true, message: "Full name is required!" })
        }


        if (!email) {
            return res.status(400).json({ error: true, message: "user email is required!" })
        }

        if (!password) {
            return res.status(400).json({ error: true, message: "user password is required!" })
        }

        const isUser = await User.findOne({ email: email });

        if (isUser) {
            return res.status(400).json({ error: true, message: "User already exists with this email!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Password ko hash karein

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        const accessToken = jwt.sign(
            { user: newUser },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '3600m' }
        );

        return res.status(201).json({
            error: false,
            newUser,
            accessToken,
            message: "Registration Successful Bhaai!"
        });
    } catch (error) {

        return res.status(500).json({ error: true, message: "Internal Server Erroreee" });
    }

};



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ error: true, message: "user email is required!" })
        }

        if (!password) {
            return res.status(400).json({ error: true, message: "user password is required!" })
        }

        const userInfo = await User.findOne({ email: email });
        console.log(userInfo)
        

        if (!userInfo) {
            return res.status(401).json({ error: true, message: "User not found!" });
        }
        // 2. Bcrypt use karke password compare karrhy
        const isPasswordValid = await bcrypt.compare(password, userInfo.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: true, message: "Invalid email or password!" });
        }



        const user = { user: userInfo };
        const accessToken = jwt.sign(
            user,
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '3600m' }
        );

        return res.status(200).json({
            error: false,
            email: userInfo.email,
            name: userInfo.username,
            accessToken,
            message: "Login Successful!"
        });

    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};


export const forgetPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: true, message: "Email is required" });
    }

    // Checking user exist karta hai ya nahi
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ error: true, message: "User not found with this email" });
    }

    // 6-digit random OTP generation
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Database mein save karrha (10 minutes validity ke liye)
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password Reset OTP - Notes App',
            message: `Vro ! Your OTP for password reset is: ${otp}. This OTP will expire in 10 minutes!! \n Come on hurry up!`
        });

        return res.json({ error: false, message: "OTP sent to your email! Please check your inbox." });
    } catch (err) {
        // Agar email fail ho jaye toh database se OTP saaf kar dein
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();
        return res.status(500).json({ error: true, message: "Error sending email. Please try again later." });
    }
};


export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        console.log(otp)
    
        if (!email || !otp || !newPassword) {
            return res.status(400).json({ error: true, message: "All fields are required" });
        }
    
        // User dhondain aur OTP match karein
        const user = await User.findOne({ 
            email, 
            otp, 
            otpExpires: { $gt: Date.now() } // Checking ke OTP expire na hua ho
        });
    
        if (!user) {
            return res.status(400).json({ error: true, message: "Invalid OTP or OTP has expired" });
        }
    
        // Password update 
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword; 
        user.otp = undefined; // OTP saaf kardengy
        user.otpExpires = undefined;
        await user.save();
    
        return res.json({ error: false, message: "Password reset successful! You can now login with your new password." });
    }
     catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error while resetting password!" });
    }
};


export const getUserDetails = async (req, res) => {
     console.log("this is get user bro !")
    // try {
    //     const { user } = req.user;

    //     if (!user) {
    //         return res.status(404).json({ error: true, message: "User not found!" });
    //     }

    //     return res.status(200).json({
    //         error: false,
    //         user,
    //         message: "User fetched successfully!"
    //     });

    // } catch (error) {
    //     return res.status(500).json({ error: true, message: "Internal Server Error while fetching user!" });
    // }

    
    try {
        const { user } = req.user; // Token se ID nikalne ke liye

        // VIP Fix: DB se fresh data fetch karein
        const isUser = await User.findOne({ _id: user._id });

        if (!isUser) {
            return res.status(404).json({ error: true, message: "User not found!" });
        }

        return res.status(200).json({
            error: false,
            // Fresh data bhejein baghair password ke
            user: { 
                username: isUser.username, 
                email: isUser.email, 
                _id: isUser._id,
                createdOn: isUser.createdAt 
            },
            message: "User fetched successfully!"
        });

    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}



export const updateProfile = async (req, res) => {

    const { user } = req.user // Auth middleware se aayega
    const { fullName, password } = req.body;

    const userId = user._id;

    console.log(userId)

    if (!fullName && !password) {
        return res.status(400).json({ error: true, message: "At least one field (fullName or password) is required to update!" });
    }

    try {
       
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: true, message: "User not found" });
        }

        // Naam update karein
        if (fullName) user.username = fullName;

        // Agar password bheja hai toh usay hash karke update karein
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();

        // Password hata kar baki info bhejein taake frontend storage update ho sake
        return res.json({
            error: false,
            user: { username: user.username, email: user.email, _id: user._id },
            message: "Profile updated successfully",
        });

    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};

