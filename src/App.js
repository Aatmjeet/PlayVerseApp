import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Cart from "./componets/cart";

function App() {
  const productURl = "https://dummyjson.com/products";

  const [productJSON, setProductJson] = useState([]);

  const [showCart, setShowCart] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const [cartValue, setCartValue] = useState(0);

  useEffect(() => {
    axios.get(productURl).then((resp) => {
      const finalData = resp.data.products.map((obj) => {
        return {
          title: obj.title,
          images: obj.images,
          selected: false,
          price: obj.price,
          rating: obj.rating,
        };
      });
      setProductJson(finalData);
    });
  }, []);

  const handleCartView = useCallback(() => {
    setShowCart((show) => !show);
  }, [setShowCart]);

  const handleAddToCart = useCallback(
    (obj) => {
      setCartValue((CV) => CV + obj.price);
      setCartItems((items) => [...items, obj]);
    },
    [setCartValue, setCartItems]
  );

  const handleRemove = useCallback(
    (obj) => {
      setCartValue((CV) => CV - obj.price);
      setCartItems((items) => items.filter((it) => it.title !== obj.title));
    },
    [setCartValue, setCartItems]
  );

  return (
    <div
      style={{
        backgroundColor: "#fffff",
        width: "100%",
        height: "100%",
        color: "gray",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 100,
          backgroundColor: "gray",
          textAlign: "right",
        }}
      >
        <div
          style={{
            color: "white",
            backgroundColor: "black",
            borderRadius: 6,
            maxWidth: 100,
            padding: 10,
            display: "inline-block",
            cursor: "pointer",
            marginTop: 30,
            marginRight: 20,
          }}
          onClick={handleCartView}
        >
          Cart Items {cartItems.length}
        </div>
      </div>
      {showCart && (
        <div
          style={{
            position: "fixed",
            width: "100%",
            zIndex: 10,
            backgroundColor: "black",
            textAlign: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              justifyContent: "space-around",
              marginTop: 20,
            }}
          >
            <div
              style={{
                fontSize: 40,
                color: "white",
                fontWeight: 60,
                marginBottom: 20,
              }}
            >
              Cart
            </div>
            <div
              style={{
                alignItems: "right",
                color: "white",
                fontSize: 40,
                cursor: "pointer",
              }}
              onClick={handleCartView}
            >
              {" "}
              X
            </div>
          </div>
          {cartItems.length ? (
            <Cart
              cartItems={cartItems}
              handleRemove={handleRemove}
              cartValue={cartValue}
            />
          ) : (
            <div style={{ color: "white" }}>Cart is empty</div>
          )}
        </div>
      )}
      {!showCart &&
        productJSON.map((obj) => {
          return (
            <div
              style={{
                textAlign: "center",
                marginTop: 40,
              }}
            >
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
                  paddingLeft: 20,
                  display: "inline-block",
                  textAlign: "center",
                }}
              >
                <div>{obj.title}</div>
                <div>Price: ${obj.price}</div>
                <div>Rating: {obj.rating}</div>
                {obj.selected ? (
                  <button
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
                  </button>
                ) : (
                  <div
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      display: "inline-block",
                      padding: 5,
                      borderRadius: 5,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      obj.selected = true;
                      handleAddToCart(obj);
                    }}
                  >
                    Add to Cart
                  </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default App;
