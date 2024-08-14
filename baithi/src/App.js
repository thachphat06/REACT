import './App.css';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './Menu';
import TrangChu from './TrangChu';
import LienHe from './LienHe';
import Laptop from './Laptop';
import SanPhamXemNhieu from './SanPhamXemNhieu';
var sotin = 12;


function App() {
  return (
    <BrowserRouter basename="/">
      <header><Menu/></header>
      <div className='container'>
        <main className='d-flex'>
          <div className='col-md-9'>
            <Routes>
              <Route path="/" exact element={<TrangChu />} />
              <Route path="/lienhe" element={<LienHe />} />
              <Route path="/laptop/:id" element={<Laptop />} />
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
