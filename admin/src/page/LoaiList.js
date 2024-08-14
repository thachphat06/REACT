import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function LoaiList() {
    const [listLoai, ganListLoai] = useState([]);
    const xoaLoai = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa?') === false) return false;
        fetch (`http://localhost:3000/admin/loai/${id}`, {method : "delete"})
            .then(res => res.json())
            .then(data => {
                ganListLoai(prevListLoai => prevListLoai.filter(loai => loai.id !== id));
            });

    };
    useEffect(() => {
        fetch("http://localhost:3000/admin/loai")
            .then(res => res.json())
            .then(data => ganListLoai(data))
    }, []);
    return (
        <section id="content">
            <main>
                <div class="table-data">
                    <div class="order">
                        <Link to={"/LoaiThem"}><button id="toggleProductForm">Thêm Loại</button></Link>
                        <h3>Danh Mục</h3>
                        <table>
                            <thead>
                                <tr className="loai" key={0}>
                                    <th>STT</th>
                                    <th>Tên Danh Mục</th>
                                    <th>Thứ tự</th>
                                    <th>Ẩn hiện</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            {Array.isArray(listLoai) && listLoai.map((loai, index) => (
                                <tr className="loai" key={loai.id_loai}>
                                    <td>{index + 1}</td>
                                    <td>{loai.ten_loai}</td>
                                    <td>{loai.thu_tu}</td>
                                    <td>{loai.an_hien}</td>
                                    <td>
                                        <button class="status completed edit-btn"><Link to={"/admin/loaisua/" + loai.id}>Sửa</Link></button>
                                        <button class="status completed delete-btn" onClick={() => xoaLoai(loai.id)}>Xóa</button>
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

export default LoaiList;
