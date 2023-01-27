import { currencyFormatterItem } from "../actions/auth";

const SmallCardPurchased = ({ item, session, orderedBy }) => {
  return (
    <>
      <div
        className="Card mb-3"
        style={{
          boxShadow: "5px 5px 5px 5px rgba(60, 60, 93, 0.33)",
          borderRadius: "15px",
        }}
      >
        <div className="row no-gutters">
          <div className="col-md-4">
            {item.image && item.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/item/image/${item._id}`}
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
                {item.title}{" "}
                <span
                  className="float-right"
                  style={{ color: "#009E4F", fontWeight: "bold" }}
                >
                  {currencyFormatterItem({
                    amount: item.price,
                    currency: "eur",
                  })}
                </span>
              </h3>
              <br />
              <p
                className="alert"
                style={{ backgroundColor: "#EDE9D0", borderRadius: "30px" }}
              >
                {item.category}
              </p>
              <p
                className="alert"
                style={{ backgroundColor: "#EDE9D0", borderRadius: "30px" }}
              >
                {item.condition}
              </p>
              <br />
              <p
                style={{
                  color: "#009E4F",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Payment intent: {session.payment_intent}
              </p>
              <p
                style={{
                  color: "#009E4F",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Payment status: {session.payment_status.toUpperCase()}
              </p>
              <p
                style={{
                  color: "#009E4F",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Payment total: {session.amount_total / 100}{" "}
                {session.currency.toUpperCase()}
              </p>
              <p
                style={{
                  color: "#009E4F",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Customer: {orderedBy.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SmallCardPurchased;
