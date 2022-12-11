window.onload = function () {
    const optionDropdown = document.getElementById("optionDropdown")

    const categoryContainer = document.getElementById("categoryContainer")
    const categoryDropdown = document.getElementById("categoryDropdown")

    const infoContainer = document.getElementById("infoContainer")


    document.getElementById("optionDropdown").onchange = optionDropdownChange
    document.getElementById("categoryDropdown").onchange = categoryDropdownChange
    /* categoryDropdown.onchange = categoryDropdownChange() */

    //optionListDropdown();
    /*     categoryListDropdown(); */
    categoryContainerHide();
    populateCategory();
}

function categoryContainerHide() {
    document.getElementById("categoryContainer").style.display = "none";
}

function populateCategory() {

    const categoryDropdown = document.getElementById("categoryDropdown");
    let blankCategory = document.createElement("option");
    blankCategory.value = "blankOption";
    blankCategory.textContent = "Pick a Category"
    categoryDropdown.appendChild(blankCategory)

    fetch("http://localhost:8081/api/categories")
        .then(response => response.json())
        .then(category => {
            for (let i in category) {
                let categoryOption = document.createElement("option");
                categoryOption.value = category[i].name
                categoryOption.textContent = category[i].name

                categoryDropdown.appendChild(categoryOption);

            }
        })
}

function optionDropdownChange() {
    const infoContainer = document.getElementById("infoContainer")
    infoContainer.innerHTML = " ";
    if (optionDropdown.value == "viewAll") {
        document.getElementById("categoryContainer").style.display = "none";

        fetch("http://localhost:8081/api/products")
            .then(response => response.json())
            .then(product => {
                for (let i = 0; i < product.length; i++) {
                    const infoContainer = document.getElementById("infoContainer")

                    let cardSize = document.createElement("div");
                    cardSize.className = "col-sm-6 col-lg-4 mb-3 mt-4";
                    infoContainer.appendChild(cardSize)

                    let card = document.createElement("div");
                    card.className = "card text-center background";
                    card.style.height = "400px shadow-8-strong"
                    cardSize.appendChild(card)

                    let cardBody = document.createElement("div");
                    cardBody.className = "card-body";
                    card.appendChild(cardBody)

                    let prodName = document.createElement("h1");
                    prodName.className = "card-title"
                    prodName.style = "font-size:170%"
                    prodName.innerHTML = product[i]?.productName;
                    cardBody.appendChild(prodName)

                    let prodSupplier = document.createElement("h2")
                    prodSupplier.style = "font-size:110%"
                    prodSupplier.innerHTML = "Supplier: " + product[i]?.supplier;
                    cardBody.appendChild(prodSupplier)

                    let anchor = document.createElement("a");
                    anchor.href = "http://127.0.0.1:5500/pages/product_details.html?productId=" + product[i].productId;
                    anchor.text = "See details";
                    cardBody.appendChild(anchor)
                }
            })


    }


    else if (optionDropdown.value == "srchCategory") {
        document.getElementById("categoryContainer").style.display = "block";
    }

    else if (optionDropdown.value == "noneSelect") {
        categoryContainerHide()
    }
}

function categoryDropdownChange() {
    const infoContainer = document.getElementById("infoContainer")
    infoContainer.innerHTML = " ";

    fetch("http://localhost:8081/api/categories")
        .then(response => response.json())
        .then(category => {
            for (let i = 0; i < category.length; i++) {
                if (categoryDropdown.value == category[i].name) {
                    fetch("http://localhost:8081/api/categories/" + category[i].categoryId)
                        .then(response => response.json())
                        .then(product => {
                            for (let j in product) {
                                const infoContainer = document.getElementById("infoContainer")

                                let cardSize = document.createElement("div");
                                cardSize.className = "col-sm-6 col-lg-4 mb-3 mt-4";
                                infoContainer.appendChild(cardSize)

                                let card = document.createElement("div");
                                card.className = "card text-center background";
                                card.style.height = "400px shadow-8-strong"
                                cardSize.appendChild(card)

                                let cardBody = document.createElement("div");
                                cardBody.className = "card-body";
                                card.appendChild(cardBody)

                                let prodName = document.createElement("h1");
                                prodName.className = "card-title"
                                prodName.style = "font-size:170%"
                                prodName.innerHTML = product[j].productName;
                                cardBody.appendChild(prodName)

                                let prodSupplier = document.createElement("h2")
                                prodSupplier.style = "font-size:110%"
                                prodSupplier.innerHTML = "Supplier: " + product[j].supplier;
                                cardBody.appendChild(prodSupplier)

                            }
                        })

                }
            }
        })
}
