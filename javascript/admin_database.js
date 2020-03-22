

function setTwoNumberDecimal(el) {
    el.value = parseFloat(el.value).toFixed(2);
};


function getProd(id) {

    console.log(id);

    let URL = "http://localhost:3000/getprod/" + id;
    console.log(URL);
    
    $.getJSON({
        url: URL,
        data: JSON.stringify({
            "id": id
        }),

        success: function (data) {
            console.log(data);
            fillModal(data);            

        },

    },
        function (data, status) {
            alert("Data: " + data + "\nStatus: " + status);
        });
};

function getProducts() {

    console.log('this function runs');

    //Fungerar med $.ajax om datatype och type är med
    $.getJSON({
        url: "http://localhost:3000/getproducts",

        // dataType: 'json',
        // type: 'GET',
        // headers: {
        //     "Content-Type": "application/json"

        // },

        success: function (data) {
            console.log(data);
            productArray = [];
            fillTable(data);

            for (let i = 0; i < data.length; i++) {
                let item = data[i];

                productArray[i] = item;
            }

        },
    },
        function (data, status) {
            alert("Data: " + data + "\nStatus: " + status);
        });
}

function updateProd() {

    let id = document.getElementById("prod_ID").value;
    let pname = document.getElementById("prod_pname").value;
    let desc = document.getElementById("prod_desc").value;
    let price = document.getElementById("prod_price").value;
    let img = document.getElementById("prod_img").value;
    let category = document.getElementById("prod_category").value;

    $.ajax({
        type: 'POST',
        url: "http://localhost:3000/updateproduct/",
        data: JSON.stringify({
            "id": id,
            "pname": pname,
            "description": desc,
            "price": price,
            "img": img,
            "category": category
        }),

        contentType: "application/json",

        dataType: "json",
        success: function (data) {
            getProducts();

        }
    },
        function (data, status) {
            alert("Data: " + data + "\nStatus: " + status);
        });
}



function deleteProd() {

    let id = document.getElementById("prod_ID").value;
    let answer = window.confirm("Are you sure you want to delete this product?");

    if (answer) {
        $.ajax({
            type: 'DELETE',
            url: "http://localhost:3000/deleteproduct/",
            data: JSON.stringify({
                "id": id,

            }),

            contentType: "application/json",

            dataType: "json",
            success: function (data) {

                getProducts();
                $('#modal_UpDel').modal('hide');

            }
        },
            function (data, status) {
                alert("Data: " + data + "\nStatus: " + status);
            });
    }

}


function addProduct() {

    let pname = document.getElementById("newProd_pname").value;
    let desc = document.getElementById("newProd_desc").value;
    let price = document.getElementById("newProd_price").value;
    let img = document.getElementById("newProd_img").value;
    let category = document.getElementById("newProd_category").value;

    $.ajax({
        type: 'POST',
        url: "http://localhost:3000/addproduct/",
        data: JSON.stringify({
            "pname": pname,
            "description": desc,
            "price": price,
            "img": img,
            "category": category
        }),

        contentType: "application/json",

        dataType: "json",
        success: function (data) {
            getProducts();
            document.getElementById("form_addProduct").reset();

        }
    },
        function (data, status) {
            alert("Data: " + data + "\nStatus: " + status);
        });
}




function fillTable(data) {

    let table = $("#tableBody");
    table.empty();
    let temp;

    for (let i = 0; i < data.length; i++) {

        temp = data[i];

        let row = document.createElement("tr");
        let th = document.createElement("th");
        th.setAttribute("scope", "row");

        let idLink = document.createElement("a");
        idLink.setAttribute("href", "#");
        idLink.setAttribute("id", temp.id);
        idLink.setAttribute("onClick", "getProd(this.id)");
        idLink.setAttribute("data-toggle", "modal");
        idLink.setAttribute("data-target", "#modal_UpDel");
        idLink.innerHTML = temp.id;
        th.append(idLink);

        let td_name = document.createElement("td");
        td_name.innerHTML = temp.pname;
        let td_desc = document.createElement("td");
        td_desc.innerHTML = temp.description;
        let td_price = document.createElement("td");
        td_price.innerHTML = temp.price;
        let td_img = document.createElement("td");
        td_img.innerHTML = temp.img;
        let td_cat = document.createElement("td");
        td_cat.innerHTML = temp.category;

        row.append(th);
        row.append(td_name);
        row.append(td_desc);
        row.append(td_price);
        row.append(td_img);
        row.append(td_cat);
        table.append(row);

    };

}

function fillModal(data) {

    let product = data;


    document.getElementById("prod_ID").value = product.id;
    document.getElementById("prod_pname").value = product.pname;
    document.getElementById("prod_price").value = product.price;
    document.getElementById("prod_desc").value = product.description;
    document.getElementById("prod_img").value = product.img;
    document.getElementById("prod_category").value = product.category;


}