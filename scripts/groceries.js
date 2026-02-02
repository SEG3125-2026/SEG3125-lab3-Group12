	
// Given restrictions provided, make a reduced list of products - Completed
// Prices should be included in this list, as well as a sort based on price - Completed.

// Array of products, each product is an object with different fieldset
var products = [
	{
		name: "broccoli",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		organic: true,
		price: 1.99,
		image: "https://cdn.britannica.com/25/78225-050-1781F6B7/broccoli-florets.jpg"
	},
	{
		name: "wheat bread",
		vegetarian: true,
		glutenFree: false,
		lactoseFree: true,
		price: 2.35,
		organic: false,
		image: "https://thumbs.dreamstime.com/b/fresh-square-slice-bread-made-white-wheat-flour-isolated-background-186186771.jpg"
	},
	{
		name: "salmon",
		vegetarian: false,
		glutenFree: true,
		lactoseFree: true,
		price: 10.00,
		organic: true,
		image: "https://gdimg.gmarket.co.kr/1977401587/still/400?ver=1768022396"
	},
	{
		name: "pasta",
		vegetarian: true,
		glutenFree: false,
		lactoseFree: true,
		price: 3.50,
		organic: false,
		image: "https://digital.loblaws.ca/PCX/20081342001_EA/en/1/20081342001_en_front_400.png"
	},
	{
		name: "tofu",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 4.25,
		organic: true,
		image: "https://product-images.metro.ca/images/h7b/h1d/15974929268766.jpg"
	},
	{
		name: "milk",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: false,
		price: 3.10,
		organic: false,
		image: "https://g-mart.ca/wp-content/uploads/2020/10/large_2f483bf3-bde7-47d8-9d3b-709ec6c84292-600x600.jpeg"
	},
	{
		name: "lactose-free milk",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 3.80,
		organic: false,
		image: "https://media.sobeys.com/original/754000000025700000000035003880_VOILA_a6d79b735430f152a0b94c942ddd17b91bc7668e.JPG"
	},
	{
		name: "cheddar cheese",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: false,
		price: 5.40,
		organic: false,
		image: "https://images.cdn.saveonfoods.com/detail/00058898540030.jpg"
	},
	{
		name: "eggs",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 2.75,
		organic: true,
		image: "https://thumbs.dreamstime.com/b/carton-box-white-eggs-isolated-png-transparent-269959810.jpg"
	},
	{
		name: "apples",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 1.50,
		organic: false,
		image: "https://hips.hearstapps.com/hmg-prod/images/red-fresh-apple-isolated-on-white-background-royalty-free-image-1627314996.jpg?crop=1.00xw:0.923xh;0,0.0486xh"
	},
	{
		name: "almonds",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 6.20,
		organic: true,
		image: "https://digital.loblaws.ca/PCX/20500386003_EA/en/1/20500386003_en_front_800.png"
	}
]

// Return a filtered list of products sorted by price (ascending)
function restrictListProducts(prods, preferences) {
	let filtered = [];
	for (let i = 0; i < prods.length; i += 1) {
		let include = true;
		if (preferences.vegetarian && !prods[i].vegetarian) {
			include = false;
		}
		if (preferences.glutenFree && !prods[i].glutenFree) {
			include = false;
		}
		if (preferences.lactoseFree && !prods[i].lactoseFree) {
			include = false;
		}
		if (preferences.organicPreference === "Organic" && !prods[i].organic) {
			include = false;
		}
		if (preferences.organicPreference === "Non-Organic" && prods[i].organic) {
			include = false;
		}
		if (include) {
			filtered.push(prods[i]);
		}
	}
	filtered.sort(function(a, b) {
		return a.price - b.price;
	});
	return filtered;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	for (let i = 0; i < chosenProducts.length; i += 1) {
		for (let j = 0; j < products.length; j += 1) {
			if (chosenProducts[i].name === products[j].name) {
				totalPrice += products[j].price * chosenProducts[i].qty;
				break;
			}
		}
	}
	return totalPrice;
}
