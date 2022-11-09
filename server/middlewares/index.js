import {expressjwt} from "express-jwt";
import Item from "../models/item"

//po default-u informacija ce nan bit dostupna u req.user(dobit cemo id usera)
export const requireSignin = expressjwt({
  //secret,expiryDate
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const itemOwner = async (req, res, next) => {
  let item = await Item.findById(req.params.itemId).exec();
  let owner = item.postedBy._id.toString() === req.auth._id.toString();
  if(!owner){
    return res.status(403).send("Unauthorized")
  }
  next();
};