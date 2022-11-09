import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import{getClothesAndShoesItems} from "../actions/items"
import SmallCard from "../components/SmallCard";

const ClothesAndShoesPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getClothesAndShoesItems().then((res) => {
      console.log(res.data);

      const reversed= res.data.reverse()
      setItems(reversed);
    });
  }, []);

  return (
    <>
      <div
        className="container-fluid p-5 text-center"
        style={{ background: "linear-gradient( 0deg,#031c0c, #57705E)" }}
      >
        <h1 style={{ color: "white" }}>Clothes and shoes</h1>
      </div>
      <div className="col">
        <br />
        <SearchBar />
      </div>
      {items.map((it) => (
          <SmallCard key={it._id} it={it} />
        ))}
    </>
  );
};
export default ClothesAndShoesPage;
