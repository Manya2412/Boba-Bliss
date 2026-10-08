import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import LoginModal from './components/auth/LoginModal';
import { Routes, Route } from 'react-router-dom';
import RegisterModal from './components/auth/RegisterModal';
import { useState } from 'react';
import Profile from "../src/pages/Profile";
import Orders from "../src/pages/Orders";
import ProductManagement from "../src/pages/admin/ProductManagement";
import OrderManagement from "../src/pages/admin/OrderManagemnet";

function App() {

    const [
        showLoginModal,
        setShowLoginModal,
    ] = useState(false);

    const [
        showRegisterModal,
        setShowRegisterModal,
    ] = useState(false);

    return (<>
        <Routes>
            <Route
                path="/"
                element={
                    <Home
                        openLogin={() =>
                            setShowLoginModal(true)
                        }
                        openRegister={() =>
                            setShowRegisterModal(true)
                        }
                    />
                }
            />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route
                path="/admin/products"
                element={<ProductManagement />}
            />

            <Route
                path="/admin/orders"
                element={<OrderManagement />}
            />
        </Routes>

        <LoginModal
            isOpen={showLoginModal}
            onClose={() =>
                setShowLoginModal(false)
            }
            onOpenRegister={() => {
                setShowLoginModal(false);
                setShowRegisterModal(true);
            }}
        />

        <RegisterModal
            isOpen={showRegisterModal}
            onClose={() =>
                setShowRegisterModal(false)
            }
            onOpenLogin={() => {
                setShowRegisterModal(false);
                setShowLoginModal(true);
            }}
        />
    </>

    );
}

export default App;
