import { useState } from "react";
import { ProDatas } from "../Datas/ProDatas";
import Popup from "./Popup";
import { toast } from "react-toastify";

export default function Products(props) {
  const [products, SetProducts] = useState(ProDatas);
  const [selecteditems, Setselecteditems] = useState([]);

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
    SetProducts(updated);
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
  }

  /************** carddecrement in popup **************/
  function Popupdecrement(card) {
    const updated = selecteditems.map((val) => {
      if (val.heading === card.heading && val.orderedq > 0) {
        return { ...val, orderedq: val.orderedq - 1 };
      }
      return val;
    });
    Setselecteditems(updated);
    props.headercount(updated.length);
  }

  /************** Return **************/
  return (
    <div className="container">
      <div className="mx-w main">
        {products.map((val) => (
          <div className="products" key={val.heading}>
            <img src={val.imgurl} alt={val.heading} />
            <h2>{val.heading}</h2>
            <div className="flex">
              <div className="price">
                <h4>Rs.{val.price}</h4>
              </div>
              <div className="quantity">
                <h4>{val.quantity}Kg</h4>
              </div>
            </div>
            <div className="how-to-order">
              <div className="cards">
                <div className="button-group">
                  Rs {val.orderedq * val.price}
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
        ))}
      </div>

      <Popup
        products={products}
        selecteditems={selecteditems}
        Popupopen={props.Popupopen}
        Popupclose={props.Popupclose}
        updateProducts={SetProducts}
        removeFromCart={removeFromCart}
        popupincrement={popupincrement}
        popupdecrement={Popupdecrement}
      />
    </div>
  );
}
