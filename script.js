

let url = "https://developers.zomato.com/api/v2.1/search?"
let key = "e7211fb48985ec5e00bfb19c34b6c3ce"

function fetchDetail(){
    event.preventDefault();
    let form = document.getElementById('form')
    let formData = new FormData(form)
    let q = formData.get('q')
    let categories = formData.get('categories')
    let sort = formData.get('sort')
    let order = formData.get('order')
    let start = formData.get('start')
    let count = formData.get('count')

    let urlsrcparam = new URLSearchParams();
    
    urlsrcparam.append('q', q)
    urlsrcparam.append('categories', categories)
    urlsrcparam.append('sort', sort)
    urlsrcparam.append('order', order)
    urlsrcparam.append('start', start)
    urlsrcparam.append('count', count)

    //console.log(url + urlsrcparam)

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url + urlsrcparam)
    xhr.setRequestHeader("user-key", key)
    xhr.send()
    xhr.onload = function(){
        var result = JSON.parse(this.response)
        console.log(result)
        showDetails(result.restaurants)
    }

}


function showDetails(data){
    var show = document.getElementById("show")
    show.innerHTML = ""
    for(var i = 0; i < data.length; i++){
        var div = document.createElement('div')
        div.style.border = '2px solid red'
        div.style.paddingLeft = '10px'
        div.style.margin = '5px auto'
        div.style.width = '70%'
        div.style.backgroundColor = 'white'
        div.style.borderRadius = '20px'

        var name = document.createElement('p')
        name.style.fontSize = '30px'
        name.style.color = 'red'
        name.style.margin = '5px 10px'
        name.textContent =   data[i].restaurant.name
        div.append(name)

        var time = document.createElement('p')
        time.style.fontSize = '20px'
        time.style.color = 'green'
        time.style.margin = '5px 10px'
        time.textContent = "Timing:- " + data[i].restaurant.timings
        div.append(time)

        var cost = document.createElement('p')
        cost.style.fontSize = '20px'
        cost.style.color = 'teal'
        cost.style.margin = '5px 10px'
        cost.textContent = "Avg. Cost for 2:- " + data[i].restaurant.average_cost_for_two
        div.append(cost)

        var cuisines = document.createElement('p')
        cuisines.style.fontSize = '20px'
        cuisines.style.color = 'blue'
        cuisines.style.margin = '5px 10px'
        cuisines.textContent = "Cuisines:- " + data[i].restaurant.cuisines
        div.append(cuisines)

        var phone = document.createElement('p')
        phone.style.fontSize = '20px'
        phone.style.color = 'magenta'
        phone.style.margin = '5px 10px'
        phone.textContent = "Contact No:- " + data[i].restaurant.phone_numbers
        div.append(phone)

        var address = document.createElement('p')
        address.style.fontSize = '20px'
        address.style.color = 'teal'
        address.style.margin = '5px 10px'
        address.textContent = "Address:- " + data[i].restaurant.location.address
        div.append(address)

        var image = document.createElement('img')
        image.style.width = '150px'
        image.style.borderRadius = '10px'
        image.setAttribute('src', data[i].restaurant.featured_image)
        div.append(image)

        show.append(div)
    }
}



window.addEventListener('load', ()=>{
    var srcbtn = document.querySelector('#srcbtn')
    srcbtn.addEventListener('click', fetchDetail)
})