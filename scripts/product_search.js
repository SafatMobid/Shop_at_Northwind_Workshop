window.onload = function () {
    const optionDropdown = document.getElementById("optionDropdown")

    const categoryContainer = document.getElementById("categoryContainer")
    const categoryDropdown = document.getElementById("categoryDropdown")

    const infoContainer = document.getElementById("infoContainer")

    /*     optionDropdown.onchange = optionDropdownChange()
        categoryDropdown.onchange = categoryDropdownChange() */

    //optionListDropdown();
    /*     categoryListDropdown();
        categoryContainerHide(); */

    allProducts();
}

function allProducts() {
    fetch("http://localhost:8081/api/categories")
        .then(reponse => reponse.json())
        .then(category => {
            for (let i = 1; i <= category.length; i++) {
                fetch("http://localhost:8081/api/categories/" + i)
                    .then(reponse => reponse.json())
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



                            /*             let footer = document.createElement("cardFooter");
                                        footer.className = "card-footer"
                                        footer.innerHTML = mountainsArray[i].effort
                                        card.appendChild(footer)
                             */

                        }
                    })
            }
        })

}
