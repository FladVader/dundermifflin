let cart = [];

function trashItem(id) {

    let prodId = id.split("_").pop();


    for (let i = 0; i < cart.length; i++) {

        //letar upp produkten i arrayen
        if (prodId == cart[i].id) {

            //Tar bort produkten ur arrayen
            cart.splice(i, 1);
            //skriver över arrayen
            sessionStorage.setItem("sessionCart", JSON.stringify(cart));
            //uppdaterar tabellen
            createCartTable();
        }
    }


}

function changeQuantity(id) {

    //klipper ut produktens id ur strängen
    let prodId = id.split("_").pop();

    //hämtar värdet ur input-fältet
    let input = document.getElementById("changeQty_" + prodId);
    console.log(input.value);

    for (let i = 0; i < cart.length; i++) {

        //Letar upp produkten ur den sessionsparade arrayen
        if (prodId == cart[i].id) {

            //uppdaterar värdet
            cart[i].quantity = input.value;

            //Skriver över arrayen
            sessionStorage.setItem("sessionCart", JSON.stringify(cart));
            //uppdaterar tabellen
            createCartTable();
        }
    }
}


function createCartTable() {

    let sum = 0;
    let retrievedData = sessionStorage.getItem("sessionCart");
    cart = JSON.parse(retrievedData);
    let table = $("#tableBody");
    table.empty();

    for (let i = 0; i < cart.length; i++) {

        let temp = cart[i];
        console.log(temp);

        let row = document.createElement("tr");
        let th = document.createElement("th");
        th.setAttribute("scope", "row");

        let idLink = document.createElement("td");
        idLink.setAttribute("href", "#");
        idLink.setAttribute("id", temp.id);

        idLink.innerHTML = temp.pname;
        th.append(idLink);

        let td_name = document.createElement("td");
        td_name.innerHTML = "$" + temp.price;

        let td_qty = document.createElement("td");
        td_qty.innerHTML = "$" + (parseFloat(temp.quantity * temp.price).toFixed(2));

        let td_update = document.createElement("td");
        let input_update = document.createElement("input");
        input_update.setAttribute("class", "form-control");
        input_update.setAttribute("type", "number");
        input_update.setAttribute("min", "1");
        input_update.setAttribute("id", "changeQty_" + temp.id);
        input_update.value = temp.quantity;
        td_update.append(input_update)

        let td_confirm = document.createElement("td");
        let btn_confirm = document.createElement("button");
        btn_confirm.setAttribute("class", "btn btn-warning");
        btn_confirm.setAttribute("id", "btnCOnfirm_" + temp.id);
        btn_confirm.setAttribute("onClick", "changeQuantity(this.id)")
        btn_confirm.innerHTML = "Confirm";
        td_confirm.append(btn_confirm);

        let td_trash = document.createElement("td");
        let trashLink = document.createElement("a");
        trashLink.setAttribute("href", "#")
        trashLink.setAttribute("id", "trash_" + temp.id);
        trashLink.setAttribute("onClick", "trashItem(this.id)");
        let trashIcon = document.createElement("i");
        trashIcon.setAttribute("class", "fa fa-trash");

        trashLink.append(trashIcon);
        td_trash.append(trashLink)

        row.append(th);
        row.append(td_name);
        row.append(td_update);
        row.append(td_confirm);
        row.append(td_qty);

        row.append(td_trash);
        table.append(row);

        sum += (temp.quantity*temp.price)

    }
        console.log(sum);
         sum = parseFloat(sum).toFixed(2);
        document.getElementById("total_sum").innerHTML = "$" +  sum;
}