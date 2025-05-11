import React, { useState } from 'react';
import { Navbar, Nav, Button, Container, Modal, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/store';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import productService from '../../../services/productService';
import './Header.scss';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth.auth);
    const userName = useSelector((state) => state.auth.fullName); // Lấy tên người dùng từ Redux
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
    const handleSearchChange = async (e) => {
        const query = e.target.value; // Thay đổi từ const thành let




        setSearchQuery(query);

        if (query.trim() === '') {
            setSearchResults([]); // Xóa kết quả tìm kiếm nếu input rỗng
            return;
        }

        try {
            // Gọi API tìm kiếm sản phẩm theo tên
            const results = await productService.searchProductByName(query);
            setSearchResults(results); // Cập nhật kết quả tìm kiếm
        } catch (error) {
            console.error('Lỗi khi tìm kiếm sản phẩm:', error);
            toast.error('Không thể tìm kiếm sản phẩm. Vui lòng thử lại.');
        }
    };


    const handleSignOut = () => {
        dispatch(logout());
        localStorage.removeItem('authState'); // Xóa thông tin đăng nhập khỏi localStorage
        localStorage.removeItem('cart'); // Xóa giỏ hàng khỏi localStorage
        toast.success('Logout successfully!');
        navigate('/login');
    }

    return (
        <div className='header'>
            <Navbar bg="white" expand="md" className="header-container" fixed="top" key={auth ? 'logged-in' : 'logged-out'}>
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
                            <NavLink to='/home' className='nav-link' onClick={handleToggle}>Home</NavLink>
                            <NavLink to='/shop' className='nav-link' onClick={handleToggle}>Shop</NavLink>
                            <NavLink to='/products' className='nav-link' onClick={handleToggle}>Products</NavLink>
                            <NavDropdown title="Pages" id="pages-dropdown">
                                <NavDropdown.Item as={NavLink} to="/new-arrivals">New Arrivals</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/blog">Blog</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/deals">Deals</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav className="ml-auto">
                            <button className='nav-link search-button' onClick={handleSearchClick}>
                                <img src={require('../../../assets/icons/search.png')} alt="Search" />
                            </button>
                            {auth ? (
                                <NavDropdown
                                    title={
                                        <img src={require('../../../assets/icons/user.png')} alt="User" />
                                    }
                                    id="user-dropdown"
                                    className="user-dropdown"
                                >

                                    <NavDropdown.Item as={NavLink} to="/account">{`Hello, ${userName}`} </NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/orders">Orders</NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleSignOut}>Log Out</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <NavLink className='nav-link' to='/login'>
                                    <img src={require('../../../assets/icons/user.png')} alt="User" />
                                </NavLink>
                            )}
                            <NavLink className='nav-link' to='/wish-list'>
                                <img src={require('../../../assets/icons/star.png')} alt="Wishlist" />
                                {wishlistCnt > 0 && (
                                    <span className="badge badge-danger">{wishlistCnt}</span>
                                )}
                            </NavLink>
                            <NavLink className='nav-link' to='/cart'>
                                <img src={require('../../../assets/icons/cart.png')} alt="Cart" />
                                {cartCnt > 0 && (
                                    <span className="badge badge-danger">{cartCnt}</span>
                                )}
                            </NavLink>
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
                                    <h6 style={{ paddingLeft: "10px", marginTop: "20px" }}>Từ khóa hot</h6>
                                    <div className="tags">
                                        {hotKeywords.map((keyword, index) => (
                                            <span key={index} className="tag">{keyword}</span>
                                        ))}
                                    </div>
                                    <h6 style={{ paddingLeft: "10px", marginTop: "20px" }}>Gợi ý sản phẩm</h6>
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
                                {searchResults.length > 0 ? (
                                    searchResults.map((product) => (
                                        <NavLink
                                            key={product.productId}
                                            to={`/shop/product/detail/${product.productId}`}
                                            className="search-result-item"
                                            onClick={handleCloseModal} // Đóng modal khi nhấp vào kết quả
                                        >
                                            <img
                                                src={`https://localhost:7123${product.images[0]?.imageUrl}`} // Hiển thị ảnh đầu tiên
                                                alt={product.name}
                                                className="result-image"
                                            />
                                            <span className="result-name">{product.name}</span>

                                        </NavLink>
                                    ))
                                ) : (
                                    <p className="no-results">Không tìm thấy sản phẩm nào.</p>
                                )}
                            </div>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Header;