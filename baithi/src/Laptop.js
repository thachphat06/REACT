import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
function Laptop() {
    let { id } = useParams();
    const [sp, ganSP] = useState([]);
    useEffect(() => {
        let url = `http://localhost:3000/sp/${id}`;
        fetch(url)
        .then(res => res.json())
        .then(data => ganSP(data))
    }, [id]);
    return (<div id='chitiet'>
        <div id="row1">
            <div id="trai"> <img src={sp['hinh']} alt={sp['ten_sp']} /> </div>
            <div id="phai">
                <h1 className="h3"> {sp['ten_sp']} </h1>
                <p><span>Giá gốc</span>: {Number(sp['gia']).toLocaleString("vi")} VNĐ</p>
                <p><span>Giá KM</span>: {Number(sp['gia_km']).toLocaleString("vi")} VNĐ</p>
                <p><span>Ngày</span>: {new Date(sp['ngay']).toLocaleString("vi-VN")}</p>
            </div>
        </div>
    </div>
    );
};
export default Laptop;
