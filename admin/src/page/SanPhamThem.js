import { useNavigate } from "react-router-dom";
function SanPhamThem() {
    let sp = {};
    const navigate = useNavigate();
    const submitDuLieu = () => {
        let url = `http://localhost:3000/admin/sp`;
        let opt = {
            method: "post",
            body: JSON.stringify(sp),
            headers: { 'Content-Type': 'application/json'}
        };
        fetch(url, opt)
            .then(res => res.json())
            .then(data => {
                alert('Đã thêm');
                navigate('/SanPhamList');
            })
    }
    return (
        <section id="content">  
            <main>
                <div class="table-data">
                            <form id="addProductForm">
                                <h2>Thêm Sản Phẩm</h2>
                                <label for="productImage">Ảnh sản phẩm:</label><br />
                                <input type="file" id="productImage" name="productImage" onChange={e => sp.hinh = URL.createObjectURL(e.target.files[0])} /><br />
                                <label for="productName">Tên Sản phẩm:</label><br />
                                <input type="text" id="productName" name="productName" onChange={e => sp.ten_sp = e.target.value} /><br />
                                <label for="productPrice">Giá sản phẩm:</label><br />
                                <input type="number" id="productPrice" name="productPrice" onChange={e => sp.gia = e.target.value} /><br />
                                <button type="button" onClick={() => submitDuLieu()}>Thêm sản phẩm</button> &nbsp;
                            </form>
                        </div>
            </main>
        </section>
    )
}
export default SanPhamThem;
