
let productArray = [];
let cartArray = [];
let product;

function addToCart() {

    let prodCart = product;
    let found = false;
    let qty = document.getElementById("inputQty").value;
    let retrievedData = sessionStorage.getItem("sessionCart");
    productArray = JSON.parse(retrievedData);

    //Kollar om produkten redan finns i varukorgen
    if(productArray != null){
    for (let i = 0; i < productArray.length; i++) {

        let temp = productArray[i];
        if (prodCart.id == temp.id) {

            found = true;
            prodCart = temp;
        }
    }}
    //om produkten inte finns i varukorgen
    if (found == false) {
        //Lägger till attribut "quantity" till produkten
        prodCart.quantity = qty;

        if(cartArray == null) {
            cartArray = new Array;
        }

        cartArray.push(prodCart);
        //Skriver arrayen till lagring i session storage
        sessionStorage.setItem("sessionCart", JSON.stringify(cartArray));
        //Återställer kvantitets-fältet
        document.getElementById("inputQty").value = 1;
        clickCounter();
    }

    //Om produkten redan finns i varukorgen
    else {
        alert("Product is already in your shoppingcart! \n If you wish to change quantity, please view your shoppingcart!")
    }
};

//Styr räknaren på kundvagnen, sparas till Session Storage (tills man stänger fliken)
function clickCounter() {

    let retrievedData = sessionStorage.getItem("sessionCart");
    cartArray = JSON.parse(retrievedData);
    
    if (cartArray != null) {
        document.getElementById("cartCounter").innerHTML = cartArray.length;
    }

};

function getProducts() {



    // sessionStorage.setItem("sessionCart", JSON.stringify(cartArray));
    // cartArray = JSON.parse(retrievedData);

    clickCounter();



    //Fungerar med $.ajax om datatype och type är med
    $.getJSON({
        url: "http://localhost:3000/getproducts",

        // dataType: 'json',
        // type: 'GET',

        success: function (data) {
            handleResponse(data);

            for (let i = 0; i < data.length; i++) {
                let item = data[i];

                productArray[i] = item;
            }
            }
        },
    );
}

function getProd(id) {


    let URL = "http://localhost:3000/getprod/" + id;
    console.log(URL);

    $.getJSON({
        url: URL,
        data: JSON.stringify({
            "id": id
        }),

        success: function (data) {
            showModal(data);

        },

    },
        function (data, status) {
            alert("Data: " + data + "\nStatus: " + status);
        });
};


//Funktion för att bygga produkt-korten baserat på databasens innehåll
function handleResponse(response) {

    let carddeck = $("#all-cards");
    carddeck.empty();
    let cardrow = document.createElement("div");
    cardrow.setAttribute("class", "row");

    for (let i = 0; i < response.length; i++) {
        var item = response[i];

        let cardcolumn = document.createElement("div");
        cardcolumn.setAttribute("class", "col-sm-12 col-md-6 col-lg-4 ");
        cardcolumn.setAttribute("id", "cardCol");

        let card = document.createElement("div");
        card.setAttribute("class", "card");

        let cardimage = document.createElement("img");
        cardimage.setAttribute("class", "card-img-top");
        cardimage.setAttribute("src", "img/" + item.img);
        cardimage.setAttribute("style", "height: 400px;")

        let cardbody = document.createElement("div");
        cardbody.setAttribute("class", "card-body");

        let cardtitle = document.createElement("h5");
        cardtitle.setAttribute("class", "card-title");
        cardtitle.innerHTML += item.pname;

        var card_btn = document.createElement("a");
        card_btn.setAttribute("class", "btn btn-warning");
        //Sätter knappens ID till samma som produktens i databasen
        card_btn.setAttribute("id", item.id);
        //på klick så anropas getProd(), och knappens id skickas med
        card_btn.setAttribute("onClick", "getProd(this.id)");
        card_btn.setAttribute("data-toggle", "modal");
        card_btn.setAttribute("data-target", "#modal_prod");
        card_btn.innerHTML = "View";

        let cardtext = document.createElement("p");
        cardtext.setAttribute("class", "card-text");
        cardtext.innerHTML += item.description;

        cardbody.append(cardtitle);
        card.append(cardimage);
        cardbody.append(cardtext);
        cardbody.append(card_btn);
        card.append(cardbody);

        cardcolumn.append(card);
        cardrow.append(cardcolumn);
    }

    carddeck.append(cardrow);
}

//Funktion för att skriva ut produktens information till en Modal
function showModal(id) {
    product = id;

    document.getElementById("mod_title").innerHTML = product.pname;
    document.getElementById("mod_description").innerHTML = product.description;
    document.getElementById("mod_price").innerHTML = "$" + product.price;

    var modImg = document.getElementById("mod_img");
    modImg.setAttribute("src", "img/" + product.img);
    modImg.setAttribute("style", "height: 15em;");


}
