import { useState, useEffect } from "react";
import { ProDatas } from "../Datas/ProDatas";
import Popup from "./Popup";
import { toast } from "react-toastify";
import { setCookie, getCookie } from "../Jscookies";

export default function Products(props) {
  const [products, SetProducts] = useState(ProDatas);
  const [selecteditems, Setselecteditems] = useState([]);

  // Load from cookies on page load
  useEffect(() => {
    const savedItems = getCookie("cartItems");
    if (savedItems) {
      try {
        const parsed = JSON.parse(savedItems);
        Setselecteditems(parsed);
        props.headercount(parsed.length);
        SetProducts((prev) =>
          prev.map((p) =>
            parsed.find((item) => item.heading === p.heading)
              ? {
                  ...p,
                  addedtocart: 1,
                  orderedq: parsed.find((item) => item.heading === p.heading)
                    .orderedq,
                }
              : p
          )
        );
      } catch (err) {
        console.error("Error parsing cookie:", err);
      }
    }
  }, []);

  // Save to cookies
  const saveCart = (items) => {
    setCookie("cartItems", JSON.stringify(items), 7);
  };

  /************** cardincrement **************/
  function cardincre(card) {
    const updated = products.map((val) => {
      if (card.heading === val.heading) {
        return { ...val, orderedq: val.orderedq + 1 };
      }
      return val;
    });
    SetProducts(updated);
  }

  /************** carddecrement **************/
  function carddecre(card) {
    const updated = products.map((val) => {
      if (card.heading === val.heading && val.orderedq > 0) {
        return { ...val, orderedq: val.orderedq - 1 };
      }
      return val;
    });

    // If quantity becomes 0, mark as not in cart
    const cleaned = updated.map((val) => {
      if (val.orderedq === 0) {
        return { ...val, addedtocart: 0 };
      }
      return val;
    });

    SetProducts(cleaned);

    const selected = cleaned.filter(
      (val) => val.addedtocart === 1 && val.orderedq > 0
    );
    Setselecteditems(selected);
    props.headercount(selected.length);
    saveCart(selected);
  }

  /************** addedtocart **************/
  function Addedtocart(card) {
    if (card.orderedq === 0) {
      toast.warn("Please select quantity before adding to cart!");
      return;
    }
    if (card.addedtocart === 1) {
      toast.info(`${card.heading} is already in the cart.`);
      return;
    }
    const updated = products.map((val) => {
      if (card.heading === val.heading) {
        return { ...val, addedtocart: 1 };
      }
      return val;
    });
    const selected = updated.filter(
      (val) => val.addedtocart === 1 && val.orderedq > 0
    );
    Setselecteditems(selected);
    props.headercount(selected.length);
    SetProducts(updated);
    saveCart(selected); // for cart
    toast.success(`${card.heading} added to cart!`);
  }

  /************** removeFromCart **************/
  function removeFromCart(card) {
    const updated = products.map((val) => {
      if (val.heading === card.heading) {
        return { ...val, addedtocart: 0, orderedq: 0 };
      }
      return val;
    });
    const selected = updated.filter(
      (val) => val.addedtocart === 1 && val.orderedq > 0
    );
    Setselecteditems(selected);
    props.headercount(selected.length);
    SetProducts(updated);
    saveCart(selected);
    toast.info(`${card.heading} removed from cart.`);
  }

  /************** cardincrement in popup **************/
  function popupincrement(card) {
    const updated = selecteditems.map((val) => {
      if (val.heading === card.heading) {
        return { ...val, orderedq: val.orderedq + 1 };
      }
      return val;
    });
    Setselecteditems(updated);
    props.headercount(updated.length);
    saveCart(updated);
  }

  /************** carddecrement in popup **************/
  function Popupdecrement(card) {
    const updated = selecteditems.map((val) => {
      if (val.heading === card.heading && val.orderedq > 0) {
        return { ...val, orderedq: val.orderedq - 1 };
      }
      return val;
    });

    // Remove from cart if quantity is now 0
    const cleaned = updated.filter((val) => val.orderedq > 0);

    Setselecteditems(cleaned);
    props.headercount(cleaned.length);
    saveCart(cleaned);

    // Also update main products list
    SetProducts((prev) =>
      prev.map((p) =>
        p.heading === card.heading && cleaned.every((ci) => ci.heading !== p.heading)
          ? { ...p, orderedq: 0, addedtocart: 0 }
          : p
      )
    );
  }

  /************** Return **************/
  return (
  <div className="container">
    <div className="mx-w main">
      {products
        .filter((val) =>
          val.heading.toLowerCase().includes((props.searchTerm || "").toLowerCase())
        )
        .map((val) => {
          const discountedPrice = Math.round(val.price * (1 - val.discount / 100));
          return (
            <div className="products" key={val.heading}>
              {val.discount > 0 && (
                <div className="discount-badge">{val.discount}% OFF</div>
              )}
              <img src={val.imgurl} alt={val.heading} />
              <h1>{val.heading}</h1>

              <div className="flex">
                <div className="price">
                  <h4 className="discounted-price">Rs.{discountedPrice}</h4>
                  {val.discount > 0 && (
                    <p className="original-price">Rs.{val.price}</p>
                  )}
                </div>
                <div className="quantity">
                  <h4>{val.quantity}Kg</h4>
                </div>
              </div>

              <div className="how-to-order">
                <div className="cards">
                  <div className="button-group">
                    Rs {val.orderedq * discountedPrice}
                    <button onClick={() => cardincre(val)}>+</button>
                    <button onClick={() => carddecre(val)}>-</button>
                    {val.orderedq * val.quantity}kg
                  </div>
                </div>
                <div className="cart">
                  <button onClick={() => Addedtocart(val)}>Add To Cart</button>
                </div>
              </div>
            </div>
          );
        })}
    </div>

    <Popup
      products={products}
      selecteditems={selecteditems}
      Popupopen={props.Popupopen}
      Popupclose={props.Popupclose}
      updateProducts={SetProducts}
      updateSelectedItems={Setselecteditems}
      headercount={props.headercount}
      removeFromCart={removeFromCart}
      popupincrement={popupincrement}
      popupdecrement={Popupdecrement}
    />
  </div>
);
}
