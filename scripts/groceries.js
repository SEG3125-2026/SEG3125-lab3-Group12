	
// Given restrictions provided, make a reduced list of products - Completed
// Prices should be included in this list, as well as a sort based on price - Completed.

// Array of products, each product is an object with different fieldset
var products = [
	{
		name: "broccoli",
		category: "fruit and vegetable",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		organic: true,
		price: 1.99,
		image: "https://cdn.britannica.com/25/78225-050-1781F6B7/broccoli-florets.jpg"
	},
	{
		name: "wheat bread",
		category: "bread and bakery",
		vegetarian: true,
		glutenFree: false,
		lactoseFree: true,
		price: 2.35,
		organic: false,
		image: "https://thumbs.dreamstime.com/b/fresh-square-slice-bread-made-white-wheat-flour-isolated-background-186186771.jpg"
	},
	{
		name: "salmon",
		category: "fish and seafood",
		vegetarian: false,
		glutenFree: true,
		lactoseFree: true,
		price: 10.00,
		organic: true,
		image: "https://gdimg.gmarket.co.kr/1977401587/still/400?ver=1768022396"
	},
	{
		name: "pasta",
		category: "pantry",
		vegetarian: true,
		glutenFree: false,
		lactoseFree: true,
		price: 3.50,
		organic: false,
		image: "https://digital.loblaws.ca/PCX/20081342001_EA/en/1/20081342001_en_front_400.png"
	},
	{
		name: "salted butter",
		category: "dairy and eggs",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: false,
		price: 6.00,
		organic: false,
		image: "https://product-images.metro.ca/images/h67/hfe/13653330722846.jpg",
	},
	{
		name: "vanilla yogurt",
		category: "dairy and eggs",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: false,
		price: 5.25,
		organic: false,
		image: "https://product-images.metro.ca/images/he4/h68/14056292712478.jpg",
	},
	{
		name: "greek yogurt",
		category: "dairy and eggs",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: false,
		price: 5.75,
		organic: true,
		image: "https://product-images.metro.ca/images/h8c/h8a/12175335555102.jpg",
	},
	{
		name: "sugar",
		category: "pantry",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 3.50,
		organic: false,
		image: "https://product-images.metro.ca/images/hb6/h71/10715270873118.jpg",
	},
	{
		name: "flour",
		category: "pantry",
		vegetarian: true,
		glutenFree: false,
		lactoseFree: true,
		price: 4.00,
		organic: false,
		image: "https://product-images.metro.ca/images/h2e/h6d/9906394890270.jpg",
	},
	{
		name: "canned tomato soup",
		category: "pantry",
		vegetarian: true,
		glutenFree: false,
		lactoseFree: false,
		price: 1.99,
		organic: false,
		image: "https://product-images.metro.ca/images/hb2/h91/16086681681950.jpg",
	},
	{
		name: "peanut butter",
		category: "pantry",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 8.00,
		organic: false,
		image: "https://product-images.metro.ca/images/h87/h5b/16043500044318.jpg",
	},
	{
		name: "olive oil",
		category: "pantry",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 12.99,
		organic: false,
		image: "https://product-images.metro.ca/images/h31/hfe/12856062148638.jpg",
	},
	{
		name: "rice",
		category: "pantry",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 3.00,
		organic: false,
		image: "https://product-images.metro.ca/images/hcc/hb0/9458920914974.jpg",
	},
	{
		name: "orange juice",
		category: "beverages",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 7.00,
		organic: true,
		image: "https://product-images.metro.ca/images/h13/h5c/15733704785950.jpg",
	},
	{
		name: "apple juice",
		category: "beverages",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 2.99,
		organic: false,
		image: "https://product-images.metro.ca/images/he6/h0a/15421610197022.jpg",
	},
	{
		name: "chicken breast",
		category: "meat and poultry",
		vegetarian: false,
		glutenFree: true,
		lactoseFree: true,
		price: 11.40,
		organic: true,
		image: "https://product-images.metro.ca/images/hc6/h13/14430324883486.jpg",
	},
	{
		name: "ground beef",
		category: "meat and poultry",
		vegetarian: false,
		glutenFree: true,
		lactoseFree: true,
		price: 9.50,
		organic: false,
		image: "https://product-images.metro.ca/images/h4d/hed/14889066070046.jpg",
	},
	{
		name: "pork tenderloin",
		category: "meat and poultry",
		vegetarian: false,
		glutenFree: true,
		lactoseFree: true,
		price: 22.00,
		organic: true,
		image: "https://product-images.metro.ca/images/h9c/h17/15025501765662.jpg",
	},
	{
		name: "bacon",
		category: "meat and poultry",
		vegetarian: false,
		glutenFree: true,
		lactoseFree: true,
		price: 6.00,
		organic: false,
		image: "https://product-images.metro.ca/images/hc2/h08/15316077772830.jpg",
	},
	{
		name: "hummus",
		category: "vegan and vegetarian",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 5.50,
		organic: true,
		image: "https://product-images.metro.ca/images/h5a/hc0/15966389207070.jpg",
	},
	{
		name: "almond beverage",
		category: "vegan and vegetarian",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 5.00,
		organic: false,
		image: "https://product-images.metro.ca/images/h28/hcb/11574093742110.jpg",
	},
	{
		name: "tempeh",
		category: "vegan and vegetarian",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 6.00,
		organic: true,
		image: "https://product-images.metro.ca/images/h34/h08/10009375244318.jpg",
	},
	{
		name: "everything bagel",
		category: "bread and bakery",
		vegetarian: true,
		glutenFree: false,
		lactoseFree: true,
		price: 4.70,
		organic: false,
		image: "https://product-images.metro.ca/images/hd6/h4b/14269472538654.jpg",
	},
	{
		name: "tortilla",
		category: "bread and bakery",
		vegetarian: true,
		glutenFree: false,
		lactoseFree: true,
		price: 5.00,
		organic: false,
		image: "https://product-images.metro.ca/images/h09/h31/15828549697566.jpg",
	},
	{
		name: "hamburger buns",
		category: "bread and bakery",
		vegetarian: true,
		glutenFree: false,
		lactoseFree: true,
		price: 3.50,
		organic: false,
		image: "https://product-images.metro.ca/images/he2/h2c/13653542764574.jpg",
	},
	{
		name: "shrimp",
		category: "fish and seafood",
		vegetarian: false,
		glutenFree: true,
		lactoseFree: true,
		price: 11.00,
		organic: false,
		image: "https://product-images.metro.ca/images/h22/h44/14276480827422.jpg",
	},
	{
		name: "trout",
		category: "fish and seafood",
		vegetarian: false,
		glutenFree: true,
		lactoseFree: true,
		price: 6.50,
		organic: false,
		image: "https://product-images.metro.ca/images/hea/had/15133513023518.jpg",
	},
	{
		name: "tofu",
		category: "vegan and vegetarian",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 4.25,
		organic: true,
		image: "https://product-images.metro.ca/images/h7b/h1d/15974929268766.jpg"
	},
	{
		name: "milk",
		category: "dairy and eggs",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: false,
		price: 3.10,
		organic: false,
		image: "https://g-mart.ca/wp-content/uploads/2020/10/large_2f483bf3-bde7-47d8-9d3b-709ec6c84292-600x600.jpeg"
	},
	{
		name: "lactose-free milk",
		category: "dairy and eggs",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 3.80,
		organic: false,
		image: "https://media.sobeys.com/original/754000000025700000000035003880_VOILA_a6d79b735430f152a0b94c942ddd17b91bc7668e.JPG"
	},
	{
		name: "cheddar cheese",
		category: "dairy and eggs",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: false,
		price: 5.40,
		organic: false,
		image: "https://images.cdn.saveonfoods.com/detail/00058898540030.jpg"
	},
	{
		name: "eggs",
		category: "dairy and eggs",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 2.75,
		organic: true,
		image: "https://thumbs.dreamstime.com/b/carton-box-white-eggs-isolated-png-transparent-269959810.jpg"
	},
	{
		name: "instant coffee",
		category: "pantry",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 6.50,
		organic: false,
		image: "https://media.istockphoto.com/id/1086186896/photo/instant-coffee-in-glass-jar.jpg?b=1&s=612x612&w=0&k=20&c=EVTaQSjU_XwsVZPy2dWl0Ibd2u5V5_C2JD-QvP5lA8w=",
	},
	{
		name: "strawberries",
		category: "fruit and vegetable",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 6.00,
		organic: true,
		image: "https://product-images.metro.ca/images/he6/hc6/10723487842334.jpg",
	},
	{
		name: "banana",
		category: "fruit and vegetable",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 0.40,
		organic: false,
		image: "https://product-images.metro.ca/images/hec/h10/11860660486174.jpg",
	},
	{
		name: "lettuce",
		category: "fruit and vegetable",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 4.99,
		organic: false,
		image: "https://product-images.metro.ca/images/h72/had/8907059920926.jpg",
	},
	{
		name: "lemon",
		category: "fruit and vegetable",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 1.25,
		organic: true,
		image: "https://product-images.metro.ca/images/h91/h15/11521108770846.jpg",
	},
	{
		name: "baby carrots",
		category: "fruit and vegetable",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 3.00,
		organic: true,
		image: "https://product-images.metro.ca/images/hef/ha8/14378068967454.jpg",
	},
	{
		name: "red onion",
		category: "fruit and vegetable",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 1.75,
		organic: false,
		image: "https://product-images.metro.ca/images/hcd/hfa/8833147404318.jpg",
	},
	{
		name: "tomatoes",
		category: "fruit and vegetable",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 6.00,
		organic: true,
		image: "https://product-images.metro.ca/images/h81/h2a/9276940845086.jpg",
	},
	{
		name: "granola bars",
		category: "pantry",
		vegetarian: true,
		glutenFree: false,
		lactoseFree: true,
		price: 6.25,
		organic: false,
		image: "https://www.naturevalley.com/_next/image?url=https%3A%2F%2Fmojo.generalmills.com%2Fapi%2Fpublic%2Fcontent%2F-jR1jTBNekyS7JxMmPMXig_04c57eea-66a2-45cd-a3f2-ecd27146a451_04c57eea-66a2-45cd-a3f2-ecd27146a451.png%3Fv%3Dca2cfb07%26t%3D04c57eea66a245cda3f2ecd27146a451&w=768&q=75",
	},
	{
		name: "apples",
		category: "fruit and vegetable",
		vegetarian: true,
		glutenFree: true,
		lactoseFree: true,
		price: 1.50,
		organic: false,
		image: "https://hips.hearstapps.com/hmg-prod/images/red-fresh-apple-isolated-on-white-background-royalty-free-image-1627314996.jpg?crop=1.00xw:0.923xh;0,0.0486xh"
	},
	{
		name: "almonds",
		category: "pantry",
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
		if (preferences.catFilter === "Fruit and Vegetable" && prods[i].category != "fruit and vegetable"){
			include = false;
		}
		if (preferences.catFilter === "Dairy and Eggs" && prods[i].category != "dairy and eggs"){
			include = false;
		}
		if (preferences.catFilter === "Pantry" && prods[i].category != "pantry"){
			include = false;
		}
		if (preferences.catFilter === "Beverages" && prods[i].category != "beverages"){
			include = false;
		}
		if (preferences.catFilter === "Meat and Poultry" && prods[i].category != "meat and poultry"){
			include = false;
		}
		if (preferences.catFilter === "Vegan and Vegetarian" && prods[i].category != "vegan and vegetarian"){
			include = false;
		}
		if (preferences.catFilter === "Bread and Bakery" && prods[i].category != "bread and bakery"){
			include = false;
		}
		if (preferences.catFilter === "Fish and Seafood" && prods[i].category != "fish and seafood"){
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
