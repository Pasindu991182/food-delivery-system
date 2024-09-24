import React from 'react';
import './Footer.css'
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id ='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img className= "logo"src={assets.logo} alt="" />
                <p>Experience the finest culinary delights at our restaurant, where exceptional service, fresh ingredients, and unforgettable flavors come together to create a dining experience like no other</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <l1>071-9366028</l1>
                    <li>IT22371522@my.sliit.lk</li>
                    <button>Inquiry us</button>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 PASINDU IROSHAN - All Right reserved</p>
    </div>
  );
}

export default Footer;