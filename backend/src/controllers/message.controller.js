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

       const messages = await Message.find({
        $or: [
          { sender: senderId, receiver: userToChatId },
          { sender: userToChatId, receiver: senderId }
        ]
       })

       res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }

};

export const sendMessage = async(req, res)=>{
  try {
    const  {text, image} = req.body;
    const { id: receiverId} = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      //Upload image to cloudinary 
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = await Message.create({
      text,
      image: imageUrl,
      sender: senderId,
      receiver: receiverId
    });

    await newMessage.save();
    
    // todo: realtime functionality goes here => socket.io

    res.status(201).json(newMessage);
    
  } catch (error) {
    console.log("Error in sendMessage: ", error.message);
    res.status(500).json({error: "Internal server error"});
  }
};



