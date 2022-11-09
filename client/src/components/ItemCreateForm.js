import { Select } from "antd";

const { Option } = Select;

const ItemCreateForm = (props) => {
  const { values, setValues, handleChange, handleImageUpload, handleSubmit } =
    props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label
          className="btn btn-block m-2 text-left"
          style={{
            borderRadius: "30px",
            backgroundColor: "#b4d9ad",
            color: "#212529",
          }}
        >
          +Add Image
          <input
            type="file"
            name="image"
            onChange={handleImageUpload}
            accept="image/*"
            hidden
          />
        </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={values.title}
          style={{ backgroundColor: "#b4d9ad", border: "none" }}
        />
        <textarea
          name="content"
          onChange={handleChange}
          placeholder="Content"
          className="form-control m-2"
          value={values.content}
          style={{ backgroundColor: "#b4d9ad", border: "none" }}
        />
        <Select
          onChange={(value) => setValues({ ...values, category: value })}
          className="w-100 m-2"
          size="large"
          placeholder="Choose category..."
        >
          <Option key="Clothes and shoes">Clothes and shoes</Option>
          <Option key="Electronics">Electronics</Option>
          <Option key="Furniture">Furniture</Option>
          <Option key="Jewelry">Jewelry</Option>
        </Select>
        <Select
          onChange={(value) => setValues({ ...values, condition: value })}
          className="w-100 m-2"
          size="large"
          placeholder="Choose condition..."
        >
          <Option key="New">New</Option>
          <Option key="Used-average">Used-average</Option>
          <Option key="Used-good">Used-good</Option>
          <Option key="Used-like-new">Used-like new</Option>
        </Select>
        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="form-control m-2"
          value={values.price}
          style={{ backgroundColor: "#b4d9ad", border: "none" }}
        />
      </div>
      <button
        disabled={
          !values.image ||
          !values.title ||
          !values.content ||
          !values.category ||
          !values.condition ||
          !values.price
        }
        className="btn m-2"
        style={{ backgroundColor: "#e24a18", color: "white", border: "none" }}
      >
        Save
      </button>
    </form>
  );
};

export default ItemCreateForm;
