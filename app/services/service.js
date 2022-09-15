function Service(){
    this.getListNguoiDung = function(){
        return axios({
            url: "https://6320b81c82f8687273a64f87.mockapi.io/api/users",
            method: "GET"
        })
    }

    this.postNguoiDung = function(product){
        return axios({
            url: "https://6320b81c82f8687273a64f87.mockapi.io/api/users",
            method: "POST",
            data: product
        })
    }

    this.deleteNguoiDung = function(id){
        return axios({
            url: "https://6320b81c82f8687273a64f87.mockapi.io/api/users/"+id,
            method: "DELETE"
        })
    }

    this.getNguoiDung = function(id){
        return axios({
            url: "https://6320b81c82f8687273a64f87.mockapi.io/api/users/"+id,
            method: "GET"
        })
    }

    this.putNguoiDung = function(user, id){
        return axios({
            url: `https://6320b81c82f8687273a64f87.mockapi.io/api/users/${id}`,
            method: "PUT",
            data: user
        })
    }
}