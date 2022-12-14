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
      "(*) T??i kho???n kh??ng ???????c ????? tr???ng"
    ) &&
    validation.kiemTraTaiKhoanTonTai(
      taiKhoan,
      "tbTaiKhoan",
      "(*) T??n t??i kho???n ???? t???n t???i"
    );
  }
  // validation ho ten
  isValid &=
    validation.kiemTraRong(hoTen, "tbHoTen", "(*) H??? t??n kh??ng ????? tr???ng") &&
    validation.kiemTraHoTen(
      hoTen,
      "tbHoTen",
      "(*) H??? t??n kh??ng ???????c ch???a s??? v?? k?? t??? ?????c bi???t"
    );

  // validation mat khau
  isValid &=
    validation.kiemTraRong(
      matKhau,
      "tbMatKhau",
      "(*) M???t kh???u kh??ng ????? tr???ng"
    ) &&
    validation.kiemTraPassWord(
      matKhau,
      "tbMatKhau",
      "(*) M???t kh???u ph???i ch???a ??t nh???t 1 k?? t??? hoa k?? t??? ?????c bi???t v?? k?? t??? s???"
    ) &&
    validation.kiemTraDoDaiKyTu(
      matKhau,
      "tbMatKhau",
      "(*) M???t kh???u ph???i c?? ????? d??i 6 - 8",
      6,
      8
    );
  // validatioon Email
  isValid &= validation.kiemTraRong(email, "tbEmail", "(*) Email ko ????? tr???ng") && validation.checkEmail(email, "tbEmail","(*) Email sai ?????nh d???ng");

  // validation hinh anh
  isValid &= validation.kiemTraRong(hinhAnh, "tbHinhAnh", "(*)H??nh ???nh ko ????? tr???ng");

  // validation mo ta
  isValid &= validation.kiemTraRong(moTa, "tbMoTa", "(*)M?? t??? ko ????? tr???ng") && validation.kiemTraDoDaiKyTu(moTa,"tbMoTa","(*) K?? t??? v?????t qu?? 60",1,60);


  // validation loai nguoi dung
  isValid &= validation.checkSelectOption("loaiNguoiDung","tbLoaiND","(*) Loai ng?????i d??ng ch??a ch???n");
  // validation ngon ngu
  isValid &= validation.checkSelectOption("loaiNgonNgu","tbLoaiNN","(*) Loai ng??n ng??? ch??a ch???n");
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
  getEle("loaiNguoiDung").value = "Ch???n lo???i ng?????i d??ng";
  getEle("loaiNgonNgu").value = "Ch???n ng??n ng???";
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

