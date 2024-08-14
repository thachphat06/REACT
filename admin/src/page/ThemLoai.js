import { useNavigate } from "react-router-dom";
function LoaiThem() {
    let loai = {};
    const navigate = useNavigate();
    const submitDuLieu = () => {
        let url = `http://localhost:3000/admin/loai`;
        let opt = {
            method: "post",
            body: JSON.stringify(loai),
            headers: { 'Content-Type': 'application/json'}
        };
        fetch(url, opt)
            .then(res => res.json())
            .then(data => {
                alert('Đã thêm');
                navigate('/LoaiList');
            })
    }
    return (
        <section id="content">  
            <main>
                <div class="table-data">
                            <form id="addProductForm">
                                <h2>Thêm Danh Mục</h2>
                                <label for="productName">Tên Danh Mục:</label><br />
                                <input type="text" id="productName" name="productName" onChange={e => loai.ten_loai = e.target.value} /><br />
                                <label for="productName">Thứ tự:</label><br />
                                <input type="text" id="productName" name="productName" onChange={e => loai.thu_tu = e.target.value} /><br />
                                <label for="productName">Ẩn hiện:</label><br />
                                <select id="visibility" name="an_hien" onChange={e => loai.an_hien = e.target.value}>
                                    <option value="đang hiện">Đang hiện</option>
                                    <option value="ẩn">Ẩn</option>
                                </select><br />
                                <button type="button" onClick={() => submitDuLieu()}>Thêm danh mục</button> &nbsp;
                            </form>
                        </div>
            </main>
        </section>
    )
}
export default LoaiThem;
