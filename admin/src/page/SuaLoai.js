import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function LoaiSua() {
    let {id} = useParams();
    const [loai, ganLoai] = useState();
    const navigate = useNavigate();
    useEffect( () =>{
        fetch(`http://localhost:3000/admin/loai/${id}`)
        .then ( res => res.json()).then ( data =>{
            data.an_hien = data.an_hien === 1 ? "Đang hiện" : "ẩn";
            ganLoai(data);
            console.log("data", data);
        })
    } , [id])
    const submitDuLieu = () => {
        let url = `http://localhost:3000/admin/loai/${id}`;
        let opt = {
            method: "put",
            body: JSON.stringify(loai),
            headers: { 'Content-Type': 'application/json'}
        };
        fetch(url, opt)
            .then(res => res.json())
            .then(data => {
                alert('Đã cập nhật');
                navigate('/LoaiList')
            })
    }
    return (
        <section id="content">  
            <main>
                <div class="table-data">
                            <form id="addProductForm">
                                <h2>Sửa Danh Mục</h2>
                                <label for="productName">Tên danh mục:</label><br />
                                <input type="text" id="productName" name="productName" defaultValue={loai?.ten_loai} onChange={e => loai.ten_loai = e.target.value} /><br />
                                <label for="productName">Thứ tự :</label><br />
                                <input type="text" id="productName" name="productName" defaultValue={loai?.thu_tu} onChange={e => loai.thu_tu = e.target.value} /><br />
                                <label for="productName">Ẩn hiện :</label><br />
                                <select id="visibility" name="an_hien" defaultValue={loai?.an_hien} onChange={e => loai.an_hien = e.target.value}>
                                    <option value="đang hiện">Đang hiện</option>
                                    <option value="ẩn">Ẩn</option>
                                </select><br />
                                <button type="button" onClick={() => submitDuLieu()}>Sửa danh mục</button> &nbsp;
                            </form>
                        </div>
            </main>
        </section>
    )
}
export default LoaiSua;
