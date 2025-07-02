import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUsersForSidebar = async(req,res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({__id: {$ne: loggedInUserId}}).select("-password");

    res.status(200).json(filteredUsers)
  } catch (error) {
    console.log("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({error: "Internal sever error"});
  }

};

export const getMessages = async(req,res) => {
    try {
       const {id: userToChatId} = req.params
       const senderId = req.user.__id;

       const messages = await Message

    } catch (error) {
        
    }
};

