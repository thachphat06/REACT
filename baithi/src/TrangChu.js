import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function TrangChu() {
    const [listsp, ganListSP] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/spmoi/9")
            .then(res => res.json()).then(data => ganListSP(data));
    }, []);
    return (
        <div className="home">
            {listsp.slice(0, 8).map((sp, i) => (
                <div className="sp" key={i}>
                    <h4><Link to={"/sp/" + sp.id} > {sp['ten_sp']} </Link></h4>
                    <img src={sp.hinh} alt={sp['ten_sp']}></img>
                    <p> <a href="#/">Thêm vào giỏ hàng</a> </p>
                </div>
            ))}
        </div>
    );
}

export default TrangChu;