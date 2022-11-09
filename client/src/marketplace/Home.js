import { allItems } from "../actions/items";
import { useState, useEffect } from "react";
import SmallCard from "../components/SmallCard";
import SearchBar from "../components/SearchBar";
import JewelryImage from "../marketplace/jewelry.PNG";
import ClothesImage from "../marketplace/clothes-and-shoes.PNG";
import FurnitureImage from "../marketplace/furniture.PNG";
import ElectronicsImage from "../marketplace/electronics.PNG";
import { Link } from "react-router-dom";

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadAllItems();
  }, []);

  const loadAllItems = async () => {
    let res = await allItems();

    const reversed = res.data.reverse();
    setItems(reversed);
  };

  return (
    <>
      <div
        className="container-fluid p-5 text-center"
        style={{ background: "linear-gradient( 0deg,#031c0c, #57705E)" }}
      >
        <h1 style={{ color: "white" }}>Home page</h1>
      </div>
      <div
        className="categories"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          margin: "40px",
          alignItems: "baseline"
        }}
      >
        <div >
          <Link to="/clothes-and-shoes" className="categories-link">
          <img
            src={ClothesImage}
            alt="Clothes Image"
            style={{ maxWidth: "150px" }}
            className="clothesImage"
          />
          Clothes and shoes
          </Link>
        </div>
        <div >
        <Link to="/electronics" className="categories-link">
          <img
            src={ElectronicsImage}
            alt="Electronics Image"
            style={{ maxWidth: "120px" }}
            className="electronicsImage"
          />
          Electronics
          </Link>
        </div>
        <div >
        <Link to="/furniture" className="categories-link">
          <img
            src={FurnitureImage}
            alt="Furniture Image"
            style={{ maxWidth: "160px" }}
            className="furnitureImage"
          />
          Furniture
          </Link>
        </div>
        <div>
        <Link to="/jewelry" className="categories-link">
          <img
            src={JewelryImage}
            alt="Jewelry Image"
            style={{ maxWidth: "130px" }}
            className="jewelryImage"
          />
          Jewelry
          </Link>
        </div>
      </div>
      <div className="col">
        <br />
        <SearchBar />
      </div>
      <div className="container-fluid" style={{ flex: "1" }}>
        <br />
        {items.map((it) => (
          <SmallCard key={it._id} it={it} />
        ))}
      </div>
      <br></br>
    </>
  );
};

export default Home;
