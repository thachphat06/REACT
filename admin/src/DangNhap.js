import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dalogin } from "./authSlice";
function DangNhap() {
    let unRef = React.createRef();
    let pwRef = React.createRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitDuLieu = () => {
        if (unRef.current.value === "" || pwRef.current.value === "") {
            alert("Vui lòng nhập đủ thông tin"); return;
        }
        let url = "http://localhost:3000/login";
        let tt = { un: unRef.current.value, pw: pwRef.current.value }
        var opt = {
            method: "post",
            body: JSON.stringify(tt),
            headers: { 'Content-Type': 'application/json' }
        }
        fetch(url, opt).then(res => res.json()).then(data => {
            console.log(data);
            dispatch(dalogin(data))
            navigate('/')
        });
    }
    return (
        <section id="content1">  
            <main>
                <div class="table-data">

        <form id="frmlogin" className="col-7 m-auto border border-primary">
            <h2 className="bg-info h5 p-2">Thành viên đăng nhập</h2>
            <div className="m-3">
                Tên Đăng Nhập:<input className="form-control" type="text" ref={unRef} />
            </div>
            <div className="m-3">
                Mật khẩu:<input className="form-control" type="password" ref={pwRef} />
            </div>
            <div className="m-3">
                <button type="button" onClick={() => submitDuLieu()} className="btn btn-info">
                    Đăng nhập
                </button>

            </div>
        </form>
        </div>
            </main>
        </section>
    )
};
export default DangNhap;