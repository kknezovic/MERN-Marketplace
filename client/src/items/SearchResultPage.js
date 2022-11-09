import { useState, useEffect } from "react";
import queryString from "query-string";
import SearchBar from "../components/SearchBar";
import { searchListedItems } from "../actions/items";
import SmallCard from "../components/SmallCard";
import { useLocation } from "react-router-dom";

const SearchResultPage = () => {
  const [items, setItems] = useState([]);
  const [empty, setEmpty] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setEmpty(false);
    //console.log(location);
    const { category, condition } = queryString.parse(window.location.search);
    //console.table({category,condition})
    searchListedItems({ category, condition }).then((res) => {
      console.log(res.data);

      const reversed= res.data.reverse()
      setItems(reversed);
      if (res.data.length === 0) setEmpty(true);
    });
  }, [location.search]);

  return (
    <>
    <div
        className="container-fluid p-5 text-center"
        style={{ background: "linear-gradient( 0deg,#031c0c, #57705E)" }}
      >
        <h1 style={{ color: "white" }}>Search result</h1>
      </div>
      <div className="col">
        <br />
        <SearchBar />
      </div>
      {empty ? <h2 style={{paddingLeft:"20px"}}>No items found :(</h2> : <br />}
      <div className="container-fluid" style={{ flex: "1" }}>
          {items.map((it) => (
            <SmallCard key={it._id} it={it} />
          ))}
      </div>
      <br></br>
    </>
  );
};

export default SearchResultPage;
