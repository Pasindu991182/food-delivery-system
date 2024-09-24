import React, { useContext, useEffect, useState } from 'react';
import './Placeorder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Placeorder = () => {
  const { getTotalCartAmount,token,food_list,cartItems,url } = useContext(StoreContext);

  const [data,setData] = useState({
    firstName:"",
    email:"",
    addr:"",
    phone:""
  });

  const [isLoading, setIsLoading] = useState(true); 

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart'); 
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    } else {
      fetchUserData(); 
    }
  }, [token]); 

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${url}/api/user/${localStorage.getItem("uid")}`, {
        headers: { Authorization: `Bearer ${token}`, token: token },
      });

      const userData = response.data.user;
      setData({
        firstName: userData.name,
        email: userData.email,
        street: userData.address, 
        phone: userData.phoneNumber 
      });
      setIsLoading(false); 

    } catch (error) {
      console.error("Error fetching user data:", error);
      alert(error.response?.data?.message || "Error fetching user data");
      setIsLoading(false); 
    }
  };


  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event) =>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error");
    }
  }

  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title" style={{ color: 'black' }}>Delivery Information</p>
        
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='Name' />
          
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone'/>
      </div>
      <div className="place-order-right">
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <hr />
            <div className="cart-total-detail">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <div className="cart-total-detail">
            <p>Delivery Fee</p>
            <p>₹{getTotalCartAmount()===0?0:2}</p>
          </div>
          <div className="cart-total-detail">
            <b>Total</b>
            <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
          </div>
            <hr />
          </div>
          <button type='submit' className="payment">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
