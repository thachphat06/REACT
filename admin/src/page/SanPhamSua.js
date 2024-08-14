import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SanPhamSua() {
    let {id} = useParams();
    const [sp, ganSP] = useState();
    const navigate = useNavigate();
    useEffect( () =>{
        fetch(`http://localhost:3000/admin/sp/${id}`)
        .then ( res => res.json()).then ( data =>{
            ganSP(data);
            console.log("data", data);
            
        })
    } , [id])
    const submitDuLieu = () => {
        let url = `http://localhost:3000/admin/sp/${id}`;
        let opt = {
            method: "put",
            body: JSON.stringify(sp),
            headers: { 'Content-Type': 'application/json'}
        };
        fetch(url, opt)
            .then(res => res.json())
            .then(data => {
                alert('Đã cập nhật');
                navigate('/SanPhamList')
            })
    }
    return (
        <section id="content">  
            <main>
                <div class="table-data">
                            <form id="addProductForm">
                                <h2>Sửa Sản Phẩm</h2>
                                <label for="productImage">Ảnh sản phẩm:</label><br />
                                <input type="file" id="productImage" name="productImage" defaultValue={sp?.hinh} onChange={e => sp.hinh = URL.createObjectURL(e.target.files[0])} /><br />
                                <label for="productName">Tên Sản phẩm:</label><br />
                                <input type="text" id="productName" name="productName" defaultValue={sp?.ten_sp} onChange={e => sp.ten_sp = e.target.value} /><br />
                                <label for="productPrice">Giá sản phẩm:</label><br />
                                <input type="number" id="productPrice" name="productPrice" defaultValue={sp?.gia} onChange={e => sp.gia = e.target.value} /><br />
                                <button type="button" onClick={() => submitDuLieu()}>Sửa sản phẩm</button> &nbsp;
                            </form>
                        </div>
            </main>
        </section>
    )
}
export default SanPhamSua;
