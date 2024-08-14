import React from 'react';
import './App.css';
import Menu from './Menu';
import Home from './Home';
import SanPhamXemNhieu from './SanPhamXemNhieu';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChiTiet from './ChiTiet';
import SPTrongLoai from './SPTrongLoai';
import Timkiem from './TimKiem';
import NotFound from './NotFound';
import GioiThieu from './GioiThieu';
import ShowCart from './ShowCart';
import ThanhToan from './ThanhToan';

var sotin = 12;

function App() {
  return (
    <BrowserRouter basename="/">
      <nav><Menu /></nav>
      <div className='container'>
        <main className='d-flex'>
          <div className='col-md-9'>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/gioithieu" element={<GioiThieu />} />
              <Route path="/sp/:id" element={<ChiTiet />} />
              <Route path="/loai/:id_loai" element={<SPTrongLoai />} />
              <Route path="/timkiem/" element={<Timkiem />} />
              <Route path="/showcart/" element={<ShowCart />} />
              <Route path="/thanhtoan/" element={<ThanhToan/>} />
              <Route element={<NotFound />} />
            </Routes>
          </div>
          <aside className='col-md-3'>
            <SanPhamXemNhieu sotin={sotin} />
          </aside>
        </main>
        <footer><p>Huỳnh Nguyễn Thạch Phát</p></footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
