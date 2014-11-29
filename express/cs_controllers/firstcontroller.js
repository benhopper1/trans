angular.module('invoice1', [])
	.controller('InvoiceController', ['$scope', '$http', function($scope, $http) {
		var _this = this;
		this.qty = 150;
		this.cost = 2;
		this.inCurr = 'EUR';
		this.currencies = ['USD', 'EUR', 'CNY'];
		this.usdToForeignRates = {
			USD: 1,
			EUR: 0.74,
			CNY: 6.09
		};

		this.total = function total(outCurr) {
			return this.convertCurrency(this.qty * this.cost, this.inCurr, outCurr);
		};

		this.convertCurrency = function convertCurrency(amount, inCurr, outCurr) {
			return amount * this.usdToForeignRates[outCurr] / this.usdToForeignRates[inCurr];
		};
		
		this.pay = function pay() {
			window.alert("Thanks!");
		};

		this.getName = function(){
			return "hopper" + this.cost;
		}

		this.getRest = function() {
			$http.post('/testrest', {name:'ben'}).success(function(data){
				$scope.talker = data;
			});
		}

		this.getRest2 = function() {
			$http.get('cs_models/firstmodel.js').success(function(data){
				//console.log(data);
				var funcId = uuid.newguid();
				//$scope.Model = eval(data);
				var data = data.replace('Model',funcId);
				console.log('------------------------------');
				//console.log(data);
				console.log(uuid.newguid());
				//$scope.talker = data;
			});
		}

		this.model = function(){

		}

		$scope.talker = "talker thingy";
		_this.getRest();

		$scope.model = new function(){
			this.name = "mr hopper";
			this.getName = function(){
				return "Mr. Ben Hopper";
			}
		}
		_this.getRest2();

	}]);