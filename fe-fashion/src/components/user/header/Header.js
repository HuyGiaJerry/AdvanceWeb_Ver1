import React, { useState } from 'react';
import { Navbar, Nav, Button, Container, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../../store/store';
import { NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => {
    const dispatch = useDispatch();
    const isLoggin = useSelector((state) => state.auth.isLoggin);
    const cartCnt = useSelector((state) => state.auth.cartCount);
    const wishlistCnt = useSelector((state) => state.auth.wishlistCount);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false); // Trạng thái hiển thị modal
    const [searchQuery, setSearchQuery] = useState(''); // Trạng thái lưu chữ trong input
    const [searchResults, setSearchResults] = useState([]); // Kết quả tìm kiếm

    // Dữ liệu mẫu
    const hotKeywords = ['Blazer', 'Áo', 'Váy', 'Quần', 'Áo dài', 'Hoodie'];
    const suggestedProducts = [
        { id: 1, name: 'Quần ống suông', image: '099.jpg' },
        { id: 2, name: 'Áo blazer', image: '098.jpg' },
        { id: 3, name: 'Váy mini', image: '077.jpg' },
        { id: 4, name: 'Áo thun basic', image: '066.jpg' },
    ];

    const handleToggle = () => setIsNavbarOpen(!isNavbarOpen);

    // Đóng menu khi nhấp vào NavLink
    const handleNavLinkClick = () => {
        setIsNavbarOpen(false);
    };

    // Xử lý mở/đóng modal
    const handleSearchClick = () => setShowSearchModal(true);
    const handleCloseModal = () => setShowSearchModal(false);

    // Xử lý tìm kiếm
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Lọc kết quả tìm kiếm từ dữ liệu mẫu
        const filteredResults = suggestedProducts.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults(filteredResults);
    };

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
                            <NavLink exact to='/home' className='nav-link' activeClassName="active" onClick={handleNavLinkClick}>Home</NavLink>
                            {isLoggin ? (
                                <>
                                    <NavLink exact to='/shop' className='nav-link' activeClassName="active" onClick={handleNavLinkClick}>Shop</NavLink>
                                    <NavLink exact to='/products' className='nav-link' activeClassName="active" onClick={handleNavLinkClick}>Products</NavLink>
                                    <NavLink to='/pages' className='nav-link' activeClassName="active" onClick={handleNavLinkClick}>Pages</NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink exact to='/deals' className='nav-link' activeClassName="active" onClick={handleNavLinkClick}>Deals</NavLink>
                                    <NavLink exact to='/new-arrivals' className='nav-link' activeClassName="active" onClick={handleNavLinkClick}>New Arrivals</NavLink>
                                    <NavLink exact to='/packages' className='nav-link' activeClassName="active" onClick={handleNavLinkClick}>Packages</NavLink>
                                </>
                            )}
                        </Nav>
                        <Nav className="ml-auto">
                            {isLoggin ? (
                                <>
                                    <NavLink className='nav-link' onClick={handleSearchClick}>
                                        <img src={require('../../../assets/icons/search.png')} alt="Search" />
                                    </NavLink>
                                    <NavLink className='nav-link' exact to='/profile' activeClassName="active" onClick={handleNavLinkClick}>
                                        <img src={require('../../../assets/icons/user.png')} alt="User" />
                                    </NavLink>
                                    <NavLink className='nav-link' to='/wish-list' onClick={handleNavLinkClick}>
                                        <img src={require('../../../assets/icons/star.png')} alt="Wishlist" />
                                        {wishlistCnt > 0 && (
                                            <span className="badge badge-danger">{wishlistCnt}</span>
                                        )}
                                    </NavLink>
                                    <NavLink className='nav-link' to='/cart' onClick={handleNavLinkClick}>
                                        <img src={require('../../../assets/icons/cart.png')} alt="Cart" />
                                        {cartCnt > 0 && (
                                            <span className="badge badge-danger">{cartCnt}</span>
                                        )}
                                    </NavLink>
                                    <NavLink
                                        className='nav-link'
                                        to='/home'
                                    >
                                        <Button onClick={() => dispatch(logout())} variant="dark" style={{ fontSize: '12px', width: '105px' }}>
                                            Sign Out
                                        </Button>
                                    </NavLink>
                                </>
                            ) : (
                                <>
                                    <NavLink
                                        className='nav-link'
                                        to='/home'
                                        activeClassName="active"
                                        style={{ fontSize: '12px', width: '75px' }}
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

            {/* Modal tìm kiếm */}
            <Modal
                show={showSearchModal}
                onHide={handleCloseModal}
                centered
                backdrop={true}
                keyboard={false}
                className="search-modal"
            >
                <Modal.Body>
                    <div className="search-modal-header">
                        <button className="btn-back" onClick={handleCloseModal}>
                            ← Back
                        </button>
                        <h5>Tìm kiếm</h5>
                    </div>
                    <div className="search-modal-content">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={handleSearchChange} // Xử lý tìm kiếm khi nhập
                        />
                        {searchQuery === '' ? (
                            <>
                                <div className="search-suggestions">
                                    <h6>Từ khóa hot</h6>
                                    <div className="tags">
                                        {hotKeywords.map((keyword, index) => (
                                            <span key={index} className="tag">{keyword}</span>
                                        ))}
                                    </div>
                                    <h6>Gợi ý sản phẩm</h6>
                                    <div className="suggestions">
                                        {suggestedProducts.map((product) => (
                                            <NavLink
                                                key={product.id}
                                                to={`/shop/product/detail/${product.id}`}
                                                className="suggestion-item"
                                            >
                                                <img
                                                    src={require(`../../../assets/images/${product.image}`)}
                                                    alt={product.name}
                                                    className="result-image"
                                                />
                                                <span className="result-name">{product.name}</span>
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="search-results">
                                {searchResults.map((product) => (
                                    <NavLink
                                        key={product.id}
                                        to={`/shop/product/detail/${product.id}`}
                                        className="search-result-item"
                                    >
                                        <img
                                            src={require(`../../../assets/images/${product.image}`)}
                                            alt={product.name}
                                            className="result-image"
                                        />
                                        <span className="result-name">{product.name}</span>
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Header;