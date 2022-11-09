import axios from "axios";

export const createItem = async (token, data) =>
  await axios.post(`${process.env.REACT_APP_API}/create-item`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const allItems = async () =>
  await axios.get(`${process.env.REACT_APP_API}/all-items`);

export const sellerItems = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/seller-items`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteItem = async (token, itemId) =>
  await axios.delete(`${process.env.REACT_APP_API}/delete-item/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const read = async (itemId) =>
  await axios.get(`${process.env.REACT_APP_API}/item/${itemId}`);

export const updatItem = async (token, data, itemId) =>
  await axios.put(`${process.env.REACT_APP_API}/update-item/${itemId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const userPurchasedItems = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/user-purchased-items`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const soldItem = async (itemId) =>
  await axios.get(`${process.env.REACT_APP_API}/already-sold-item/${itemId}`);

export const searchListedItems = async (query) =>
  await axios.post(`${process.env.REACT_APP_API}/search-items`, query);

export const getElectronicItems = async () =>
  await axios.get(`${process.env.REACT_APP_API}/electronics`);

export const getFurnitureItems = async () =>
  await axios.get(`${process.env.REACT_APP_API}/furniture`);

export const getClothesAndShoesItems = async () =>
  await axios.get(`${process.env.REACT_APP_API}/clothes-and-shoes`);

export const getJewelrytems = async () =>
  await axios.get(`${process.env.REACT_APP_API}/jewelry`);
