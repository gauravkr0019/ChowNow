import { useState } from "react";
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux'






const Title = () => (
    <a href="/">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNx76pUGIu1KXqWiqRHteqox-vTDYnsMp6PQ&usqp=CAU" 
        alt="logo"
        className="logo" 
        />
    </a>
)

const Header = () => {
    const cartItems=useSelector(store=>store.cart.items)

    function LoginUser(data){
        setIsLogin(data);
    }

    

    const [islogin, setIsLogin]=useState(false)
    return (
        <div className="header">
            <Title />
            
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li><Link to="/about">About</Link></li>
                    <li>Contact</li>
          
                    <li><Link to="/instamart">Instamart</Link></li>
                    <li>Cart {cartItems.length}</li>
                </ul>
            </div>
            {islogin?
                <button onClick={()=> LoginUser(false)}>Logout</button>
                :
                <button onClick={()=>LoginUser(true)}>Login</button>
            }
        </div>
        
    )
}

export default Header;