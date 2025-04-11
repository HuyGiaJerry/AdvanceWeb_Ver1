import React, { useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../../store/store';
import '../../../assets/fonts/Volkhov.scss';
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
const Header = () => {
    const dispatch = useDispatch();
    const isLoggin = useSelector((state) => state.auth.isLoggin);
    const [showFilter, setShowFilter] = useState(false);
    return (
        <Navbar bg="light" expand="lg" className="header-container">
            <Container>
                <Navbar.Brand as={Link} to='/' className='navbar-brand'>FASCO</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to='/home' >Home</Nav.Link>
                        {isLoggin ? (
                            <>
                                <Nav.Link as={NavLink} to='/shop'  >Shop</Nav.Link>
                                <Nav.Link as={NavLink} to='/products' >Products</Nav.Link>
                                <Nav.Link as={NavLink} to='/pages'>Pages</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to='/deals'>Deals</Nav.Link>
                                <Nav.Link as={NavLink} to='/new-arrivals'>New Arrivals</Nav.Link>
                                <Nav.Link as={NavLink} to='/packages'>Packages</Nav.Link>
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
                                <Nav.Link as="button" onClick={() => setShowFilter(!showFilter)}>
                                    <img src={require('../../../assets/icons/search.png')} alt="Search" />
                                </Nav.Link>
                                <Nav.Link as={NavLink} to='/profile' >
                                    <img src={require('../../../assets/icons/user.png')} /></Nav.Link>
                                <Nav.Link as={NavLink} to='/wish-list' >
                                    <img src={require('../../../assets/icons/star.png')} /></Nav.Link>
                                <Nav.Link as={NavLink} to='/cart' >
                                    <img src={require('../../../assets/icons/cart.png')} /></Nav.Link>
                                <Nav.Link as={NavLink} to='/home' onClick={() => dispatch(logout())} style={{ fontSize: '12px' }}>
                                    Sign Out
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to='/home' style={{ fontSize: '12px' }} onClick={() => dispatch(login())}>Sign In</Nav.Link>
                                <Button variant="dark" >
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};



export default Header;