import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function SanPhamList() {
    const [listSP, ganListSP] = useState([]);
    const xoaSP = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa?') === false) return false;
        fetch (`http://localhost:3000/admin/sp/${id}`, {method : "delete"})
            .then(res => res.json())
            .then(data => {
                ganListSP(prevListSP => prevListSP.filter(sp => sp.id !== id));
            });

    };
    useEffect(() => {
        fetch("http://localhost:3000/admin/sp")
            .then(res => res.json())
            .then(data => ganListSP(data))
    }, []);
    return (
        <section id="content">
            <main>
                <div class="table-data">
                    <div class="order">
                        <Link to={"/SanPhamThem"}><button id="toggleProductForm">Thêm sản phẩm</button></Link>
                        <h3>Sản Phẩm</h3>
                        <table>
                            <thead>
                                <tr className="sp" key={0}>
                                    <th>STT</th>
                                    <th>Ảnh Sản Phẩm</th>
                                    <th>Tên Sản Phẩm</th>
                                    <th>Giá</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            {Array.isArray(listSP) && listSP.map((sp, index) => (
                                <tr className="sp" key={sp.id_sp}>
                                    <td>{index + 1}</td>
                                    <td><img src={sp.hinh} alt="" /></td>
                                    <td>{sp.ten_sp}</td>
                                    <td>{sp.gia.toLocaleString('vi')} VNĐ</td>
                                    <td>
                                        <button class="status completed edit-btn"><Link to={"/admin/spsua/" + sp.id}>Sửa</Link></button>
                                        <button class="status completed delete-btn" onClick={() => xoaSP(sp.id)}>Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </table>
                        <div class="content">
                            <ul class="pagination">
                                <i class='bx bx-left-arrow-alt'></i>
                                <li><a href="#/">1</a></li>
                                <li><a href="#/">2</a></li>
                                <li><a href="#/">3</a></li>
                                <li><a href="#/">4</a></li>
                                <li><a href="#/">...</a></li>
                                <i class='bx bx-right-arrow-alt'></i>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </section >
    )
}

export default SanPhamList;
