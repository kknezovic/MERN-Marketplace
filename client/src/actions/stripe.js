import axios from "axios";

export const createConnectAccount = async (token) =>
  await axios.post(
    `${process.env.REACT_APP_API}/create-connect-account`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getAccountStatus = async (token) =>
  axios.post(
    `${process.env.REACT_APP_API}/get-account-status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getAccountBalance = async (token) =>
  axios.post(
    `${process.env.REACT_APP_API}/get-account-balance`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getSessionId = async (token, itemId) =>
  axios.post(
    `${process.env.REACT_APP_API}/stripe-session-id`,
    { itemId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const stripeSuccessRequest = async (token, itemId) =>
  axios.post(
    `${process.env.REACT_APP_API}/stripe-success`,
    { itemId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
