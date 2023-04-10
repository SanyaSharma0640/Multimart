import React,{useRef,useEffect}from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import './header.css';
import { Container, Row } from "reactstrap";
import logo from '../../assets/images/eco-logo.png';
import userIcon from '../../assets/images/user-icon.png';
import {motion} from "framer-motion";
import { useSelector } from "react-redux";
import useAuth from '../../custom-hooks/useAuth'
// import { updateCurrentUser } from 'firebase/auth';

const nav_links = [
    {
        path: 'home',
        display: 'Home'
    },
    {
        path: 'shop',
        display: 'Shop'
    },
    {
        path: 'cart',
        display: 'Cart'
    },
]
const Header = () => {
    const headerRef = useRef(null)
    const totalQuantity = useSelector(state=> state.cart.totalQuantity)
    const menuRef = useRef(null)
    const navigate = useNavigate()
    // const {currentUser} = useAuth()
    const stickHeaderrFunc =()=>{
        window.addEventListener('scroll', ()=>{
            if(document.body.scrollTop>80 || document.documentElement.scrollTop>80){
                headerRef.current.classList.add('sticky_header')
            } else{
                headerRef.current.classList.remove('sticky_header')
            }
        })
    }
    useEffect(()=>{
        stickHeaderrFunc()
        return()=> window.removeEventListener('scroll', stickHeaderrFunc);
    });
    const menuToggle = ()=> menuRef.current.classList.toggle('active__menu');
    const navigateToCart =()=>{
        navigate("/cart");
    }
  return <header className='header' ref={headerRef}>
    <Container>
        <Row>
            <div className='nav_wrapper'>
                <div className='logo'>
                    <img src={logo} alt="logo"/>
                    <div>
                        <h1>ShopHive</h1>
                    </div>
                </div>
                <div className="navigation" ref={menuRef} onClick={menuToggle}>
                    <ul className="menu">
                        {nav_links.map((item, index)=>(
                                <li className='nav_item' key={index}>
                                    <NavLink to={item.path} className={(navClass)=>
                                    navClass.isActive ? 'nav_active': ''}>{item.display}</NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="nav_icons">
                    <span className='fav_icon'><i class="ri-heart-line"></i>
                    <span className='badge'>2</span></span>
                    <span className='cart_icon' onClick={navigateToCart}>
                    <i class="ri-shopping-bag-line"></i>
                    <span className='badge'>{totalQuantity}</span>
                    </span>
                    <span><motion.img whileTap={{scale:1.2}}
                    src={userIcon}
                    alt='Image not load' /></span>
                    <div className="mobile_menu">
                    <span onClick={menuToggle}><i class="ri-menu-line"></i></span>
                    </div>
                </div>
                
            </div>
        </Row>
    </Container>
  </header>
}

export default Header
