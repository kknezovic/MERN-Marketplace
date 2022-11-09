import Item from "../models/item";
import Order from "../models/order";
import fs from "fs";

export const create = async (req, res) => {
  //console.log("req.fields",req.fields)
  //console.log("req.files",req.files)
  try {
    let fields = req.fields;
    let files = req.files;

    //spremila sve podatke osim slike
    let item = new Item(fields);
    //spremi podatke u postedBy
    item.postedBy = req.auth._id;
    //spremit jos i podatke slike ako je ima
    if (files.image) {
      item.image.data = fs.readFileSync(files.image.path);
      item.image.contentType = files.image.type;
    }
    item.save((err, result) => {
      if (err) {
        console.log("Saving item err", err);
        res.status(400).send("Error saving");
      }
      res.json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

export const allItems = async (req, res) => {
  let all = await Item.find({})
    .limit(24)
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  //console.log(all)
  res.json(all);
};

export const image = async (req, res) => {
  let item = await Item.findById(req.params.itemId).exec();
  if (item && item.image && item.image.data !== null) {
    res.set("Content-Type", item.image.contentType);
    return res.send(item.image.data);
  }
};

export const sellerItems = async (req, res) => {
  let all = await Item.find({ postedBy: req.auth._id })
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();

  res.send(all);
};

export const remove = async (req, res) => {
  let removed = await Item.findByIdAndDelete(req.params.itemId)
    .select("-image.data")
    .exec();
  res.json(removed);
};

export const read = async (req, res) => {
  let item = await Item.findById(req.params.itemId)
    .populate("postedBy", "_id name")
    .select("-image.data")
    .exec();
  console.log("Single item", item);
  res.json(item);
};

export const update = async (req, res) => {
  //console.log("req.fields",req.fields)
  //console.log("req.files",req.files)
  try {
    let fields = req.fields;
    let files = req.files;

    let data = { ...fields };

    if (files.image) {
      let image = {};
      image.data = fs.readFileSync(files.image.path);
      image.contentType = files.image.type;

      data.image = image;
    }
    let updated = await Item.findByIdAndUpdate(req.params.itemId, data, {
      new: true,
    }).select("-image.data");

    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

export const userPurchasedItems = async (req, res) => {
  const all = await Order.find({ orderedBy: req.auth._id })
    .select("session")
    .populate("item", "-image.data")
    .populate("orderedBy", "_id name")
    .exec();

  res.json(all);
};

export const alreadySoldItem = async (req, res) => {
  const { itemId } = req.params;

  let soldItem = await Order.find({ item: itemId }).select("item").exec();
  res.json(soldItem);
};

export const searchItems = async (req, res) => {
  const { category, condition } = req.body;

  //console.log(category,condition)

  let result = await Item.find({ category: category, condition: condition })
    .select("-image.data")
    .exec();

  res.json(result);
};

export const searchElectronicItems = async (req, res) => {
  let all = await Item.find({
    category: {
      $regex: /Electronics/,
    },
  })
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();

  res.send(all);
};

export const searchFurnitureItems = async (req, res) => {
  let all = await Item.find({
    category: {
      $regex: /Furniture/,
    },
  })
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();

  res.send(all);
};

export const searchJewelryItems = async (req, res) => {
  let all = await Item.find({
    category: {
      $regex: /Jewelry/,
    },
  })
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();

  res.send(all);
};

export const searchClothesAndShoesItems = async (req, res) => {
  let all = await Item.find({
    category: {
      $regex: /Clothes and shoes/,
    },
  })
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();

  res.send(all);
};