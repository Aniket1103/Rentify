import { sendToken } from "../utils/sendToken.js";
import { User } from "../models/user.js";

export const register = async (req, res) => {
  try{
    // console.log(req.body);
    // return res.json(req.body);
    const { name, email, phone, password, role } = req.body;
    // const { avatar } = req.files;

    let user = await User.findOne({email});

    if(user){
      return res
        .status(400)
        .json({success : false, message : "User already exists"});
    }

    user = await User.create({
      name,
      email,
      phone,
      password,
      role
    })

    sendToken(
      res,
      user,
      201,
      "User LoggedIn successfully"
    );

  }
  catch(error) {
    console.log(error);
    res.send(error);
  }
}

export const currentUser = async (req, res) => {
  try {
    console.log("req.user", req.user);
    return res.json(req.user);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }

    const user = await User.findOne({ email }).select("+password");
    console.log(user);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    sendToken(res, user, 200, "Login Successful");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Develpoment" ? false : true,
      })
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};