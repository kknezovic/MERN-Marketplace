import { useState } from "react";
import { Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const SearchBar = () => {
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/search-result?category=${category}&condition=${condition}`);
  };

  return (
    <div className="d-flex-s pb-4 mx-5">
      <Select
        onChange={(value) => setCategory(value)}
        className="w-100"
        size="large"
        placeholder="Choose category..."
      >
        <Option key="Clothes and shoes">Clothes and shoes</Option>
        <Option key="Electronics">Electronics</Option>
        <Option key="Furniture">Furniture</Option>
        <Option key="Jewelry">Jewelry</Option>
      </Select>
      <Select
        onChange={(value) => setCondition(value)}
        className="w-100"
        size="large"
        placeholder="Choose condition..."
      >
        <Option key="New">New</Option>
        <Option key="Used-average">Used-average</Option>
        <Option key="Used-good">Used-good</Option>
        <Option key="Used-like-new">Used-like new</Option>
      </Select>

      <SearchOutlined
        onClick={handleSubmit}
        className="btn p-3 btn-square"
        style={{
          backgroundColor: "#e24a18",
          borderRadius: "30px",
          marginLeft: "4px",
        }}
      />
    </div>
  );
};

export default SearchBar;
