import { currencyFormatterItem } from "../actions/auth";
import { useNavigate, Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SmallCard = ({
  it,
  handleItemDelete = (f) => f,
  owner = false,
  showViewMoreButton = true,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="card mb-5" style={{marginLeft:"20px", marginRight:"20px"}}>
        <div className="row no-gutters">
          <div className="col-md-4">
            {it.image && it.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/item/image/${it._id}`}
                alt="deafult item img"
                className="card-image img img-fluid"
              />
            ) : (
              <img
                src="https://via.placeholder.com/800x400.png?text=Item+image"
                alt="deafult item img"
                className="card-image img img-fluid"
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                {it.title}{" "}
                <span
                  className="float-right px-2"
                  style={{ color: "#009E4F", fontWeight: "bold" }}
                >
                  {currencyFormatterItem({
                    amount: it.price,
                    currency: "hrk",
                  })}
                </span>
              </h3>
              <p
                className="alert"
                style={{ backgroundColor: "#EDE9D0", borderRadius: "30px" }}
              >
                Category: {it.category}
              </p>
              <p
                className="alert"
                style={{ backgroundColor: "#EDE9D0", borderRadius: "30px" }}
              >
                Condition: {it.condition}
              </p>
              <p
                className="card-text"
                style={{ fontWeight: "400", fontSize: "16px" }}
              >{`${it.content.substring(1, 200)}...`}</p>

              <div className="d-flex justify-content-between h4 show-more">
                {showViewMoreButton && (
                  <button
                    onClick={() => navigate(`/item/${it._id}`)}
                    className="btn"
                    style={{ backgroundColor: "#e24a18", color: "white" }}
                  >
                    Show more
                  </button>
                )}
                {owner && (
                  <>
                    <Link to={`/item/edit/${it._id}`}>
                      <EditOutlined className="text-warning" />
                    </Link>
                    <DeleteOutlined
                      onClick={() => handleItemDelete(it._id)}
                      className="text-danger"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SmallCard;
