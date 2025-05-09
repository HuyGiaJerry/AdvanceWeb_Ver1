import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
    return (
        <>
            <div className='border-top'></div>
            <Navbar bg="white" expand="md" className="footer-container">
                <Container>
                    <NavLink to='/' className='navbar-brand'>FASCO</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <>
                                <NavLink to='/support-center' className='nav-link'>Support Center</NavLink>
                                <NavLink to='/invoicing' className='nav-link'>Invoicing</NavLink>
                                <NavLink to='/contact' className='nav-link'>Contact</NavLink>
                                <NavLink to='/carrer' className='nav-link'>Careers</NavLink>
                                <NavLink to='/blog' className='nav-link'>Blog</NavLink>
                                <NavLink to='/faq' className='nav-link'>FAQs</NavLink>
                            </>
                        </Nav>
                    </Navbar.Collapse>


                </Container>
            </Navbar>
            <div className="footer-copyright text-center mt-3">
                Copyright © 2022 Xpro. All Rights Reserved.
            </div>
        </>
    );
}

export default Footer;