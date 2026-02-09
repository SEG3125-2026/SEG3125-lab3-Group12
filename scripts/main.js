// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp
var cartItems = {};

function slugifyProductName(name) {
	return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-_]/g, "");
}

function getCategoryDisplayName(category) {
	return category
		.split(" ")
		.map(function(word) {
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(" ");
}

function openProductsTab() {
	var productsTabLink = document.getElementById("navProducts");
	if (productsTabLink) {
		openInfo({ currentTarget: productsTabLink }, "Products");
		return;
	}
	openInfo(null, "Products");
}

function handleSearchInput() {
	openProductsTab();
	populateListProductChoices();
}

function toggleCategoryFilter(buttonElement) {
	var categoryButtons = document.querySelectorAll(".category-btn");
	var isAllButton = buttonElement.getAttribute("data-category") === "None";

	if (isAllButton) {
		for (var i = 0; i < categoryButtons.length; i += 1) {
			categoryButtons[i].classList.remove("active");
		}
		buttonElement.classList.add("active");
		populateListProductChoices();
		return;
	}

	var allButton = document.querySelector(".category-btn[data-category='None']");
	if (allButton) {
		allButton.classList.remove("active");
	}

	buttonElement.classList.toggle("active");

	var selectedSpecificButtons = document.querySelectorAll(".category-btn.active[data-category]:not([data-category='None'])");
	if (selectedSpecificButtons.length === 0 && allButton) {
		allButton.classList.add("active");
	}

	populateListProductChoices();
}

function getActiveCategoryFilters() {
	var selectedButtons = document.querySelectorAll(".category-btn.active[data-category]:not([data-category='None'])");
	var selectedCategories = [];
	for (var i = 0; i < selectedButtons.length; i += 1) {
		selectedCategories.push(selectedButtons[i].getAttribute("data-category").toLowerCase());
	}
	return selectedCategories;
}

function updatePriceFilter(sliderValue) {
	var priceValue = document.getElementById("priceFilterValue");
	if (priceValue) {
		priceValue.textContent = "Up to $" + sliderValue;
	}
	populateListProductChoices();
}

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
	var navMap = {
		Home: "navHome",
		Client: "navClient",
		Products: "navProducts",
		Cart: "navCart"
	};
	var navTarget = document.getElementById(navMap[tabName]);
	if (navTarget) {
		navTarget.classList.add("active");
		navTarget.setAttribute("aria-current", "page");
	}
	if (evt && evt.currentTarget && evt.currentTarget.id === "AccessibilityButton") {
		evt.currentTarget.classList.add("active");
		evt.currentTarget.setAttribute("aria-current", "page");
	}
}


function populateListProductChoices() {
    var s2 = document.getElementById("displayProduct");
	
	// s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
    s2.innerHTML = "";
		
	// obtain a reduced list of products based on restrictions
	var foodPreferenceValue = "Any";
	var foodPreferenceChoice = document.querySelector("input[name='foodPreference']:checked");
	if (foodPreferenceChoice) {
		foodPreferenceValue = foodPreferenceChoice.value;
	}
	var preferences = {
		vegetarian: document.getElementById("dietVegetarian").checked,
		glutenFree: document.getElementById("dietGlutenFree").checked,
		lactoseFree: document.getElementById("dietLactoseFree").checked,
		organicPreference: foodPreferenceValue,
		catFilter: "None",
		selectedCategories: getActiveCategoryFilters(),
		searchTerm: document.getElementById("searchInput").value,
		priceCap: document.getElementById("priceFilter").value,
		priceSort: document.getElementById("priceSort").value
	};
	var optionArray = restrictListProducts(products, preferences);
	if (preferences.selectedCategories.length > 0) {
		optionArray = optionArray.filter(function(product) {
			var productCategory = product.category.toLowerCase();
			return preferences.selectedCategories.indexOf(productCategory) !== -1;
		});
	}
	var maxPrice = parseFloat(preferences.priceCap);
	optionArray = optionArray.filter(function(product) {
		return product.price <= maxPrice;
	});
	if (preferences.priceSort === "desc") {
		optionArray.sort(function(a, b) {
			return b.price - a.price;
		});
	} else {
		optionArray.sort(function(a, b) {
			return a.price - b.price;
		});
	}
	var categoryOrder = [
		"fruit and vegetable",
		"dairy and eggs",
		"pantry",
		"beverages",
		"meat and poultry",
		"fish and seafood",
		"bread and bakery",
		"vegan and vegetarian"
	];
	var groupedProducts = {};

	for (var i = 0; i < optionArray.length; i += 1) {
		var category = optionArray[i].category;
		if (!groupedProducts[category]) {
			groupedProducts[category] = [];
		}
		groupedProducts[category].push(optionArray[i]);
	}

	var sortedCategories = Object.keys(groupedProducts).sort(function(a, b) {
		var idxA = categoryOrder.indexOf(a);
		var idxB = categoryOrder.indexOf(b);
		if (idxA === -1 && idxB === -1) {
			return a.localeCompare(b);
		}
		if (idxA === -1) {
			return 1;
		}
		if (idxB === -1) {
			return -1;
		}
		return idxA - idxB;
	});

	if (sortedCategories.length === 0) {
		var emptyState = document.createElement("p");
		emptyState.className = "empty-state";
		emptyState.appendChild(document.createTextNode("No products match your current filters."));
		s2.appendChild(emptyState);
		return;
	}

	for (var c = 0; c < sortedCategories.length; c += 1) {
		var categoryName = sortedCategories[c];
		var categorySection = document.createElement("section");
		categorySection.className = "product-category-section";

		var categoryTitle = document.createElement("h3");
		categoryTitle.className = "product-category-title";
		categoryTitle.appendChild(document.createTextNode(getCategoryDisplayName(categoryName)));
		categorySection.appendChild(categoryTitle);

		var categoryGrid = document.createElement("div");
		categoryGrid.className = "product-category-grid";

		var productsInCategory = groupedProducts[categoryName];
		for (var p = 0; p < productsInCategory.length; p += 1) {
			var product = productsInCategory[p];
			var productName = product.name;
			var productPrice = product.price.toFixed(2);
			var productOrganic = product.organic ? "Organic" : "Non-organic";
			var productId = slugifyProductName(productName);

			var itemRow = document.createElement("div");
			itemRow.className = "product-item";

			if (product.image) {
				var img = document.createElement("img");
				img.src = product.image;
				img.alt = productName;
				img.className = "product-image";
				itemRow.appendChild(img);
			} else {
				var imgPlaceholder = document.createElement("div");
				imgPlaceholder.className = "product-image placeholder";
				imgPlaceholder.appendChild(document.createTextNode("IMG"));
				itemRow.appendChild(imgPlaceholder);
			}

			var label = document.createElement("p");
			label.className = "product-label";
			label.appendChild(document.createTextNode(productName));
			itemRow.appendChild(label);

			var price = document.createElement("span");
			price.className = "product-price";
			price.appendChild(document.createTextNode("$" + productPrice + " (" + productOrganic + ")"));
			itemRow.appendChild(price);

			var controlsWrap = document.createElement("div");
			controlsWrap.className = "product-controls";

			var qtyLabel = document.createElement("label");
			qtyLabel.htmlFor = "qty-" + productId;
			qtyLabel.className = "product-qty-label";
			qtyLabel.appendChild(document.createTextNode("Qty"));
			controlsWrap.appendChild(qtyLabel);

			var qtyInput = document.createElement("input");
			qtyInput.type = "number";
			qtyInput.min = "1";
			qtyInput.value = "1";
			qtyInput.id = "qty-" + productId;
			qtyInput.className = "product-qty";
			controlsWrap.appendChild(qtyInput);

			var addBtn = document.createElement("button");
			addBtn.type = "button";
			addBtn.className = "add-to-cart-btn";
			addBtn.appendChild(document.createTextNode("Add to Cart"));
			addBtn.onclick = (function(currentProductName) {
				return function() {
					addProductToCart(currentProductName);
				};
			})(productName);
			controlsWrap.appendChild(addBtn);

			itemRow.appendChild(controlsWrap);
			categoryGrid.appendChild(itemRow);
		}

		categorySection.appendChild(categoryGrid);
		s2.appendChild(categorySection);
	}
}

function addProductToCart(productName) {
	var productId = slugifyProductName(productName);
	var qtyInput = document.getElementById("qty-" + productId);
	var qty = parseInt(qtyInput.value, 10);
	if (!qty || qty < 1) {
		qty = 1;
		qtyInput.value = "1";
	}
	if (!cartItems[productName]) {
		cartItems[productName] = 0;
	}
	cartItems[productName] += qty;
	renderCart();
}

function removeFromCart(productName) {
	delete cartItems[productName];
	renderCart();
}

function selectedItems(){
	renderCart();
}

function renderCart() {
	var c = document.getElementById('displayCart');
	c.innerHTML = "";

	var productNames = Object.keys(cartItems);
	if (productNames.length === 0) {
		c.appendChild(document.createTextNode("Your cart is empty."));
		return;
	}

	var cartList = document.createElement("div");
	cartList.className = "cart-list";
	var chosenProducts = [];

	for (var i = 0; i < productNames.length; i += 1) {
		var name = productNames[i];
		var qty = cartItems[name];
		var product = null;
		for (var j = 0; j < products.length; j += 1) {
			if (products[j].name === name) {
				product = products[j];
				break;
			}
		}
		if (!product) {
			continue;
		}
		var lineTotal = (product.price * qty).toFixed(2);

		var cartRow = document.createElement("div");
		cartRow.className = "cart-item";

		if (product.image) {
			var cartImg = document.createElement("img");
			cartImg.src = product.image;
			cartImg.alt = name;
			cartImg.className = "product-image";
			cartRow.appendChild(cartImg);
		}

		var nameSpan = document.createElement("span");
		nameSpan.className = "cart-name";
		nameSpan.appendChild(document.createTextNode(name));
		cartRow.appendChild(nameSpan);

		var qtySpan = document.createElement("span");
		qtySpan.className = "cart-qty";
		qtySpan.appendChild(document.createTextNode("Qty: " + qty));
		cartRow.appendChild(qtySpan);

		var totalSpan = document.createElement("span");
		totalSpan.className = "cart-line-total";
		totalSpan.appendChild(document.createTextNode("$" + lineTotal));
		cartRow.appendChild(totalSpan);

		var removeBtn = document.createElement("button");
		removeBtn.type = "button";
		removeBtn.className = "cart-remove";
		removeBtn.setAttribute("aria-label", "Remove " + name);
		removeBtn.appendChild(document.createTextNode("Remove"));
		removeBtn.onclick = (function(currentProductName) {
			return function() {
				removeFromCart(currentProductName);
			};
		})(name);
		cartRow.appendChild(removeBtn);

		cartList.appendChild(cartRow);
		chosenProducts.push({ name: name, qty: qty });
	}

	c.appendChild(cartList);
	var total = document.createElement("p");
	total.className = "cart-total";
	total.appendChild(document.createTextNode("Total Price: $" + getTotalPrice(chosenProducts).toFixed(2)));
	c.appendChild(total);
}

window.onload = function() {
	renderCart();
	updatePriceFilter(document.getElementById("priceFilter").value);
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
