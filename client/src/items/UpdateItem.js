import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { read, updatItem } from "../actions/items";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UpdateItemForm from "../components/UpdateItemForm";

const UpdateItem = () => {
  const params = useParams();
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=image"
  );
  const { auth } = useSelector((state) => ({ ...state }));

  const [values, setValues] = useState({
    title: "",
    content: "",
    category: "",
    condition: "",
    price: "",
  });

  const [image, setImage] = useState("");

  useEffect(() => {
    loadSellerItem();
  }, []);

  const loadSellerItem = async () => {
    let res = await read(params.itemId);
    //console.log(res);
    setValues({ ...values, ...res.data });
    setPreview(`${process.env.REACT_APP_API}/item/image/${res.data._id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let itemData = new FormData();
    image && itemData.append("image", image);
    itemData.append("title", values.title);
    itemData.append("content", values.content);
    itemData.append("category", values.category);
    itemData.append("condition", values.condition);
    itemData.append("price", values.price);

    let res = await updatItem(auth.token, itemData, params.itemId);
    console.log("Artikal ažuriran", res);
    toast.success("Item updated");

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleImageUpload = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        className="container-fluid p-5 text-center"
        style={{ background: "linear-gradient( 0deg,#031c0c, #57705E)" }}
      >
        <h2 style={{ color: "white" }}>Update item</h2>
      </div>
      <br />
      <div style={{ marginLeft: "20px" }}>
        <img
          src={preview}
          alt="preview_image"
          className="img img-fluid m-2 w-25"
        />
      </div>
      <div className="container-fluid">
        <div className="row" style={{ margin: "10px" }}>
          <div className="col-md-10">
            <br />
            <UpdateItemForm
              values={values}
              setValues={setValues}
              handleImageUpload={handleImageUpload}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
      <br />
    </>
  );
};
export default UpdateItem;
