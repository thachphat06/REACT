import React, { useEffect, useState } from "react";
// import { listloai } from "./data";
import { Link } from "react-router-dom";
function Menu() {
        const [loai, ganLoai] = useState([]);
        useEffect(() => {
                fetch(`http://localhost:3000/loai`)
                        .then(res => res.json())
                        .then(data => ganLoai(data));
        }, [])
        return (<ul>
                <li> <Link to={"/"}> Home </Link>  </li>
                {loai.map((loai, i) =>
                        <li key={i}> <Link to={"/loai/" + loai.id} > {loai.ten_loai} </Link> </li>
                )//map
                }
                <li> <Link to="/gioithieu" > Giới thiệu </Link> </li>
                <li> <Link to= "/showcart" > Cart </Link> </li>
        </ul>)
}
export default Menu;
