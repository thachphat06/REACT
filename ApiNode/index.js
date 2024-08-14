const mysql = require('mysql');
const exp = require("express");
const app = exp();
const jwt = require("node-jsonwebtoken");
const fs = require("fs");
const PRIVATE_KEY = fs.readFileSync("private-key.txt");
var cors = require('cors');
const { adminAuth } = require('./adminAuth');
app.use([exp.json()]);

const corsOpt = {
    origin: "*",
    methods: "GET, PUT, POST, DELETE",
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use(cors(corsOpt));

const db = mysql.createConnection({
    host: 'localhost', user: 'root', password: '', port: 3306, database: 'laptop_react'
});
db.connect(err => { if (err) throw err; console.log('Da ket noi database') });

// nơi định nghĩa các đường route
//api sản phẩm mới
app.get('/spmoi/:sosp?', function (req, res) {
    let sosp = parseInt(req.params.sosp || 6);
    if (sosp <= 1) sosp = 6;
    let sql = `SELECT id, ten_sp, gia, gia_km, hinh, ngay, luot_xem
    FROM san_pham WHERE an_hien = 1 ORDER BY ngay desc LIMIT 0, ? `;
    db.query(sql, sosp, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy list sp", err })
        else res.json(data);
    });
});
//api chi tiết 1 sp
app.get('/sp/:id', function (req, res) {
    let id = parseInt(req.params.id || 0);
    if (isNaN(id) || id <= 0) {
        res.json({ "thong bao": "Không biết sản phẩm", "id": id }); return;
    }
    let sql = `SELECT id, ten_sp, gia, gia_km, hinh, ngay, luot_xem
    FROM san_pham WHERE id = ?`
    db.query(sql, id, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy 1 sp", err })
        else res.json(data[0]);
    });
});
// api sản phẩm trong loại
app.get('/sptrongloai/:id_loai', function (req, res) {
    let id_loai = parseInt(req.params.id_loai);
    if (isNaN(id_loai) || id_loai <= 0) {
        res.json({ "thong bao": "Không biết loại", "id_loai": id_loai }); return;
    }
    let sql = `SELECT id, ten_sp, gia, gia_km, hinh, ngay
    FROM san_pham WHERE id_loai= ? AND an_hien = 1 ORDER BY id desc`;
    db.query(sql, id_loai, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy sp trong loại", err })
        else res.json(data);
    });
});
// api lấy thông tin 1 loại
app.get('/loai/:id_loai', function (req, res) {
    let id_loai = parseInt(req.params.id_loai);
    if (isNaN(id_loai) || id_loai <= 0) {
        res.json({ "thong bao": "Không biết loại", "id_loai": id_loai }); return;
    }
    let sql = `SELECT id, ten_loai FROM loai WHERE id= ? `;
    db.query(sql, id_loai, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy loại", err })
        else res.json(data[0]);
    });
});

//menu
app.get("/loai", function (req, res) {
    let sql = `SELECT *
    FROM loai ORDER BY id desc`;
    db.query(sql, (err, data) => {
        if (err) res.json({ thongbao: "Lỗi lấy loai", err });
        else res.json(data);
    });
});
//luudonhang
app.post('/luudonhang/', function (req, res) {
    let data = req.body;
    let sql = `INSERT INTO don_hang SET ? `;
    db.query(sql, data, function (err, data) {
        if (err) res.json({ "id_dh": -1, "thongbao": "Lỗi lưu đơn hàng", err })
        else {
            id_dh = data.insertId
            res.json({ "id_dh": id_dh, "thongbao": "Đã lưu đơn hàng", err })
        }
    });
});
//luugiohang
app.post('/luugiohang/', function (req, res) {
    let data = req.body;
    let sql = `INSERT INTO don_hang_chi_tiet SET ? `;
    db.query(sql, data, function (err, d) {
        if (err) res.json({ "thongbao": "Lỗi lưu sp", err })
        else res.json({ "thongbao": "Đã lưu sp và db", "id_sp": data.id_sp });
    });
});

//sp lienquan
app.get("/splienquan/:id", function (req, res) {
    let id = parseInt(req.params.id || 0);
    if (isNaN(id) || id <= 0) {
        res.json({ "thong bao": "Không biết sản phẩm", id: id });
        return;
    }

    // Đầu tiên, lấy id_loai của sản phẩm có id đã cho
    let categorySql = `SELECT id_loai FROM san_pham WHERE id = ?`;
    db.query(categorySql, id, (err, data) => {
        if (err) {
            res.json({ thongbao: "Lỗi lấy id_loai", err });
            return;
        }
        if (!data[0]) {
            res.json({ thongbao: "Không tìm thấy sản phẩm" });
            return;
        }
        let id_loai = data[0].id_loai;
        // Lấy các sản phẩm liên quan theo id_loai
        let relatedSql = `SELECT *
                            FROM san_pham 
                            WHERE id_loai = ? AND id != ?`;

        db.query(relatedSql, [id_loai, id], (relatedErr, relatedData) => {
            if (relatedErr) {
                res.json({
                    thongbao: "Lỗi lấy sản phẩm liên quan",
                    relatedErr,
                });
            } else {
                res.json(relatedData);
            }
        });
    });
});

// ADMIN///////////////////////////////////////////////////////////////////////////////////////

// dssp
app.get('/admin/sp', function (req, res) {
    let sql = `SELECT id, ten_sp, gia, hinh, ngay, luot_xem FROM san_pham ORDER BY id desc`;
    db.query(sql, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy list sp", err })
        else res.json(data);
    });
});
//chitietsp
app.get('/admin/sp/:id', function (req, res) {
    let id = parseInt(req.params.id);
    if (id <= 0) {
        res.json({ "thongbao": "Không biết sản phẩm", "id": id }); return;
    }
    let sql = 'SELECT * FROM san_pham WHERE id= ? '
    db.query(sql, id, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi lấy 1 sp", err })
        else res.json(data[0]);
    });
});
//add sp
app.post('/admin/sp', function (req, res) {
    let data = req.body;
    let sql = 'INSERT INTO san_pham SET ?';
    db.query(sql, data, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi chèn 1 sp", err })
        else res.json({ "thongbao": "Đã chèn 1 sp", "id": data.insertId });
    });
});
//update sp
app.put('/admin/sp/:id', function (req, res) {
    let data = req.body;
    let id = req.params.id;
    let sql = 'UPDATE san_pham SET ? WHERE id = ?';
    db.query(sql, [data, id], (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi cập nhật sp", err })
        else res.json({ "thongbao": "Đã cập nhật sản phẩm" });
    });
});
//delete sp
app.delete('/admin/sp/:id', function (req, res) {
    let id = req.params.id;
    let sql = 'DELETE FROM san_pham WHERE id = ?';
    db.query(sql, id, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi xóa sp", err })
        else res.json({ "thongbao": "Đã xóa sản phẩm" });
    });
});
//login
app.post("/login", function (req, res) {
    const un = req.body.un;
    const pw = req.body.pw;
    if (checkUserPass(un, pw) == true) {
        const userInfo = getUserInfo(un);
        const jwtBearToken = jwt.sign({},
            PRIVATE_KEY, { algorithm: "RS256", expiresIn: 120, subject: userInfo.id }
        );
        res.status(200).json({ token: jwtBearToken, expiresIn: 120, userInfo: userInfo })
    }
    else res.status(401).json({ thongbao: "Đăng nhập thất bại" });
})
const checkUserPass = (un, pw) => {
    if (un == "aa" && pw == "123") return true;
    if (un == "bb" && pw == "321") return true;
    return false;
}
const getUserInfo = (username) => {
    if (username = "aa") return { "id": "1", "hoten": "Nguyễn Văn Tèo" };
    if (username = "bb") return { "id": "2", "hoten": "Nguyễn Thị Lượm" };
    return { "id": "-1", "hoten": "" };
}
// dsloai
app.get('/admin/loai', function (req, res) {
    let sql = `SELECT id, ten_loai, thu_tu, an_hien FROM loai ORDER BY id desc`;
    db.query(sql, (err, data) => {
        if (err) {
            res.json({ "thongbao": "Lỗi lấy list loại", err });
        } else {
            const modifiedData = data.map(item => ({
                ...item,
                an_hien: item.an_hien === 1 ? "Đang hiện" : "Đang ẩn"
            }));
            res.json(modifiedData);
        }
    });
});

// chitietloai
app.get('/admin/loai/:id', function (req, res) {
    let id = parseInt(req.params.id);
    if (id <= 0) {
        res.json({ "thongbao": "Không biết loai", "id": id });
        return;
    }
    let sql = 'SELECT * FROM loai WHERE id= ? ';
    db.query(sql, id, (err, data) => {
        if (err) {
            res.json({ "thongbao": "Lỗi lấy 1 loại", err });
        } else {
            if (data.length > 0) {
                const item = data[0];
                item.an_hien = item.an_hien === 1 ? "Đang hiện" : "Đang ẩn";
                res.json(item);
            } else {
                res.json({ "thongbao": "Không tìm thấy loại" });
            }
        }
    });
});

// add loai
app.post('/admin/loai', function (req, res) {
    let data = req.body;
    // Convert an_hien to number
    data.an_hien = data.an_hien === "đang hiện" ? 1 : 0;
    let sql = 'INSERT INTO loai SET ?';
    db.query(sql, data, (err, result) => {
        if (err) res.json({ "thongbao": "Lỗi chèn 1 loại", err });
        else res.json({ "thongbao": "Đã chèn 1 loại", "id": result.insertId });
    });
});

// update loai
app.put('/admin/loai/:id', function (req, res) {
    let data = req.body;
    let id = req.params.id;
    // Convert an_hien to number
    data.an_hien = data.an_hien === "đang hiện" ? 1 : 0;
    let sql = 'UPDATE loai SET ? WHERE id = ?';
    db.query(sql, [data, id], (err, result) => {
        if (err) res.json({ "thongbao": "Lỗi cập nhật loại", err });
        else res.json({ "thongbao": "Đã cập nhật loại" });
    });
});

//delete loai
app.delete('/admin/loai/:id', function (req, res) {
    let id = req.params.id;
    let sql = 'DELETE FROM loai WHERE id = ?';
    db.query(sql, id, (err, data) => {
        if (err) res.json({ "thongbao": "Lỗi xóa loại", err })
        else res.json({ "thongbao": "Đã xóa loại" });
    });
});

app.listen(3000, () => console.log(`Ung dung dang chay voi port 3000`));
