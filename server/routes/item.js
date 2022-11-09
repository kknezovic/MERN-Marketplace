import express from "express";
import {
  create,
  allItems,
  image,
  sellerItems,
  remove,
  read,
  update,
  userPurchasedItems,
  alreadySoldItem,
  searchItems,
  searchElectronicItems,
  searchFurnitureItems,
  searchJewelryItems,
  searchClothesAndShoesItems,
} from "../controllers/item";
import { requireSignin, itemOwner } from "../middlewares";
import formidable from "express-formidable";

const router = express.Router();

router.post("/create-item", requireSignin, formidable(), create);
router.get("/all-items", allItems);
router.get("/item/image/:itemId", image);
router.get("/seller-items", requireSignin, sellerItems);
router.delete("/delete-item/:itemId", requireSignin, itemOwner, remove);
router.get("/item/:itemId", read);
router.put("/update-item/:itemId", requireSignin, formidable(), update);
router.get("/user-purchased-items", requireSignin, userPurchasedItems);
router.get("/already-sold-item/:itemId", alreadySoldItem);
router.post("/search-items", searchItems);
router.get("/electronics", searchElectronicItems);
router.get("/furniture", searchFurnitureItems);
router.get("/clothes-and-shoes", searchClothesAndShoesItems);
router.get("/jewelry", searchJewelryItems);

module.exports = router;
