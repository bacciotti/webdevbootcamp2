var faker = require("faker");

console.log("===================================");
console.log(">>> WELCOME TO MY SHOP, MY DUDE <<<");
console.log("===================================");

for (i = 0; i < 13; i++){
    console.log(i + " -> " + faker.commerce.productName() + " - $" + faker.commerce.price());
}

console.log("===================================");
console.log("===================================");
