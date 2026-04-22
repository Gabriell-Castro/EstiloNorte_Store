import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import PrivateRoute from '../components/PrivateRoute';
import Admin from '../pages/Admin';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import ProductDetails from '../pages/ProductDetails';
import Products from '../pages/Products';
import Register from '../pages/Register';

function AppRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute adminOnly>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default AppRoutes;
