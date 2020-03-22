window.onload=function(){

    document.getElementById('searchBtn').addEventListener('click', bookSearch, false);
}


function bookSearch() {

    console.log('this function runs');
    var search = document.getElementById('search').value;
    document.getElementById('results').innerHTML = "";
    console.log(search);

    $.ajax({
        url: 'https://www.googleapis.com/books/v1/volumes?q=' + search,
        dataType: 'json',

        success: function(data){
            console.log(data);
        },

        type: 'GET'
    });

    document.getElementById('results').innerHTML = data.volumeInfo.title;
}

