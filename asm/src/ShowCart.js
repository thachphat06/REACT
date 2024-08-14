import { useSelector, useDispatch } from "react-redux";
import { xoaSP, suaSL, xoaGH } from "./cartSlice"; // Import action xoaGH
import { Link } from "react-router-dom";

function ShowCart(props) {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.listSP);

    return (
        <div id="giohang">
            <h2>Giỏ hàng của bạn</h2>
            {cart.map((sp, index) => (
                <div key={index} className="cart-item">
                    <span className="cart-item-name">{sp.ten_sp}</span>
                    <input
                        type="number"
                        className="cart-item-quantity" min={1}
                        defaultValue={sp.so_luong}
                        onClick={e => dispatch(suaSL([sp.id, e.target.value]))}
                    />
                    <span className="cart-item-price">{Number(sp.gia).toLocaleString("vi")} VNĐ</span>
                    <span className="cart-item-total">{Number(sp.gia * sp.so_luong).toLocaleString("vi")} VNĐ</span>
                    <span className="cart-item-remove">
                        <a href="#!" onClick={() => dispatch(xoaSP(sp.id))}>Xóa</a>
                    </span>
                </div>
            ))}
            <div className="cart-footer">
                <Link to="/thanhtoan" className="cart-checkout">Thanh toán</Link>
                <button className="cart-clear" onClick={() => dispatch(xoaGH())}>Xóa toàn bộ giỏ hàng</button>
            </div>
        </div>
    );
}

export default ShowCart;
