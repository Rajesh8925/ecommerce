import { useState } from "react";
import { ProDatas } from "../Datas/ProDatas";

import Popup from "./Popup";


export default function Products(props) {
  const [products, SetProducts] = useState(ProDatas);

  /**************cardincrement******** */
  function cardincre(card) {
    const updated = products.map((val) => {
      if (card.heading == val.heading) {
        return { ...val, orderedq: val.orderedq + 1 }
      } else {
        return val;
      }
    })
    SetProducts(updated);
  }

  /************carddecrement********* */
  function carddecre(card) {
    const updated = products.map((val) => {
      if (card.heading == val.heading && val.orderedq > 0) {
        return { ...val, orderedq: val.orderedq - 1 }
      } else {
        return val;
      }
    })
    SetProducts(updated);
  }
  /****************addedtocart*************** */
  function Addedtocart(card) {
    const updated = products.map((val) => {
      if (card.heading == val.heading) {
        return { ...val, addedtocart: 1 }
      } else {
        return val;
      }
    })
    let count = 0;
    updated.forEach((val) => {
      if (val.addedtocart == 1 && val.orderedq > 0)
        count++;
    })
    props.headercount(count);
    SetProducts(updated)

  }
  /****************remove-from-cart*************** */
  function removeFromCart(card) {
    const updated = products.map((val) => {
      if (val.heading === card.heading) {
        return { ...val, addedtocart: 0, orderedq: 0 };
      }
      return val;
    });

    SetProducts(updated);

    let count = 0;
    updated.forEach((val) => {
      if (val.addedtocart == 1 && val.orderedq > 0) {
        count++;
      }
    });

    props.headercount(count);
  }




  return (
    <div className="container">
      <div className="mx-w main">
        {
          products.map((val) => (
            <div className="products" key={val.heading}>
              <img src={val.imgurl} alt={val.heading} />
              <h2>{val.heading}</h2>
              <div className="flex">
                <div className="price"><h4>Rs.{val.price}</h4></div>
                <div className="quantity"><h4>{val.quantity}Kg</h4></div>
              </div>
              <div className="how-to-order">
                <div className="cards">
                  <div className="button-group">
                    Rs{val.orderedq * val.price}
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
          ))
        }
      </div>
      <Popup
        products={products}
        Popupopen={props.Popupopen}
        Popupclose={props.Popupclose}
        updateProducts={SetProducts}
        removeFromCart={removeFromCart}
        cardincre={cardincre}
        carddecre={carddecre}
      />

    </div>
  );
}
