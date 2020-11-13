let baseurl = "https://developers.zomato.com/api/v2.1/search?"
let key = "e7211fb48985ec5e00bfb19c34b6c3ce"


function getResult(){
    event.preventDefault();
    let form = document.getElementById('form')
    let formData = new FormData(form)
    let q = formData.get('q')
    let lat = formData.get('lat')
    let lon = formData.get('lon')
    let start = formData.get('start')
    let count = formData.get('count')


    let urlSearchParams = new URLSearchParams();
    
    
    urlSearchParams.append('q', q);
    urlSearchParams.append('lat', lat);
    urlSearchParams.append('lon', lon);
    urlSearchParams.append('start', start);
    urlSearchParams.append('count', count);
    urlSearchParams.append('q', q);
    
    console.log(baseurl + urlSearchParams)


    let xhr = new XMLHttpRequest();
    xhr.open("GET", baseurl + urlSearchParams)
    xhr.setRequestHeader("user-key", key)
    xhr.send()

    xhr.onload = function(){
        console.log(this.status)
        var response = JSON.parse(this.response)
        console.log(response)
        displayResponse(response.restaurants)
    }

}


function displayResponse(data){
    var res = document.getElementById("res")
    
    res.innerHTML = ""
    for(var i = 0; i < data.length; i++){
        var div = document.createElement('div')
        console.log(data[i].restaurant.name)
        var p = document.createElement('p')
        p.textContent = data[i].restaurant.name
        div.append(p)
        var p1 = document.createElement('p')
        p1.textContent = data[i].restaurant.phone_numbers
        div.append(p1)
        var image  = document.createElement('img')
        image.style.width = '100px'
        image.setAttribute('src',data[i].restaurant.featured_image)
        div.append(image)
        res.append(div)
    }
    

}


window.addEventListener('load',()=>{
    var submitbtn = document.querySelector('#submitbtn')
    submitbtn.addEventListener('click', getResult)
})