var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host:"localhost",
    port: 3307,
    user:"root",
    password:"ctechg5R",
    database:"bamazon"
})

connection.connect(function(err){
    console.log("Connected as id: "+connection.threadId);
})

function userPrompt() {
	// Prompt user to enter an item
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID for the item you would like to purchase.',
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'Please enter the quantity.',
			filter: Number
		}
	]).then(function(input) {

		var item = input.item_id;
		var quantity = input.quantity;

		// Query db to confirm that the given item ID exists in the desired quantity
		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please enter a valid Item ID.');
				displayInventory();

			} else {
				var productData = data[0];

				// If the quantity is available
				if (quantity <= productData.stock_quantity) {
					console.log('Placing order...');

					// Updating Query
					var updateQuery = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

					// Update the inventory
					connection.query(updateQuery, function(err, data) {
						if (err) throw err;

						console.log('Your oder has been confirmed. Your total is $' + productData.price * quantity);
						console.log('Thank you for your business!');
						console.log("\n-----------------------------------------\n");

						// End the database connection
						connection.end();
					})
				} else {
					console.log('Sorry, insufficent quantity!');
					console.log('Please change the quantity.');
					console.log("\n-----------------------------------------\n");

                    displayInventory();
				}
			}
		})
	})
}

var displayInventory = function(){
    queryStr = 'SELECT * from products';
    connection.query(queryStr, function(err, data){
        if (err) throw err;
        console.log('-------------------');
        console.log('Existing Inventory: ');
        console.log('-------------------\n');

        var inventory = '';
        for (var i = 0; i < data.length; i++) {
			inventory = '';
			inventory += 'Item ID: ' + data[i].item_id + ' | ';
			inventory += 'Product Name: ' + data[i].product_name + ' | ';
			inventory += 'Department: ' + data[i].department_name + ' | ';
            inventory += 'Price: $' + data[i].price + ' | ';
            inventory += 'Inventory: ' + data[i].stock_quantity + '\n';

            console.log(inventory);
        }    

        console.log("-----------------------------------------\n");

        //Prompt the user for order
        userPrompt();    
    })
}

function start() {
	displayInventory();
}
// Run the application 
start();
