const loadPhone = async (searchText, isShowAll) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);


};


const displayPhones = (phones, isShowAll) => {
    const phonesContainer = document.getElementById('phones-container');
    const showAllBtn = document.getElementById('show-all-btn');
    phonesContainer.innerHTML = '';

    if (phones.length > 9 && !isShowAll) {
        showAllBtn.classList.remove('hidden')
    } else {
        showAllBtn.classList.add('hidden');
    }
    // phonesContainer.textContent='';
    if (!isShowAll) {
        phones = phones.slice(0, 9);
    }
    phones.forEach(phone => {
        const div = document.createElement('div');
        const img = phone.image;
        const phoneName = phone.phone_name;
        const brand = phone.brand;
        const productId = phone.slug;
        div.innerHTML = `
            <div class="text-center space-y-6 card bg-base-100  max-w-[364px] p-6 border-[1px] border-[#CFCFCF] rounded-lg">
                <div class="rounded-lg h-[314px] w-[300px] flex justify-center items-center bg-[rgba(13,110,253,0.05)]">
                    <img class="" src="${img}" alt="Shoes" />
                </div>

                <div class="space-y-6 ">

                    <h2 class="text-2xl font-bold text-[#403F3F]">${phoneName}</h2>
                    <p class="font-semibold text-[#706F6F]">Brand:<span>${brand}</span></p>
                    <p class="text-lg text-[#706F6F]">There are many variations of passages of available, but the majority have suffered</p>
                    <h3 class="text-2xl font-bold text-[#403F3F]">$999</h3>
                    <div class="">
                        <button onclick="handleShowDetails('${img}','${brand}','${phoneName}', '${productId}')" class="btn bg-[#0D6EFD] h-12 w-[180px] text-white">Show Details</button>
                    </div>
                </div>
            </div>

        `
        phonesContainer.appendChild(div);
    });
    toggleLoadingSpinner(false);
};

// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value.toLowerCase();
    loadPhone(searchText, isShowAll);
};


document.getElementById('search-input').addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        handleSearch();
    }
});


const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
};


const handleShowAll = () => {
    handleSearch(true);
    document.getElementById('search-input').value = '';
};


const handleShowDetails = (img, brand, phoneName, productId) => {
    const modalSection = document.getElementById('modal-section');
    modalSection.classList.remove('hidden');
    setModalDetails(img, brand, phoneName, productId);
}



const setModalDetails = (img, brand, phoneName, productId) => {
    const phonesContainer = document.getElementById('modal-container');
    const allChild = phonesContainer.children;
    console.log(allChild);
    const image = allChild[0];
    image.innerHTML = `
        <img class="h-[381px] w-[268px]"
        src="${img}" alt="">`
    const modelName = allChild[1].children[0];
    modelName.innerText = phoneName;

    const slug = allChild[1].children[6].children[0];
    slug.innerText = productId;

    const phoneBrand = allChild[1].children[8].children[0];
    phoneBrand.innerText = brand;
}




function hiedModal() {
    const modalSection = document.getElementById('modal-section');
    modalSection.classList.add('hidden');
}


loadPhone('iphone');