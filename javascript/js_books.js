window.onload = function () {

    document.getElementById('searchBtn').addEventListener('click', bookSearch, false);
    
}

function bookSearch() {

    console.log('this function runs');
    var search = document.getElementById('search').value;
    document.getElementById('parent').innerHTML = "";
    console.log(search);

    //Fungerar med $.ajax om datatype och type är med
    $.getJSON({
        url: 'https://www.googleapis.com/books/v1/volumes?q=' + search + "&maxResults=40",
        // dataType: 'json',
        // type: 'GET',

        success: function (data) {
            console.log(data);
            handleResponse(data);
        },
    });
}

function handleResponse(response) {

    document.getElementById("counter").innerHTML = response.items.length;

    for (var i = 0; i < response.items.length; i++) {
        var item = response.items[i];

        var newCol = document.createElement("div");
        newCol.setAttribute("Class", "col-sm-6 col-md-4 col-lg-3")
        newCol.setAttribute("style", "padding-bottom: 1em")

        var newCard = document.createElement("div");
        newCard.setAttribute("class", "card shadow card_space");

        var new_cardBody = document.createElement("div");
        new_cardBody.setAttribute("class", "card-body");

        var card_img = document.createElement("img");
        card_img.setAttribute("class", "card-top");
        card_img.setAttribute("src", item.volumeInfo.imageLinks.thumbnail);
        card_img.setAttribute("style",  "max-width: 300px; height: 250px; padding: 1em")
        card_img.setAttribute("id", "cardImg")

        var title_div = document.createElement("div");
        title_div.setAttribute("style", "height: 80px; overflow: auto")

        var card_title = document.createElement("h5");
        card_title.setAttribute("class", "card-title");
        
        card_title.innerHTML = item.volumeInfo.title;

        var card_text = document.createElement("p");
        card_text.setAttribute("class", "card-text");
        card_text.innerHTML = item.volumeInfo.authors;

        var card_btn = document.createElement("a");
        card_btn.setAttribute("class", "btn btn-warning");
        card_btn.innerHTML = "Read More";

        title_div.appendChild(card_title);

        new_cardBody.appendChild(title_div);
        new_cardBody.appendChild(card_text);
        new_cardBody.appendChild(card_btn);

        newCard.appendChild(card_img);
        newCard.appendChild(new_cardBody);

        newCol.appendChild(newCard);

        var currentDiv = document.getElementById("child_div");
        var parent = document.getElementById("parent");

        parent.insertBefore(newCol, currentDiv);
    }

}





