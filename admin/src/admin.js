function Admin() {
    return (
        <section id="content">
        <main>
            <div class="head-title">
                <div class="left">
                    <h1>Dashboard</h1>
                    <ul class="breadcrumb">
                        <li>
                            <a href="#/">Dashboard</a>
                        </li>
                        <li><i class='bx bx-chevron-right' ></i></li>
                        <li>
                            <a class="active" href="#/">Trang chủ</a>
                        </li>
                    </ul>
                </div>
            </div>

            <ul class="box-info">
                <li>
                    <i class='bx bx-line-chart'></i>
                    <span class="text">
                        <h3>10.000.000VND</h3>
                        <p>Doanh thu</p>
                    </span>
                </li>
                <li>
                    <i class='bx bxl-product-hunt' ></i>
                    <span class="text">
                        <h3>8</h3>
                        <p>Tổng sản phẩm</p>
                    </span>
                </li>
                <li>
                    <i class='bx bxs-food-menu' ></i>
                    <span class="text">
                        <h3>Đơn hàng</h3>
                        <p>123</p>
                    </span>
                </li>
            </ul>


            <div class="table-data">
                <div class="order">
                    <div class="head">
                        <h3>Đơn hàng</h3>
                        <i class='bx bx-search' ></i>
                        <i class='bx bx-filter' ></i>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Khách hàng</th>
                                <th>Sản phẩm</th>
                                <th>Ngày đặt</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <img src="img/people.png" alt=""/>
                                        <p>Phát Huỳnh</p>
                                </td>
                                <td>Half Running Set</td>
                                <td>01-10-2021</td>
                                <td><span class="status completed">Đã giao</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="img/people.png" alt=""/>
                                        <p>Huỳnh Phát</p>
                                </td>
                                <td>Formal Men Lowers</td>
                                <td>01-10-2021</td>
                                <td><span class="status pending">Chờ xác nhận</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="img/people.png" alt=""/>
                                        <p>Thạch Phát</p>
                                </td>
                                <td>Half Running Suit</td>
                                <td>01-10-2021</td>
                                <td><span class="status process">Đang giao</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="img/people.png" alt=""/>
                                        <p>Thach Phat</p>
                                </td>
                                <td>Half Fancy Lady Dress</td>
                                <td>01-10-2021</td>
                                <td><span class="status pending">Chờ xác nhận</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="img/people.png" alt=""/>
                                        <p>huynh phat</p>
                                </td>
                                <td>Flix Flox Jeans</td>
                                <td>01-10-2021</td>
                                <td><span class="status completed">Hoàn thành</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </main>
        </section>
    )
}
export default Admin;
