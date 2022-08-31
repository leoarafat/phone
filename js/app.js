const loadPhones = async(search) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url)
   const data = await res.json()
   displayPhone(data.data)
}
// loadPhones()

const displayPhone = phones =>{
    const placeMent = document.getElementById('main')
    placeMent.innerHTML = '';
    // display 10 phones
    const showAll = document.getElementById('show-all')
   if(phones.length > 10){
    phones = phones.slice(0, 10)
    
    showAll.classList.remove('d-none')
   }
   else{
    showAll.classList.add('d-none')
   }
    //  display 10 phones

    //show no phone message
    const noPhone = document.getElementById('no-phone')
    if(phones.length === 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none')
    }
    //show no phone message
    phones.forEach(phone =>{
      
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = ` 
        <div class="card p-4">
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone.brand}</h5>
        <p class="card-text">${phone.phone_name}</p>
      </div>
    </div>
        `
        placeMent.appendChild(div)
    })
//stop spinner
loadingSpinner(false)
}

document.getElementById('btn').addEventListener('click', function(){
//start spinner
    loadingSpinner(true)

    const inputField = document.getElementById('input-field');
    const inputText = inputField.value ;
    loadPhones(inputText)
})

const loadingSpinner = isLoading =>{
    const loader = document.getElementById('loader')
    if(isLoading){
        loader.classList.remove('d-none')
    }
    else{
        loader.classList.add('d-none')
    }
}

document.getElementById('show-all').addEventListener('click', function(){
    
})