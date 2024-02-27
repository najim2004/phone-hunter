const loadPhone = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones);
}

const displayPhones = phones => {
    const phonesContainer = document.getElementById('phones-container');

    phones.forEach(phone => {
        const div=document.createElement('div');
        const img = phone.image;
        const phoneName = phone.phone_name;
        const brand = phone.brand;
        const productId = phone.slug;
        div.innerHTML = `
            <div id="${productId}" class="text-center space-y-6 card bg-base-100  max-w-[364px] p-6 border-[1px] border-[#CFCFCF] rounded-lg">
                <div class="rounded-lg h-[314px] w-[300px] flex justify-center items-center bg-[rgba(13,110,253,0.05)]">
                    <img class="h-[214px] w-[175px]" src="${img}" alt="Shoes" />
                </div>

                <div class="space-y-6 ">

                    <h2 class="text-2xl font-bold text-[#403F3F]">${phoneName}</h2>
                    <p class="font-semibold text-[#706F6F]">Brand:<span>${brand}</span></p>
                    <p class="text-lg text-[#706F6F]">There are many variations of passages of available, but the majority have suffered</p>
                    <h3 class="text-2xl font-bold text-[#403F3F]">$999</h3>
                    <div class="">
                        <button class="btn bg-[#0D6EFD] h-12 w-[180px] text-white">Show Details</button>
                    </div>
                </div>
            </div>

        `
        phonesContainer.appendChild(div);
    });
}




loadPhone();