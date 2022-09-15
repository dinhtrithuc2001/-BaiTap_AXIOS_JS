var service = new Service();
var validation = new Validation();
var dsnd = new DanhSachNguoiDung();

function getEle(id) {
  return document.getElementById(id);
}

function fetchData() {
  getEle("loader").style.display = "block";
  service
    .getListNguoiDung()
    .then((result) => {
      renderHTML(result.data);
      dsnd.array = result.data;
      getEle("loader").style.display = "none";
    })
    .catch((error) => {
      console.log(error);
    });
}
fetchData();
function renderHTML(data) {
  var content = "";

  data.forEach((user, index) => {
    content += `<tr>
        <td>${index + 1}</td>
        <td>${user.taiKhoan}</td>
        <td>${user.matKhau}</td>
        <td>${user.hoTen}</td>
        <td>${user.email}</td>
        <td>${user.ngonNgu}</td>
        <td>${user.loaiND}</td>
        <td>
          <button data-toggle="modal" data-target="#myModal" class="btn btn-success" onclick="editUser(${
            user.id
          })">Edit</button>
          <button onclick="deleteUser(${
            user.id
          })" class="btn btn-danger">Delete</button>
        </td>
      </tr>`;
  });

  getEle("tblDanhSachNguoiDung").innerHTML = content;
}

getEle("btnThemNguoiDung").addEventListener("click", () => {
  resetValidation();
  getEle("TaiKhoan").disabled = false;
  document.getElementsByClassName("modal-title")[0].innerHTML = "Add User";
  resertModal();
  var btnAdd = `<button onclick="addUser()" class="btn btn-success">Add</button>`;
  document.querySelector(".modal-footer").innerHTML = btnAdd;
});
function layThongTinNguoiDung(isAdd) {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var loaiNN = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  var isValid = true;
  // validation tai khoan
  if(isAdd){
    isValid &=
    validation.kiemTraRong(
      taiKhoan,
      "tbTaiKhoan",
      "(*) Tài khoản không được để trống"
    ) &&
    validation.kiemTraTaiKhoanTonTai(
      taiKhoan,
      "tbTaiKhoan",
      "(*) Tên tài khoản đã tồn tại"
    );
  }
  // validation ho ten
  isValid &=
    validation.kiemTraRong(hoTen, "tbHoTen", "(*) Họ tên không để trống") &&
    validation.kiemTraHoTen(
      hoTen,
      "tbHoTen",
      "(*) Họ tên không được chứa số và ký tự đặc biệt"
    );

  // validation mat khau
  isValid &=
    validation.kiemTraRong(
      matKhau,
      "tbMatKhau",
      "(*) Mật khẩu không để trống"
    ) &&
    validation.kiemTraPassWord(
      matKhau,
      "tbMatKhau",
      "(*) Mật khẩu phải chứa ít nhất 1 ký tự hoa ký tự đặc biệt và ký tự số"
    ) &&
    validation.kiemTraDoDaiKyTu(
      matKhau,
      "tbMatKhau",
      "(*) Mật khẩu phải có độ dài 6 - 8",
      6,
      8
    );
  // validatioon Email
  isValid &= validation.kiemTraRong(email, "tbEmail", "(*) Email ko để trống") && validation.checkEmail(email, "tbEmail","(*) Email sai định dạng");

  // validation hinh anh
  isValid &= validation.kiemTraRong(hinhAnh, "tbHinhAnh", "(*)Hình ảnh ko để trống");

  // validation mo ta
  isValid &= validation.kiemTraRong(moTa, "tbMoTa", "(*)Mô tả ko để trống") && validation.kiemTraDoDaiKyTu(moTa,"tbMoTa","(*) Ký tự vượt quá 60",1,60);


  // validation loai nguoi dung
  isValid &= validation.checkSelectOption("loaiNguoiDung","tbLoaiND","(*) Loai người dùng chưa chọn");
  // validation ngon ngu
  isValid &= validation.checkSelectOption("loaiNgonNgu","tbLoaiNN","(*) Loai ngôn ngữ chưa chọn");
  if (!isValid) return null;

  var nguoiDung = new NguoiDung(
    "",
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    loaiNN,
    moTa,
    hinhAnh
  );

  return nguoiDung;
}
function resertModal() {
  getEle("TaiKhoan").value = "";
  getEle("HoTen").value = "";
  getEle("MatKhau").value = "";
  getEle("Email").value = "";
  getEle("HinhAnh").value = "";
  getEle("loaiNguoiDung").value = "Chọn loại người dùng";
  getEle("loaiNgonNgu").value = "Chọn ngôn ngữ";
  getEle("MoTa").value = "";
}
function addUser() {
  var user = layThongTinNguoiDung(true);
  console.log(user);
  if (user) {
    service
      .postNguoiDung(user)
      .then(() => {
        fetchData();
        document.getElementsByClassName("close")[0].click();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function deleteUser(id) {
  service
    .deleteNguoiDung(id)
    .then(() => {
      fetchData();
    })
    .catch((error) => {
      console.log(error);
    });
}

function editUser(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Update User";
  var btnUpdate = `<button onclick="updateUser(${id})" class="btn btn-warning">Update</button>`;
  document.querySelector(".modal-footer").innerHTML = btnUpdate;
  getEle("TaiKhoan").disabled = true;
  resetValidation();

  service.getNguoiDung(id).then((result) => {
    getEle("TaiKhoan").value = result.data.taiKhoan;
    getEle("HoTen").value = result.data.hoTen;
    getEle("MatKhau").value = result.data.matKhau;
    getEle("Email").value = result.data.email;
    getEle("HinhAnh").value = result.data.hinhAnh;
    getEle("loaiNguoiDung").value = result.data.loaiND;
    getEle("loaiNgonNgu").value = result.data.ngonNgu;
    getEle("MoTa").value = result.data.moTa;
  });
}

function updateUser(id) {
  var nguoiDung = layThongTinNguoiDung(false);
  if(nguoiDung){
    service
    .putNguoiDung(nguoiDung, id)
    .then(() => {
      fetchData();
      document.getElementsByClassName("close")[0].click();
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

function resetValidation(){
    getEle("tbTaiKhoan").style.display = "none";
    getEle("tbHoTen").style.display = "none";
    getEle("tbEmail").style.display = "none";
    getEle("tbMatKhau").style.display = "none";
    getEle("tbHinhAnh").style.display = "none";
    getEle("tbLoaiND").style.display = "none";
    getEle("tbLoaiNN").style.display = "none";
    getEle("tbMoTa").style.display = "none";
}

