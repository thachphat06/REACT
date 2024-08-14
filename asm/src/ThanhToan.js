import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { xoaSP } from "./cartSlice";
import { useNavigate } from "react-router-dom";


function ThanhToan() {
    const dispatch = useDispatch();
    let htRef = React.createRef();
    let emRef = React.createRef();
    let dtRef = React.createRef();
    let dcRef = React.createRef();

    const cart = useSelector(state => state.cart.listSP);
    const navigate = useNavigate();

    const submitDuLieu = () => {
        let ht = htRef.current.value;
        let em = emRef.current.value;
        let dt = dtRef.current.value;
        let dc = dcRef.current.value;

        // Reset previous error messages
        document.getElementById('htError').textContent = '';
        document.getElementById('emError').textContent = '';
        document.getElementById('dtError').textContent = '';
        document.getElementById('dcError').textContent = '';

        // Validate form
        let isValid = true;

        if (ht === "") {
            document.getElementById('htError').textContent = 'Vui lòng nhập họ tên';
            isValid = false;
        }

        if (em === "") {
            document.getElementById('emError').textContent = 'Vui lòng nhập email';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(em)) {
            document.getElementById('emError').textContent = 'Email không hợp lệ';
            isValid = false;
        }

        if (dt === "") {
            document.getElementById('dtError').textContent = 'Vui lòng nhập số điện thoại';
            isValid = false;
        } else if (!/^\d{10}$/.test(dt)) {
            document.getElementById('dtError').textContent = 'Số điện thoại không hợp lệ';
            isValid = false;
        }

        if (dc === "") {
            document.getElementById('dcError').textContent = 'Vui lòng nhập địa chỉ';
            isValid = false;
        }

        if (cart.length === 0) {
            alert('Bạn chưa chọn sản phẩm nào');
            return;
        }

        if (!isValid) {
            return;
        }

        let url = "http://localhost:3000/luudonhang";
        let tt = { ho_ten: ht, email: em, dienthoai: dt, diachi: dc };

        var opt = {
            method: "post",
            body: JSON.stringify(tt),
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(url, opt)
            .then(res => res.json())
            .then(data => {
                if (data.id_dh < 0) {
                    console.log("Lỗi lưu đơn hàng", data);
                } else {
                    const id_dh = data.id_dh;
                    alert("Lưu đơn hàng thành công");
                    navigate("/")
                    luuchitietdonhang(id_dh, cart);
                }
            })
            .catch(error => {
                console.error('Lỗi lưu đơn hàng:', error);
            });
    };

    const luuchitietdonhang = (id_dh, cart) => {
        const url = "http://localhost:3000/luugiohang";
        cart.forEach(sp => {
            let t = {
                id_dh: id_dh,
                id_sp: sp.id,
                so_luong: sp.so_luong
            };

            let opt = {
                method: "post",
                body: JSON.stringify(t),
                headers: { 'Content-Type': 'application/json' }
            };

            fetch(url, opt)
                .then(res => res.json())
                .then(data => luuxongsp(data))
                .catch(err => console.log('Lỗi lưu sp', sp));
        });
    };

    const luuxongsp = (data) => {
        console.log(data);
        dispatch(xoaSP(data.id_sp));
    };

    return (
        <form id="frmthanhtoan">
            <h2>Thanh toán đơn hàng</h2>
            <div>
                <label>Họ tên</label>
                <input ref={htRef} type="text" id="ht" />
                <span id="htError" style={{ color: 'red' }}></span>
            </div>
            <div>
                <label>Email</label>
                <input ref={emRef} type="email" id="em" />
                <span id="emError" style={{ color: 'red' }}></span>
            </div>
            <div>
                <label>Số điện thoại</label>
                <input ref={dtRef} type="telephone" id="dt" />
                <span id="dtError" style={{ color: 'red' }}></span>
            </div>
            <div>
                <label>Địa chỉ</label>
                <input ref={dcRef} type="text" id="dc" />
                <span id="dcError" style={{ color: 'red' }}></span>
            </div>
            <div>
                <button onClick={() => submitDuLieu()} type="button">Lưu đơn hàng</button>
            </div>
        </form>
    );
}

export default ThanhToan;
