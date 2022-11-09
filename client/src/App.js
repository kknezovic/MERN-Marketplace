import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopNav from "./components/TopNav";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";

import Home from "./marketplace/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import MyProfile from "./user/MyProfile";
import ListedItems from "./user/ListedItems";
import NewItem from "./items/NewItem";
import AccountBalance from "./user/AccountBalance";
import StripeCallback from "./stripe/StripeCallback";
import UpdateItem from "./items/UpdateItem";
import ViewItem from "./items/ViewItem";
import StripeSuccess from "./stripe/StripeSuccess";
import StripeCancel from "./stripe/StripeCancel";
import SearchResultPage from "./items/SearchResultPage";
import ElectronicsPage from "./categoryPages/ElectronicsPage";
import JewelryPage from "./categoryPages/JewelryPage";
import FurniturePage from "./categoryPages/FurniturePage";
import ClothesAndShoesPage from "./categoryPages/ClothesAndShoesPage";

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <ToastContainer position="top-center" />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/item/:itemId" element={<ViewItem />} />
        <Route exact path="/search-result" element={<SearchResultPage />} />
        <Route exact path="/electronics" element={<ElectronicsPage />} />
        <Route exact path="/furniture" element={<FurniturePage />} />
        <Route exact path="/jewelry" element={<JewelryPage />} />
        <Route
          exact
          path="/clothes-and-shoes"
          element={<ClothesAndShoesPage />}
        />
        <Route
          exact
          path="/myprofile"
          element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/myprofile/seller"
          element={
            <PrivateRoute>
              <ListedItems />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/items/new"
          element={
            <PrivateRoute>
              <NewItem />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/account_balance"
          element={
            <PrivateRoute>
              <AccountBalance />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/stripe/callback"
          element={
            <PrivateRoute>
              <StripeCallback />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/item/edit/:itemId"
          element={
            <PrivateRoute>
              <UpdateItem />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/stripe/success/:itemId"
          element={
            <PrivateRoute>
              <StripeSuccess />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/stripe/cancel"
          element={
            <PrivateRoute>
              <StripeCancel />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
