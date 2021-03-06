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
  // To find lowest common multiple, you can take all the numbers in your set and find their prime factors.
  // For example, 20 = 2 * 2 * 5 = 2^2 * 5
  // And so on for 19, 18, 17, etc.
  // Then you take the highest exponent of 2 you found, the highest exponent of 3, and so on for all the prime factors you found.
  // Multiplying them together gives you the LCM.
  // But an even smarter way to do this, which I found online, is to check what the largest exponent of each prime is that fits in your set.
  // e.g. 2^4 is 16, which is in your set, but 2^5 is 32, which is not in your set.
  // 3^2 is 9, which is in your set, but 3^3 is 27, which isn't.
  // for 5, 7, 11, 13, 17, 19, the highest possible exponent is 1.
  //
  // This works because it's guaranteed to "cover" the highest possible exponent of every number in your set. So smart!
  //
  // So the LCM of all numbers from 1 to 20 = 2^4 * 3^2 * 5 * 7 * 11 * 13 * 17 * 19 = 232792560.

  // Let's try doing that in code.

  var isPrime = function(num) {

	var array = _.range(2,Math.floor(num/2)+1);
  	var answer = array.reduce(function(memo, x) { 
  												if(num % x === 0) { return false; } else { return memo; }
  												}, 
  												true
  												);

  	return answer;

  }

  var generateListOfApplicablePrimes = function(num) { 
  	var primelist = _.range(2,num+1)
	  	.reduce(function(memo, x) {
	  		if(isPrime(x)) { 
	  			memo.push(x); 
	  		}
	  		return memo; 
	  	}, []
	  	);
	return primelist;  	
  }

  var findBiggestExponentUnder20 = function(num) {
  	var temp = num;
  	while(temp<=20) {
  		temp = temp*num;
  	}
  	return temp/num;
  }

  var primeFactors = generateListOfApplicablePrimes(20);
  var keyFactors = _(primeFactors).map(function(x) { return findBiggestExponentUnder20(x); });
  var lcm1to20 = _(keyFactors).reduce(function(memo, x) {
  	return memo * x;
  }, 1
  );

	expect(lcm1to20).toBe(232792560);      
    
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    
  	// This will be a function that takes an array of numbers

  	var differator = function(array) {
  		var squared = _(array).map(function(x) { return x**2 });
  		var sumOfSquares = _(squared).reduce(function(memo, x) { return memo + x; }, 0);
  		var squareOfSums = (_(array).reduce(function(memo, x) { return memo + x; }, 0))**2;
  		return sumOfSquares-squareOfSums;
  	}


	expect(differator([1,2,3])).toBe(-22);

  });

  it("should find the 10001st prime", function () {

  	// I can't think of a better way to do this, so I'm going to use Sieve of Erasthocenes to reduce a really big array of integers.

  	var isNotAHigherMultipleOf = function(num, factor) {
  		return !((num !== factor) && (num%factor===0));
  	}


  	var primes = [];
  	var nums = _.range(2, 200000);

  	while(nums.length > 0) {
  		firstNumber = nums[0];
  		nums = _(nums).filter(function(x) { return isNotAHigherMultipleOf(x, firstNumber); })
  		newPrime = nums.shift();
  		primes.push(newPrime);
  	}

  	// Is there any way to replicate "while" functionality in Underscore?

	expect(primes[10000]).toBe(104743);

  });

});
