const loadPhones = async(search, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url)
   const data = await res.json()
   displayPhone(data.data, dataLimit)
}
// loadPhones()

const displayPhone = (phones, dataLimit) =>{
    const placeMent = document.getElementById('main')
    placeMent.innerHTML = '';
    // display 10 phones
    const showAll = document.getElementById('show-all')
   if(dataLimit && phones.length > 10){
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
        <div class="card p-4" style="width: 18rem;">
      <img src="${phone.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone.brand}</h5>
        <p class="card-text">${phone.phone_name}</p>
        <button onclick="showDetails('${phone.slug}')" href="#" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
      </div>
    </div>
        `
        placeMent.appendChild(div)
    })
//stop spinner
loadingSpinner(false)
}
//search btn
document.getElementById('btn').addEventListener('click', function(){
//start spinner
showAll(10)
})

//enter to search
document.getElementById('input-field').addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        showAll(10)
    }
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
//show all function 
const showAll = (dataLimit) =>{
    loadingSpinner(true)
const inputField = document.getElementById('input-field');
const inputText = inputField.value ;
loadPhones(inputText, dataLimit)
}
//show all btn
document.getElementById('btn-show-all').addEventListener('click', function(){
    showAll()
})

//btn show details
const showDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    showDetailsDisplay(data.data)
}

//btn show display
const showDetailsDisplay = phone =>{
    console.log(phone)
    const phoneTitle = document.getElementById('exampleModalLabels')
    phoneTitle.innerText = phone.name;
    const rlxDate = document.getElementById('modal-body')
    rlxDate.innerHTML = `
    <p>${phone.releaseDate ? phone.releaseDate : 'No date found'}</p>
    <p>${phone.mainFeatures.memory}</p>
    `
    const mainFeature = document.getElementById('storage')
    mainFeature.innerText = phone.mainFeatures.storage
}
loadPhones('apple')
