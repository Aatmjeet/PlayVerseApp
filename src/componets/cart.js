export default function Cart(props) {
  const { cartItems, handleRemove, cartValue } = props;

  return (
    <div>
      {cartItems.map((obj) => {
        return (
          <div
            style={{
              textAlign: "center",
              marginTop: 40,
            }}
          >
            <div>
              <img
                src={obj.images[0]}
                style={{
                  display: "inline-block",
                  maxHeight: 250,
                  maxWidth: 250,
                  borderRadius: 8,
                }}
                alt={obj.title}
              />
              <div
                style={{
                  paddingLeft: 10,
                  display: "inline-block",
                  textAlign: "center",
                }}
              >
                <div>{obj.title}</div>
                <div>Price: ${obj.price}</div>
                <div>Rating: {obj.rating}</div>

                <div
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    display: "inline-block",
                    padding: 5,
                    borderRadius: 5,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    obj.selected = false;
                    handleRemove(obj);
                  }}
                >
                  Remove
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div style={{ textAlign: "center" }}>
        <div style={{ paddingTop: 10 }}>Total Cart Value: ${cartValue}</div>
        <div
          style={{
            marginTop: 10,
            padding: 10,
            backgroundColor: "red",
            borderRadius: 5,
            display: "inline-block",
            color: "white",
            cursor: "pointer",
          }}
        >
          Checkout
        </div>
      </div>
    </div>
  );
}
