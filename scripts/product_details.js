window.onload = function () {
    productDetails()
}

function productDetails() {
    /*     detailsContainer.innerHTML = "test" */
    const urlParams = new URLSearchParams(location.search);
    let id = -1;
    if (urlParams.has("productId") === true) {
        id = urlParams.get("productId")
        //testing if statment (original code not working)
        //detailsContainer.innerHTML = id

        fetch("http://localhost:8081/api/products/" + id)
            .then(response => response.json())
            .then(item => {
                //FINALLY WORKING!!!!
                //detailsContainer.innerHTML = item.productName

                let cardSize = document.createElement("div");
                cardSize.className = "col-lg-6 offset-lg-3 mb-3 mt-4";
                detailsContainer.appendChild(cardSize)

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
                prodName.innerHTML = item.productName;
                cardBody.appendChild(prodName)

                let prodSupplier = document.createElement("h2")
                prodSupplier.style = "font-size:110%"
                prodSupplier.innerHTML = "Supplier: " + item.supplier;
                cardBody.appendChild(prodSupplier)

                let units = document.createElement("p")
                units.style = "font-size:110%"
                units.innerHTML = "Amount in Stock: " + item.unitsInStock + " units -------- " + "Price: $" + item.unitPrice;
                cardBody.appendChild(units)

            })

    }
}