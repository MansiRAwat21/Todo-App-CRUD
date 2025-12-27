const User = require("../model/user.model");
const { createJwt } = require("../utils/token");
const bcrypt = require("bcrypt");
const session = require("express-session");

const create = async (req, res) => {
    try {
        const { email, password, ...rest } = req.body;
        console.log(email,'this is muy email')
        // console.log(...rest, '...rest')
        const existingUser = await User.findOne({ email })
        console.log(existingUser, 'existingUser')
        if (existingUser) {
            return res.status(400).json({ message: "This email is already registered. Please login instead." })
        }

        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // instanceof
        // const user = await User.create(req.body);

        // this 
        const user = await User.create({
            ...rest,
            email,
            password: hashedPassword,

        })
        console.log(user,'this is my user')
        const userResponse = { ...user.toObject() };
        console.log(userResponse,'userResponse')
        delete userResponse.password; // response me password nhi aayega more secure
        return res.status(201).json(userResponse);
        // return res.status(201).json(user);
    } catch (error) {
        console.log("This is create error", error);
        return res.status(500).json(error);
    }
};

const getAll = async (req, res) => {
    try {
        console.log(req.user, "user");
        const getUser = await User.find({ isActive: true });
        // const userData = getUser.filter((i)=> i.isActive == true)
        return res.status(200).json(getUser);
    } catch (error) {
        console.log("user not found", error);
        return res.status(500).json(error);
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const getByIdUser = await User.findById(id);
        return res.status(200).json(getByIdUser);
    } catch (error) {
        console.log("user not found", error);
        return res.status(404).json(error);
    }
};
const updateById = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const updateByIdUser = await User.findByIdAndUpdate(id, { name, email });
        return res.status(200).json(updateByIdUser);
    } catch (error) {
        console.log("user not found", error);
        return res.status(404).json(error);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const varifingPassword = await bcrypt.compare(password, user.password);
        if (!varifingPassword) {
            return res.status(401).json({ message: "Password incorrect" });
        }

        //  if(email == 'mansi@gmail.com' && password == '12345'){
        // const token = createJwt(req.body)
        const token = createJwt({
            id: user._id,
            email: user.email,
        });

        // console.log(token, 'token')
        // return res.status(200).json(token)
        res.cookie("token", token, {
            httpOnly: true, // JS cannot access → secure
            secure: false, // dev: false, production: true (HTTPS)
            sameSite: "lax", // CSRF mitigation
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        // }
        // return res.status(404).json({message:"not authorized"})
        return res.status(200).json({ message: "Logged in" });
    } catch (error) {
        console.log("user not found", error);
        return res.status(404).json(error);
    }
};

// soft delete
const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        const userDeleteById = await User.findByIdAndUpdate(id, {
            isActive: false,
        });
        return res.status(200).json(userDeleteById);
    } catch (error) {
        console.log("error while deleting user", error);
        return res.status(500).json(error);
    }
};

module.exports = { create, getAll, getById, deleteById, updateById, login };
