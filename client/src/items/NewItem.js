import { useState } from "react";
import { toast } from "react-toastify";
import { createItem } from "../actions/items";
import { useSelector } from "react-redux";
import ItemCreateForm from "../components/ItemCreateForm";

const NewItem = () => {
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100"
  );
  const { auth } = useSelector((state) => ({ ...state }));

  const [values, setValues] = useState({
    image: "",
    title: "",
    content: "",
    category: "",
    condition: "",
    price: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let itemData = new FormData();
    values.image && itemData.append("image", values.image);
    itemData.append("title", values.title);
    itemData.append("content", values.content);
    itemData.append("category", values.category);
    itemData.append("condition", values.condition);
    itemData.append("price", values.price);

    console.log(...itemData);

    let res = await createItem(auth.token, itemData);
    console.log("Dodan artikal", res);
    toast.success("New item added");

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleImageUpload = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
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
        <h2 style={{ color: "white" }}>Add new item</h2>
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
            <ItemCreateForm
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

export default NewItem;
