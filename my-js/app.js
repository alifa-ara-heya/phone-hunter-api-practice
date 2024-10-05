// at first, we are handling the search.

const loadAllPhones = async (status, brandName) => {
    // console.log(brandName);
    document.getElementById('spinner').style.display = 'none';
    // to show the relevant data by search
    /*  fetch(' https://openapi.programming-hero.com/api/phones?search=iphone')
     .then(res => res.json())
     .then(data => console.log(data)) */

    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brandName ? brandName : 'iphone'}`);
    const data = await response.json();
    
    // console.log(data.data);
 
    if (status) {
        displayAllPhones(data.data) //it will show us an array of objects of 12 phones
    } else {
        displayAllPhones(data.data.slice(0, 6)); //it will show us an array of objects of 6 phones
    }
 
}

const displayAllPhones = (phones) => {
    document.getElementById("phones-container").innerHTML = "";

    if (phones.length===0){
        document.getElementById("phones-container").innerHTML = "<p>Nothing found!</p>";
    }
    else{
        const phonesContainer = document.getElementById("phones-container");
        
        phones.forEach(phone => {
            const div = document.createElement('div');
            // console.log(phone);
            const { brand, image, slug } = phone;

            div.innerHTML = `
            <div class="card bg-base-100 m-2 w-96 shadow-xl">
    <figure class="px-10 pt-10">
        <img
        src="${image}"
        alt="Shoes"
        class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
        <h2 class="card-title">${brand}</h2>
        <p>${slug}</p>
        
        <button onClick="phoneDetails('${slug}')" class="btn btn-primary">Show Details</button>
        </div>
    </div>
    </div>
            `
            phonesContainer.appendChild(div);
        });
}
}


const handleShowAll = () => {
    // console.log('hello, show all');
    loadAllPhones(true);
}


const handleSearch = () => {
    // console.log('Hello');
    document.getElementById('spinner').style.display = 'block';
    const searchText = document.getElementById('search-box').value;
    setTimeout(function () {
        loadAllPhones(false, searchText)
    }, 3000)
}

// setTimeout(loadAllPhones(), 3000)//Instead of passing the function loadAllPhones as a reference, you are invoking it immediately. This causes the function to run right away instead of after 3 seconds. You should pass the function without invoking it, like this:
// setTimeout(loadAllPhones, 3000);

const phoneDetails = async(slugId) => {
    // console.log(slug);
    const response = await fetch(` https://openapi.programming-hero.com/api/phone/${slugId}`);
    const data = await response.json();
    console.log(data.data);

    const {brand, image, slug} = data.data;
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML =
    `
    <dialog id="my_modal_1" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold">${brand}</h3>
               
                <p class="py-4">Phone name: ${slug}</p>
                <div class="modal-action">
                    <form method="dialog">
                        <button class="btn">Close</button>
                    </form>
                </div>
            </div>
    </dialog>
    `
    my_modal_1.showModal();
}

loadAllPhones(false, 'iphone');


