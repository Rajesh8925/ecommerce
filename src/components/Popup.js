import "../myStyles/Popup.css";

export default function Popup(props) {
    if (props.Popupopen !== 1) return null;

    return (
        <div className="mypopup">
            <div className="showpop">
                <button className="close-btn" onClick={props.Popupclose}>×</button>
                <h2>Cart Summary</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.products.map((val) => {
                                if (val.addedtocart === 1) {
                                    return (
                                        <tr key={val.heading}>
                                            <td>{val.heading}</td>
                                            <td>Rs. {val.price}</td>
                                            <td>
                                                <button onClick={() => props.cardincre(val)}>+</button>
                                                {val.orderedq}
                                                <button onClick={() => props.carddecre(val)}>-</button>
                                            </td>
                                            <td>Rs. {val.price * val.orderedq}</td>
                                            <td>
                                                <button onClick={() => props.removeFromCart(val)}>🗑️</button>
                                            </td>
                                        </tr>
                                    );
                                }
                                return null;
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

