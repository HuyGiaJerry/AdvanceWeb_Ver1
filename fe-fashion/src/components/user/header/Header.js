import React, { useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../../store/store';
import '../../../assets/fonts/Volkhov.scss';
import { NavLink } from 'react-router-dom';
import './Header.scss';
const Header = () => {
    const dispatch = useDispatch();
    const isLoggin = useSelector((state) => state.auth.isLoggin);
    const [showFilter, setShowFilter] = useState(false);
    return (
        <div className='header'>
            <Navbar bg="white" expand="md" className="header-container">
                <Container>
                    <NavLink to='/' className='navbar-brand'>FASCO</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to='/home' className='nav-link' >Home</NavLink>
                            {isLoggin ? (
                                <>
                                    <NavLink to='/shop' className='nav-link'>Shop</NavLink>
                                    <NavLink to='/products' className='nav-link'>Products</NavLink>
                                    <NavLink to='/pages' className='nav-link'>Pages</NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink to='/deals' className='nav-link'>Deals</NavLink>
                                    <NavLink to='/new-arrivals' className='nav-link'>New Arrivals</NavLink>
                                    <NavLink to='/packages' className='nav-link'>Packages</NavLink>
                                </>
                            )}
                        </Nav>
                        <Nav className="ml-auto">
                            {isLoggin ? (
                                <>

                                    {showFilter && (
                                        <input
                                            type="text"
                                            className="filter-input"
                                            placeholder="Search..."
                                            autoFocus
                                        />
                                    )}
                                    <NavLink as="button" onClick={() => setShowFilter(!showFilter)} className='nav-link'>
                                        <img src={require('../../../assets/icons/search.png')} alt="Search" />
                                    </NavLink>
                                    <NavLink className='nav-link' to='/profile' >
                                        <img src={require('../../../assets/icons/user.png')} /></NavLink>
                                    <NavLink className='nav-link' to='/wish-list' >
                                        <img src={require('../../../assets/icons/star.png')} /></NavLink>
                                    <NavLink className='nav-link' to='/cart' >
                                        <img src={require('../../../assets/icons/cart.png')} /></NavLink>
                                    <NavLink className='nav-link' to='/home' onClick={() => dispatch(logout())} style={{ fontSize: '12px' }}>
                                        Sign Out
                                    </NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink className='nav-link' to='/home' style={{ fontSize: '12px' }} onClick={() => dispatch(login())}>Sign In</NavLink>
                                    <Button variant="dark" >
                                        Sign Up
                                    </Button>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};



export default Header;