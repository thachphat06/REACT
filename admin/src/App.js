import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Admin from './admin';
import NotFound from './NotFound';
import Menu from './Menu';
import SanPhamList from './page/SanPhamList';
import SanPhamThem from './page/SanPhamThem';
import Nav from './nav';
import DangNhap from './DangNhap';
import Download from './Download';
import { useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';
import SanPhamSua from './page/SanPhamSua';
import LoaiList from './page/LoaiList';
import LoaiSua from './page/SuaLoai';
import LoaiThem from './page/ThemLoai';

function App() {
  const daDangNhap = useSelector(state => state.auth.daDangNhap);
  return (
    <BrowserRouter basename="/">
      <div className="container">
        <header>
          <Menu></Menu> 
        </header>
        <nav><Nav></Nav></nav>

        <main>
          <Routes>
            <Route element={<ProtectedRoute/>}>
              <Route path="/" exact element={<Admin />} />
              <Route path="/SanPhamList" element={<SanPhamList />} />
              <Route path="/SanPhamThem" element={<SanPhamThem />} />
              <Route path="/admin/spsua/:id" element={<SanPhamSua />} />
              <Route path="/LoaiList" element={<LoaiList />} />
              <Route path="/LoaiThem" element={<LoaiThem />} />
              <Route path="/admin/loaisua/:id" element={<LoaiSua />} />
            </Route>

            <Route path="/dangnhap" element={<DangNhap />} />
            <Route path="/download" element={daDangNhap===true?<Download/>:<Navigate to="/dangnhap"/>} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
        <footer></footer>
      </div>
    </BrowserRouter>
  );
}
export default App;
