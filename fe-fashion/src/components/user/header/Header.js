import React, { useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../../store/store';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.scss';

const Header = () => {
    const dispatch = useDispatch();
    const isLoggin = useSelector((state) => state.auth.isLoggin);
    const cartCnt = useSelector((state) => state.auth.cartCount);
    const wishlistCnt = useSelector((state) => state.auth.wishlistCount);
    const [showFilter, setShowFilter] = useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const handleToggle = () => setIsNavbarOpen(!isNavbarOpen);

    // Đóng menu khi nhấp vào NavLink
    const handleNavLinkClick = () => {
        setIsNavbarOpen(false);
    };
    console.log('isLoggin:', isLoggin);

    return (
        <div className='header'>
            <Navbar bg="white" expand="md" className="header-container" fixed="top" key={isLoggin ? 'logged-in' : 'logged-out'}>
                <Container>
                    <NavLink to='/' className='navbar-brand'>FASCO</NavLink>
                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        onClick={handleToggle}
                    />
                    <Navbar.Collapse
                        id="basic-navbar-nav"
                        in={isNavbarOpen}
                    >
                        <Nav className="me-auto">
                            <NavLink to='/home' className='nav-link' onClick={handleNavLinkClick}>Home</NavLink>
                            {isLoggin ? (
                                <>
                                    <NavLink to='/shop' className='nav-link' onClick={handleNavLinkClick}>Shop</NavLink>
                                    <NavLink to='/products' className='nav-link' onClick={handleNavLinkClick}>Products</NavLink>
                                    <NavLink to='/pages' className='nav-link' onClick={handleNavLinkClick}>Pages</NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink to='/deals' className='nav-link' onClick={handleNavLinkClick}>Deals</NavLink>
                                    <NavLink to='/new-arrivals' className='nav-link' onClick={handleNavLinkClick}>New Arrivals</NavLink>
                                    <NavLink to='/packages' className='nav-link' onClick={handleNavLinkClick}>Packages</NavLink>
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
                                    <NavLink onClick={() => setShowFilter(!showFilter)} className='nav-link'>
                                        <img src={require('../../../assets/icons/search.png')} alt="Search" />
                                    </NavLink>
                                    <NavLink className='nav-link' to='/profile' onClick={handleNavLinkClick}>
                                        <img src={require('../../../assets/icons/user.png')} alt="User" />
                                    </NavLink>
                                    <NavLink className='nav-link' to='/wish-list' onClick={handleNavLinkClick}>
                                        <img src={require('../../../assets/icons/star.png')} alt="Wishlist" />
                                        {wishlistCnt > 0 &&(
                                            <span className="badge badge-danger">{wishlistCnt}</span>
                                        )}
                                    </NavLink>
                                    <NavLink className='nav-link' to='/cart' onClick={handleNavLinkClick}>
                                        <img src={require('../../../assets/icons/cart.png')} alt="Cart" />
                                        {cartCnt > 0 &&(
                                            <span className="badge badge-danger">{cartCnt}</span>

                                            )}
                                    </NavLink>
                                    <NavLink
                                        className='nav-link'
                                        to='/home'
                                    >

                                        <Button onClick={() => dispatch(logout())} variant="dark" style={{ fontSize: '12px' }}>
                                            Sign Out
                                        </Button>
                                    </NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink
                                        className='nav-link'
                                        to='/home'
                                        style={{ fontSize: '12px' }}
                                        onClick={() => dispatch(login())}
                                    >
                                        Sign In
                                    </NavLink>
                                    <Button variant="dark">
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