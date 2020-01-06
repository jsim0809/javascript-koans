var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      var productsICanEat = _(products).filter(function(food){ return !food.containsNuts; });

      var isMushrooms = function(ingredient) { return ingredient === "mushrooms"};

      var productsICanEat = _(productsICanEat).filter(function(food){ return !_(food.ingredients).any(isMushrooms) });


      /* solve using filter() & all() / any() */

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _.range(1, 1000)
    	.reduce(function(memo, x) { if (x % 3 === 0 || x % 5 === 0 ) { return memo + x; } else { return memo + 0; } }, 0);    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */

    _(products).chain()
    	.map(function(food) { return food.ingredients })
    	.flatten()
	    .reduce(function(memo, ingredient){ ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) +1 }, "");

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
  
  	var findFactors = function(num) {
  		var withOne= _.range(1, num)
			  			.filter(function(x) { return num%x === 0 });
			withOne.shift();
		return withOne;
  	}

  	var isAHigherMultipleOf = function(num, factor) {
  		return num/factor>1 && num%factor===0;
  	}

  	var isAHigherMultipleOfAnythingInAnArray = function(num, array) {
  		var isIt = false;
  		_(array).forEach(function(x){ if(isAHigherMultipleOf(num, x)) { isIt = true; } });
  		return isIt;
  	}


  	var findLPF = function(num) {
  		var allFactors = findFactors(num);
  		var allFactors2 = findFactors(num);
	  	var primeFactors = [];
  		_(allFactors2).forEach(function(x) { if(!isAHigherMultipleOfAnythingInAnArray(x, allFactors)) { primeFactors.push(x); } });
  		return primeFactors.pop();
  	}

	expect(findLPF(200)).toBe(5);

  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    
  	var isPalindrome = function(num) {
  		var string = num.toString();
  		var reversed = string.split('').reverse().join('');
  		return string === reversed;
  	}

  	var palindromes = [];

  	_.range(100,1000)
  		.forEach(function(x) { _.range(100,1000)
  									.forEach(function(y) { if (isPalindrome(x*y)) {
  										palindromes.push(x*y);
  									}
  								})
  								});

  	var largestPalindrome = palindromes.pop();

	expect(largestPalindrome).toBe(580085);

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {

	expect(1).toBe(2);      
    
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    
	expect(1).toBe(2);

  });

  it("should find the 10001st prime", function () {

	expect(1).toBe(2);

  });
  
});
