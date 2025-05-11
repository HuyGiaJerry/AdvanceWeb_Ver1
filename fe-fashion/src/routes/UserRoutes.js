import { Route, Routes } from "react-router-dom"
import Home from "../pages/user/home"
import MainShop from "../pages/user/main_shop"
import Detail from "../pages/user/detail"
import Login from "../pages/user/login"
import SignUp from "../pages/user/signup"
import ShopCart from "../pages/user/shop-cart"
import WishList from "../pages/user/wish-list"
import Account from "../pages/user/account"
import Orders from "../pages/user/order"
import OrderDetail from "../pages/user/orderDetail"
import CheckOut from "../pages/user/check-out"
import Header from "../components/user/header/Header"
import Footer from "../components/user/footer/Footer"
import '../App'
// import NotFound from "../components/user/not_found/NotFound"
import PaymentResult from "../pages/user/PaymentResult"
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
                    <Route path="/account" element={<Account />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/order/:orderId" element={<OrderDetail />} />
                    <Route path="/check-out" element={<CheckOut />} />
                    <Route path="/shop/product/detail/:id" element={<Detail />} />
                    <Route path="/payment-result" element={<PaymentResult />} />
                    {/* <Route path="*" element={<NotFound />} /> */}
                </Routes>
            </div>
            <Footer />
        </>
    )
}

export default UserRoutes;