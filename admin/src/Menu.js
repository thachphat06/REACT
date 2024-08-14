import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thoat } from "./authSlice";
function Menu() {
	const daDangNhap = useSelector( state => state.auth.daDangNhap)
	const dispatch = useDispatch();
	return (
		<section id="sidebar">
			<a href="#/" class="brand">
				<i class='bx bxs-smile'></i>
				<span class="text">Kumo</span>
			</a>
			<ul class="side-menu top">
				<li class="active">
					<Link to={"/"}>
						<i class='bx bxs-home'></i>
						<span class="text">Trang chủ</span>
					</Link>
				</li>
				<li>
					<Link to={"/SanPhamList"}>
						<i class='bx bxl-product-hunt' ></i>
						<span class="text">Sản phẩm</span>
					</Link>
				</li>
				<li>
				<Link to={"/LoaiList"}>
						<i class='bx bxl-product-hunt' ></i>
						<span class="text">Danh mục</span>
					</Link>
				</li>
				<li>
					<a href="#/">
						<i class='bx bxl-blogger' ></i>
						<span class="text">Tin tức</span>
					</a>
				</li>
				{ daDangNhap===false?
				<li>
					<Link to={"/dangnhap"}>
						<i class='bx bxs-user' ></i>
						<span class="text">Đăng nhập</span>
					</Link>
				</li>
				:
				<li>
					<a href="#/">
						<i class='bx bxs-user' ></i>
						<span class="text" onClick={()=> dispatch(thoat())}>Thoát</span>
					</a>
				</li> }
				<li>
					<a href="#/">
						<i class='bx bxs-food-menu'></i>
						<span class="text">Đơn hàng</span>
					</a>
				</li>
			</ul>
			<ul class="side-menu">
				<li>
					<a href="#/">
						<i class='bx bxs-cog' ></i>
						<span class="text">Cài đặt</span>
					</a>
				</li>
				<li>
					<a href="#/" class="logout">
						<i class='bx bxs-log-out-circle' ></i>
						<span class="text">Đăng xuất</span>
					</a>
				</li>
			</ul>
		</section>
	)
}
export default Menu;