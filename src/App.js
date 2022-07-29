import { BrowserRouter, Link, Route, Routes as Switch } from 'react-router-dom'
import './App.scss';
import ThemSanPham from './addons/danhSachSanPham/components/ThemSanPham';
import DanhSachSanPham from './addons/danhSachSanPham/components/DanhSachSanPham';
import Layout from './addons/base/components/Layout';
import SanPham from './addons/danhSachSanPham/components/SanPham';
import Cart from './addons/cart/components/Cart';
import Order from './addons/order/components/Order';
import OrderDetail from './addons/order/components/OrderDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
        </header>
        <Switch>
          <Route path='/' element={<Layout />}>
            <Route index element={<DanhSachSanPham />} />
            <Route path='/them-san-pham' element={<ThemSanPham />} />
            <Route path='/san-pham' element={<DanhSachSanPham />} />
            <Route path='/san-pham/:id' element={<SanPham />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<Order />} />
            <Route path='/order-detail/:maDonHang' element={<OrderDetail />} />
            <Route path="*" element={
                <div style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </div>
              }
            />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
