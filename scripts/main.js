// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp

function openInfo(evt, tabName) {
	// Get all elements with class="tabcontent" and hide them
	var tabcontent = document.getElementsByClassName("tabcontent");
	for (var i = 0; i < tabcontent.length; i++) {
		tabcontent[i].classList.remove("is-active");
		tabcontent[i].setAttribute("aria-hidden", "true");
	}

	// Get all elements with class="tablinks" and remove the class "active"
	var tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].classList.remove("active");
		tablinks[i].removeAttribute("aria-current");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	var activeTab = document.getElementById(tabName);
	if (activeTab) {
		activeTab.classList.add("is-active");
		activeTab.setAttribute("aria-hidden", "false");
	}
	if (evt && evt.currentTarget) {
		evt.currentTarget.classList.add("active");
		evt.currentTarget.setAttribute("aria-current", "page");
	}
}


// Generate a checkbox list from a list of products
// It makes each product name as the label for the checkbox

function populateListProductChoices() {
    var s2 = document.getElementById("displayProduct");
	
	// s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
    s2.innerHTML = "";
		
	// obtain a reduced list of products based on restrictions
    var preferences = {
		vegetarian: document.getElementById("dietVegetarian").checked,
		glutenFree: document.getElementById("dietGlutenFree").checked,
		lactoseFree: document.getElementById("dietLactoseFree").checked,
		organicPreference: document.getElementById("foodPreference").value,
		catFilter: document.getElementById("categoryFilter").value
	};
    var optionArray = restrictListProducts(products, preferences);

	// for each item in the array, create a checkbox element, each containing information such as:
	// <input type="checkbox" name="product" value="Bread">
	// <label for="Bread">Bread/label><br>

	for (i = 0; i < optionArray.length; i++) {
			
		var productName = optionArray[i].name;
		var productPrice = optionArray[i].price.toFixed(2);
		var productOrganic = optionArray[i].organic ? "Organic" : "Non-organic";
		var productId = productName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-_]/g, "");

		var itemRow = document.createElement("div");
		itemRow.className = "product-item";

		if (optionArray[i].image) {
			var img = document.createElement("img");
			img.src = optionArray[i].image;
			img.alt = productName;
			img.className = "product-image";
			itemRow.appendChild(img);
		} else {
			var imgPlaceholder = document.createElement("div");
			imgPlaceholder.className = "product-image placeholder";
			imgPlaceholder.appendChild(document.createTextNode("IMG"));
			itemRow.appendChild(imgPlaceholder);
		}

		// create the checkbox and add in HTML DOM
		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.name = "product";
		checkbox.value = productName;
		checkbox.id = "check-" + productId;
		itemRow.appendChild(checkbox);
		
		// create a label for the checkbox, and also add in HTML DOM
		var label = document.createElement('label')
		label.htmlFor = checkbox.id;
		label.className = "product-label";
		label.appendChild(document.createTextNode(productName));
		itemRow.appendChild(label);

		var price = document.createElement("span");
		price.className = "product-price";
		price.appendChild(document.createTextNode("$" + productPrice + " (" + productOrganic + ")"));
		itemRow.appendChild(price);

		var qtyLabel = document.createElement("label");
		qtyLabel.htmlFor = "qty-" + productId;
		qtyLabel.className = "product-qty-label";
		qtyLabel.appendChild(document.createTextNode("Qty"));
		itemRow.appendChild(qtyLabel);

		var qtyInput = document.createElement("input");
		qtyInput.type = "number";
		qtyInput.min = "1";
		qtyInput.value = "1";
		qtyInput.id = "qty-" + productId;
		qtyInput.className = "product-qty";
		qtyInput.setAttribute("data-name", productName);
		itemRow.appendChild(qtyInput);
		
		s2.appendChild(itemRow);
	}
}

// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph) 
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems(){
	var ele = document.getElementsByName("product");
	var chosenProducts = [];
	
	var c = document.getElementById('displayCart');
	c.innerHTML = "";
	
	var cartList = document.createElement("div");
	cartList.className = "product-list";

	// build list of selected item
	var para = document.createElement("P");
	para.innerHTML = "You selected : ";
	para.appendChild(document.createElement("br"));
	for (i = 0; i < ele.length; i++) { 
		if (ele[i].checked) {
			var name = ele[i].value;
			var productId = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-_]/g, "");
			var qtyInput = document.getElementById("qty-" + productId);
			var qty = parseInt(qtyInput.value, 10);
			if (!qty || qty < 1) {
				qty = 1;
				qtyInput.value = "1";
			}
			var priceEach = 0;
			var productImage = "";
			for (let j = 0; j < products.length; j += 1) {
				if (products[j].name === name) {
					priceEach = products[j].price;
					productImage = products[j].image;
					break;
				}
			}
			var lineTotal = (priceEach * qty).toFixed(2);

			var cartRow = document.createElement("div");
			cartRow.className = "product-item cart-item";

			if (productImage) {
				var cartImg = document.createElement("img");
				cartImg.src = productImage;
				cartImg.alt = name;
				cartImg.className = "product-image";
				cartRow.appendChild(cartImg);
			} else {
				var cartImgPlaceholder = document.createElement("div");
				cartImgPlaceholder.className = "product-image placeholder";
				cartImgPlaceholder.appendChild(document.createTextNode("IMG"));
				cartRow.appendChild(cartImgPlaceholder);
			}

			var nameSpan = document.createElement("span");
			nameSpan.className = "cart-name";
			nameSpan.appendChild(document.createTextNode(name));
			cartRow.appendChild(nameSpan);

			var qtySpan = document.createElement("span");
			qtySpan.className = "cart-qty";
			qtySpan.appendChild(document.createTextNode("x" + qty));
			cartRow.appendChild(qtySpan);

			var unitSpan = document.createElement("span");
			unitSpan.className = "cart-unit";
			unitSpan.appendChild(document.createTextNode("$" + priceEach.toFixed(2)));
			cartRow.appendChild(unitSpan);

			var totalSpan = document.createElement("span");
			totalSpan.className = "cart-line-total";
			totalSpan.appendChild(document.createTextNode("$" + lineTotal));
			cartRow.appendChild(totalSpan);

			var removeBtn = document.createElement("button");
			removeBtn.type = "button";
			removeBtn.className = "cart-remove";
			removeBtn.setAttribute("aria-label", "Remove " + name);
			removeBtn.appendChild(document.createTextNode("X"));
			removeBtn.onclick = function() {
				for (let k = 0; k < ele.length; k += 1) {
					if (ele[k].value === name) {
						ele[k].checked = false;
						break;
					}
				}
				selectedItems();
			};
			cartRow.appendChild(removeBtn);

			if (qty === 1) {
				qtySpan.style.visibility = "hidden";
				unitSpan.style.visibility = "hidden";
			}

			cartList.appendChild(cartRow);
			chosenProducts.push({ name: name, qty: qty });
		}
	}
	if (chosenProducts.length === 0) {
		c.appendChild(document.createTextNode("Your cart is empty."));
		return;
	}
	
	// add paragraph and total price
	c.appendChild(para);
	c.appendChild(cartList);
	c.appendChild(document.createTextNode("Total Price is $" + getTotalPrice(chosenProducts).toFixed(2)));
		
}

window.onload = function() {
	populateListProductChoices();
	var c = document.getElementById('displayCart');
	if (c) {
		c.innerHTML = "Your cart is empty.";
	}
	var homeButton = document.querySelector(".tablinks.active");
	if (homeButton) {
		openInfo({ currentTarget: homeButton }, "Home");
	}
};

function updateFontSize(sizePx) {
	var size = parseInt(sizePx, 10);
	if (!size) {
		return;
	}
	document.documentElement.style.fontSize = size + "px";
	document.body.style.fontSize = size + "px";
	var display = document.getElementById("fontSizeValue");
	if (display) {
		display.textContent = size + "px";
	}
}

function toggleDarkMode() {
	var html = document.documentElement;
	html.classList.toggle("dark-mode");
}