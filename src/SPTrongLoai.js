import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { themSP } from "./cartSlice";
function SPTrongLoai() {
    let { id_loai } = useParams();
    const [list_sp, ganListSP] = useState([]);
    const [loai, ganLoai] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        fetch(`http://localhost:3000/sptrongloai/${id_loai}`)
            .then(res => res.json()).then(data => ganListSP(data));
        fetch(`http://localhost:3000/loai/${id_loai}`)
            .then(res => res.json()).then(data => ganLoai(data));
    }, [id_loai]);
    return (
        <div id="listsp">
            <h1> Các sản phẩm trong loại {loai['ten_loai']}</h1>
            <PhanTrang listSP={list_sp} pageSize={8} />
        </div>

    );
}
function PhanTrang({ listSP, pageSize }) {
    const [fromIndex, setfromIndex] = useState(0);
    const toIndex = fromIndex + pageSize;
    const spTrong1Trang = listSP.slice(fromIndex, toIndex);
    const tongSoTrang = Math.ceil(listSP.length / pageSize);
    const chuyenTrang = (event) => {
        const newIndex = (event.selected * pageSize) % listSP.length;
        setfromIndex(newIndex);
    };
    return (
        <div> <HienSPTrongMotTrang spTrongTrang={spTrong1Trang} />
            <ReactPaginate nextLabel=">" previousLabel="<" pageCount={tongSoTrang}
                pageRangeDisplayed={5} onPageChange={chuyenTrang} className="thanhphantrang"
            />
        </div>);
}//PhanTrang
function HienSPTrongMotTrang({ spTrongTrang }) {
    return (<div id="data">
        {spTrongTrang.map((sp, index) => {
            return (
                <div className="sp" key={index}>
                    <h4> <Link to={"/sp/" + sp.id} > {sp['ten_sp']} </Link> </h4>
                    <img src={sp['hinh']} alt={sp['ten_sp']} />
                    <p> <a href="#" onClick={ ()=> dispatch(themSP(sp))}>Thêm vào giỏ hàng</a> </p>
                </div>
            )
        })//map
        }
    </div>);
} //HienSPTrongMotTrang


export default SPTrongLoai;
