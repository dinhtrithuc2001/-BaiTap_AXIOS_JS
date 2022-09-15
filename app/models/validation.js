function Validation(){
    this.kiemTraRong = (value, errorId, mess) => {
        if(value !== ""){
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML="";
            return true;
        }
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML=mess;
    }

    this.kiemTraTaiKhoanTonTai = (value, errorId, mess) => {
        var status = dsnd.array.some((nv) => {
            return value === nv.taiKhoan;
          });
          if (!status) {
            // true
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
          }
          // false
          getEle(errorId).style.display = "block";
          getEle(errorId).innerHTML = mess;
          return false;
    }

    this.kiemTraHoTen = (value, errorId, mess) => {
        var letterKyTu = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        
        if(value.match(letterKyTu)){
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML="";
            return true;
        }
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML=mess;
        return false;
    }

    this.kiemTraPassWord = (value, errorId, mess) => {
        var pass =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
        if (value.match(pass)) {
          // true
          getEle(errorId).style.display = "none";
          getEle(errorId).innerHTML = "";
          return true;
        }
        // false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
      };
    this.kiemTraDoDaiKyTu = function (value, errorId, mess, min, max) {
        if (value.length >= min && value.length <= max) {
          //true
          getEle(errorId).style.display = "none";
          getEle(errorId).innerHTML = "";
          return true;
        }
        // false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
      };

      this.checkEmail = (value, errorId, mess) => {
        var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(letter)) {
          // true
          getEle(errorId).style.display = "none";
          getEle(errorId).innerHTML = "";
          return true;
        }
        // false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
      };

      this.checkSelectOption = (selectId, errorId, mess) => {
        if (getEle(selectId).selectedIndex !== 0) {
          // true
          getEle(errorId).style.display = "none";
          getEle(errorId).innerHTML = "";
          return true;
        }
        // false
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
      };
}