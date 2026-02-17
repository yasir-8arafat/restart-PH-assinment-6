// All Load Function
const loadCatergories = () => {
    fetch("https://fakestoreapi.com/products/categories")
        .then((res) => res.json())
        .then((data) => {
            displayCategories(data);
        })
}

const remmoveActiveClass = () => {
    document.querySelectorAll(".cmn-btn").forEach(btn => {
        btn.classList.remove("active");
    })
}

const loadAllProduct = () => {
    fetch("https://fakestoreapi.com/products").then(res => res.json()).then(data => {
        displayAllProducts(data);
        remmoveActiveClass();
        document.getElementById("all-btn").classList.add("active");
    });
}

const loadProductByCategories = (catProperty) => {
    const url = `https://fakestoreapi.com/products/category/${catProperty}`;
    fetch(url).then(res => res.json()).then(data => {
        remmoveActiveClass();
        displayAllProducts(data);
        document.getElementById(catProperty).classList.add("active");
    })
}





// All Executive Function
const displayCategories = (catgoriArr) => {
    const catchBtnContainer = document.getElementById("btn-container");
    catgoriArr.forEach(catBtn => {
        const categoryBtn = document.createElement("div");
        categoryBtn.innerHTML = `
        <button id="${catBtn}" class="btn btn-soft cmn-btn rounded-full hover:bg-blue-500 hover:text-white">${catBtn}</button>
        `;
        catchBtnContainer.appendChild(categoryBtn);
        document.getElementById(`${catBtn}`).addEventListener("click", () => {
            loadProductByCategories(catBtn);
        })
    });
}

// const displayCategories = (catgoriArr) => {
//     const catchBtnContainer = document.getElementById("btn-container");

//     catgoriArr.forEach(catBtn => {
//         const button = document.createElement("button");
//         button.textContent = catBtn;
//         button.className = "btn btn-soft rounded-full hover:bg-blue-500 hover:text-white";

//         button.addEventListener("click", () => {
//             loadProductByCategories(catBtn);
//         });

//         catchBtnContainer.appendChild(button);
//     });
// }


const displayAllProducts = (productArr) => {
    const catchProductContainer = document.getElementById("product-container");
    catchProductContainer.innerHTML = "";
    productArr.forEach(productObj => {
        const newProduct = document.createElement("div");
        newProduct.className = "card bg-base-100 w-80 sm:w-72 md:w-80 xl:w-95 2xl:w-80 shadow-sm border-1 border-gray-300";
        newProduct.innerHTML = `
                    <figure class="h-64 bg-gray-100 p-2">
                        <img class="w-full h-full rounded-xl" src="${productObj.image}"
                            alt="Shoes" />
                    </figure>
                    <div class="card-body">
                        <div class="card-actions justify-between">
                            <div class="badge badge-outline text-blue-500 bg-blue-100">${productObj.category}</div>
                            <div class="badge badge-outline text-base font-medium text-gray-500"><i
                                    class="fa-solid fa-star text-orange-400"></i>${productObj.rating.rate}(${productObj.rating.count})
                            </div>
                        </div>
                        <h2 class="card-title line-clamp-2">
                            ${productObj.title}</clothing>
                        </h2>
                        <div class="badge badge-secondary bg-slate-50 text-gray-700 font-bold">$${productObj.price}</div>
                        <div class="card-actions justify-between">
                            <button class="btn btn-secondary"><i class="fa-regular fa-eye fa-sm"></i>Details</button>
                            <button class="btn btn-secondary bg-blue-500 border-none"><i
                                    class="fa-solid fa-cart-arrow-down fa-sm"></i>ADD</button>
                        </div>
                    </div>
        `;
        catchProductContainer.appendChild(newProduct);

    });
}

// All called Function
loadCatergories();
