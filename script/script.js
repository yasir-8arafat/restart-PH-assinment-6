// loading menu

const loaderActive = () => {
    const loaderContainer = document.getElementById("loadMenu");
    if (!loaderContainer) return;
    loaderContainer.classList.remove("hidden")
}
const loaderDeActive = () => {
    const loaderContainer = document.getElementById("loadMenu");
    if (!loaderContainer) return;
    loaderContainer.classList.add("hidden")
}


// All Load Function
const loadCatergories = () => {
    loaderActive();
    fetch("https://fakestoreapi.com/products/categories")
        .then((res) => res.json())
        .then((data) => {
            displayCategories(data);
        })
}

const loadSingledetail = (id) => {
    const url = `https://fakestoreapi.com/products/${id}`;
    fetch(url).then((res) => res.json()).then((data) => {
        showDetail(data);
    })
}

const remmoveActiveClass = () => {
    document.querySelectorAll(".cmn-btn").forEach(btn => {
        btn.classList.remove("active");
    })
}

const loadAllProduct = () => {
    loaderActive();
    fetch("https://fakestoreapi.com/products").then(res => res.json()).then(data => {
        displayAllProducts(data);
        remmoveActiveClass();
        document.getElementById("all-btn").classList.add("active");
    });
}

const loadTrending = () => {
    fetch("https://fakestoreapi.com/products").then(res => res.json()).then(data => {
        displayTrendingProducts(data);
    });
}
const loadAllProductForCart = (clickedProductId) => {
    fetch("https://fakestoreapi.com/products").then(res => res.json()).then(data => {
        cartCollection(data, clickedProductId);
    });
}

const loadProductByCategories = (catProperty) => {
    loaderActive();
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
    if (!catchBtnContainer) return;
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
    loaderDeActive();
}

let cartArr = [];
const cartCollection = (allProductsArray, clickedId) => {
    const catchCart = document.getElementById("addedCartNo");
    for (let i of allProductsArray) {
        if (i.id === clickedId) {
            cartArr.push(i);
        }
    }
    catchCart.innerText = cartArr.length;
}

const removeCart = (id) => {
    cartArr = cartArr.filter(obj => obj.id !== id);
    console.log(cartArr);
}

const showCartModal = () => {
    const catchcartModal = document.getElementById("carModalInfo");
    catchcartModal.innerHTML = "";
    let sum = 0;
    cartArr.forEach(cartObj => {
        sum = sum + cartObj.price;
        const modalData = document.createElement("div");
        modalData.className = "card bg-base-100 w-full shadow-sm mb-4"
        modalData.innerHTML = `
  <div class="card-body">
    <h2 class="card-title text-gray-700 text-xl font-bold">${cartObj.title}</h2>
   <div class = "flex flex-wrap gap-3 justify-center sm:justify-between">
    <div class="badge badge-outline py-3  font-bold text-xl text-blue-500 bg-blue-100">Price: $${cartObj.price}</div>
    <div onclick = "removeCart(${cartObj.id})" class="badge badge-outline py-3  font-medium text-xl text-gray-600 bg-gray-100">Remove This Product</div>
   </div>
  </div>
    `;
        catchcartModal.appendChild(modalData);
    })
    const totalPrice = document.createElement("div");
    totalPrice.innerHTML = `
        <h1 class="text-center mt-3 font-bold text-xl text-gray-600">
            The Total Price : $${sum}
        </h1>
    `;
    catchcartModal.appendChild(totalPrice);
}



const showDetail = (deatilObj) => {
    const modalContainer = document.getElementById("modal-detail");
    modalContainer.innerHTML = "";
    const modalData = document.createElement("div");
    modalData.className = "card bg-base-100 w-full shadow-sm"
    modalData.innerHTML = `
  <div class="card-body">
    <div class = "flex flex-wrap gap-3 justify-center sm:justify-between">
       <div class="badge badge-outline text-blue-500 bg-blue-100">Price: $${deatilObj.price}</div>
       <div class="badge bg-orange-100 badge-outline text-base font-medium text-gray-500">rating : <i
           class="fa-solid fa-star text-orange-400"></i>${deatilObj.rating.rate}
       </div>
    </div>
    <h2 class="card-title text-gray-700 text-xl font-bold">${deatilObj.title}</h2>
    <p class = "text-base font-semibold text-gray-400">${deatilObj.description}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Add to Cart</button>
    </div>
  </div>
    `
    modalContainer.appendChild(modalData);
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
                            <button onclick="my_modal_2.showModal(); loadSingledetail(${productObj.id})" class="btn btn-secondary"><i class="fa-regular fa-eye fa-sm"></i>Details</button>
                            <button onclick = "loadAllProductForCart(${productObj.id})" class="btn btn-secondary bg-blue-500 border-none"><i
                                    class="fa-solid fa-cart-arrow-down fa-sm"></i>ADD</button>
                        </div>
                    </div>
        `;
        catchProductContainer.appendChild(newProduct);
    });
    loaderDeActive();
}


const displayTrendingProducts = (trendproductArr) => {
    const catchTrendingContainer = document.getElementById("trending-container");
    if (!catchTrendingContainer) return;
    trendproductArr.forEach(productObj => {
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
                            <button onclick="my_modal_2.showModal(); loadSingledetail(${productObj.id})" class="btn btn-secondary"><i class="fa-regular fa-eye fa-sm"></i>Details</button>
                            <button class="btn btn-secondary bg-blue-500 border-none"><i
                                    class="fa-solid fa-cart-arrow-down fa-sm"></i>ADD</button>
                        </div>
                    </div>
        `;
        if (productObj.rating.rate >= 4.7) {
            catchTrendingContainer.appendChild(newProduct);
        }
    });
}

// All called Function
loadCatergories();
loadTrending();
