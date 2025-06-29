import React from 'react'
import Amazonlogo from '../Images/Amazon logo.png'
import cartlogo from '../Images/cart.png'

export default function Header(props) {
    return (
        <div className="container header">
            <div className=" mx-w grid grid-3 nav">
                <div className="grid-sec amazon">
                    <img src={Amazonlogo} />
                </div>
                <div className="grid-sec">
                    <ul>
                        <a><li>Home</li></a>
                        <a><li>About</li></a>
                        <a><li>Pricing</li></a>
                        <a><li>Contact</li></a>
                    </ul>
                </div>
                <div className="grid-sec cart">
                    <div className="cart-icon" onClick={()=>{props.Popupopen()}}>
                        <img src={cartlogo} alt="Cart" />
                        {props.addedtocartcount > 0 && (
                            <span className="cart-count">{props.addedtocartcount}</span>
                        )}
                    </div>
                </div>



            </div>
           
        </div>
    )
}
