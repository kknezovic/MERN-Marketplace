import axios from "axios";

export const register = async (user) =>
  await axios.post(`${process.env.REACT_APP_API}/register`, user);

export const login = async (user) =>
  await axios.post(`${process.env.REACT_APP_API}/login`, user);

//update user-a u local storage-u
export const updateUserInLocalStorage = async (user) => {
  if (window.localStorage.getItem("auth")) {       //ako je u storage-u onda update
    let auth = JSON.parse(localStorage.getItem("auth"));
    auth.user = user;
    localStorage.setItem("auth", JSON.stringify(auth)); //spremi nove podatke
  }
};

export const currencyFormatter=data=>{
  return (data.amount/100).toLocaleString(data.currency,{
    style: "currency",
    currency: data.currency,
  })
}

export const currencyFormatterItem=data=>{
  return data.amount.toLocaleString(data.currency,{
    style: "currency",
    currency: data.currency,
  })
}