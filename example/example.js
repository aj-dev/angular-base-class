angular.module('App', ['BaseClass'])
	.factory('Mammal', ['BaseClass', function (BaseClass) {
		return BaseClass.extend({
			setAge: function (age) {
				this.age = age;
			},
			getAge: function () {
				return this.age;
			}
		});
	}])
	.factory('Dog', ['Mammal', function (Mammal) {
		return Mammal.extend({
			constructor: function () {
				this._super('constructor', arguments);
			},
			setAge: function (age) {
				this._super('setAge', age + 10);
			},
			getAge: function () {
				return 'Dog is ' + this._super('getAge') + ' years old';
			}
		})
	}])
	.factory('MammalMixin', [function () {
		return {
			grow: function (number) {
				this.age += number;
			},
			getName: function () {
				return this.name;
			}
		};
	}])
	.factory('Cat', ['Mammal', 'MammalMixin', function (Mammal, mammalMixin) {
		return Mammal.extend({
			constructor: function (args) {
				this._super('constructor', args);
				this.name = args.name
			},
			mixins: [mammalMixin]
		})
	}])
	.controller('Ctrl', ['$scope', 'Dog', 'Cat', function ($scope, Dog, Cat) {
		$scope.dog = new Dog({age: 3, name: 'Max'});
		$scope.cat1 = new Cat({age: 5, name: 'Meow'});
		$scope.cat1.grow(5);
		$scope.cat2 = new Cat({age: 5, name: 'Meow'});
		$scope.cat2.grow(5);
	}]);
