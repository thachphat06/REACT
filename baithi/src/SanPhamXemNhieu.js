import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function SanPhamXemNhieu(props) {
    const [listSP, ganSP] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/spmoi/20`)
            .then(res => res.json())
            .then(data => ganSP(data));
    }, [])
    let spXemNhieu = listSP.sort((a,b) => b.luot_xem - a.luot_xem)
    let jsxcode =
        <div id="spxn">
            {spXemNhieu.slice(0, props.sotin).map((sp, i) =>
                <div className="sp" key={i}> <Link to={"/sp/" + sp.id} > {sp['ten_sp']} </Link></div>)}
        </div>
    return (jsxcode);
}
export default SanPhamXemNhieu;