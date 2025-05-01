import { Route, Routes } from "react-router-dom"
import Home from "../pages/user/home"
import MainShop from "../pages/user/main_shop"
import Detail from "../pages/user/detail"
import Login from "../pages/user/login"
import SignUp from "../pages/user/signup"
import ShopCart from "../pages/user/shop-cart"
import WishList from "../pages/user/wish-list"
import Header from "../components/user/header/Header"
import Footer from "../components/user/footer/Footer"
import '../App'
const UserRoutes = () => {
    return (
        <>
            <Header />
            <div className='main-content'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/shop" element={<MainShop />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<SignUp />} />
                    <Route path="/cart" element={<ShopCart />} />
                    <Route path="/wish-list" element={<WishList />} />
                    <Route path="/shop/product/detail/:id" element={<Detail />} />
                </Routes>
            </div>
            <Footer />
        </>
    )
}

export default UserRoutes;