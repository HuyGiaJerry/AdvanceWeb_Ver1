import React, { useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Header.scss';

const Header = ({ isLoggedIn, fullName, setUser }) => {
    const [showFilter, setShowFilter] = useState(false);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const handleToggle = () => setIsNavbarOpen(!isNavbarOpen);

    // Close menu when clicking NavLink
    const handleNavLinkClick = () => {
        setIsNavbarOpen(false);
    };

    const handleSignOut = () => {
        setUser({
            isLoggedIn: false,
            fullName: ''
        });
    };

    return (
        <div className='header'>
            <Navbar bg="white" expand="md" className="header-container" fixed="top" key={isLoggedIn ? 'logged-in' : 'logged-out'}>
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
                            {isLoggedIn ? (
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
                            {isLoggedIn ? (
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
                                    </NavLink>
                                    <NavLink className='nav-link' to='/cart' onClick={handleNavLinkClick}>
                                        <img src={require('../../../assets/icons/cart.png')} alt="Cart" />
                                    </NavLink>
                                    <NavLink className='nav-link' to='/profile' onClick={handleNavLinkClick}>
                                        <span className="full-name">{fullName || 'User'}</span>
                                    </NavLink>
                                    <NavLink className='nav-link' to='/home'>
                                        <Button onClick={handleSignOut} variant="dark" style={{ fontSize: '12px' }}>
                                            Sign Out
                                        </Button>
                                    </NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink
                                        className='nav-link'
                                        to='/login'
                                        style={{ fontSize: '12px' }}
                                        onClick={handleNavLinkClick}
                                    >
                                        Sign In
                                    </NavLink>
                                    <NavLink
                                        className='nav-link'
                                        to='/register'
                                        style={{ fontSize: '12px' }}
                                        onClick={handleNavLinkClick}
                                    >
                                        <Button variant="dark" style={{ fontSize: '12px' }}>
                                            Sign Up
                                        </Button>
                                    </NavLink>
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