import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function ChiTiet() {
    let { id } = useParams();
    const [sp, ganSP] = useState([]);
    const [splienquan, ganSPLQ] = useState([]);
    useEffect(() => {
        let url = `http://localhost:3000/sp/${id}`;
        fetch(url).then(res => res.json()).then(data => ganSP(data))
        fetch(`http://localhost:3000/splienquan/${id}`)
            .then(res => res.json())
            .then(data => ganSPLQ(data));
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
        <div id="row2"> SP Liên quan
            <div className="home">
                {splienquan.slice(0, 8).map((sp, i) => (
                    <div className="sp" key={i}>
                        <h4><Link to={"/sp/" + sp.id} > {sp['ten_sp']} </Link></h4>
                        <img alt="" src={sp.hinh} ></img>
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
};
export default ChiTiet;
