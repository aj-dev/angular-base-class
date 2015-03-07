# angular-base-class
[![Build Status](https://travis-ci.org/aj-dev/angular-base-class.svg?branch=master)](https://travis-ci.org/aj-dev/angular-base-class) [![Dependencies](https://david-dm.org/aj-dev/angular-base-class.svg)](https://david-dm.org/aj-dev/angular-base-class#info=dependencies&view=table) [![DevDependencies](https://david-dm.org/aj-dev/angular-base-class/dev-status.svg)](https://david-dm.org/aj-dev/angular-base-class#info=devDependencies&view=table) [![Coverage Status](https://coveralls.io/repos/aj-dev/angular-base-class/badge.svg)](https://coveralls.io/r/aj-dev/angular-base-class)

An AngularJS factory for simple class based inheritance

## Table of contents
1. [Key features](#key-features)
2. [Installation](#installation)
3. [Usage](#usage)
	- [Default constructor](#default-constructor)
	- [Custom constructor](#custom-constructor)
	- [With mixins](#with-mixins)
4. [Running tests](#running-tests)
5. [Credits](#credits)
6. [License](#license)

## Key features
- Constructor definition is optional
- Uses ```this._super('methodName', arguments)``` to call super class methods
- Supports multiple inheritance by resolving correct ```this``` context in ```super()``` calls
- Mixins can be injected and used by adding them to ```mixins: []```
- Does not override inherited mixins
- Compatible with AngularJS 1.2.x and 1.3.x

## Installation
- ```bower install angular-base-class --save```

## Usage
- Include angular-base-class.min.js in your project
- Add module ```BaseClass``` as dependency to your AngularJS app

##### Default constructor
```js
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
			setAge: function (age) {
				this._super('setAge', age + 10);
			},
			getAge: function () {
				return 'Dog is ' + this._super('getAge') + ' years old';
			}
		})
	}])
	.controller('Ctrl', ['$scope', 'Dog', function ($scope, Dog) {
		$scope.dog = new Dog({age: 5});
		$scope.dog.getAge(); // Dog is 5 years old
		$scope.dog.setAge(8);
		$scope.dog.getAge(); // Dog is 18 years old
	}]);
```

##### Custom constructor
```js
angular.module('App', ['BaseClass'])
	.factory('Mammal', ['BaseClass', function (BaseClass) {
		return BaseClass.extend({
			constructor: function (args) {
				this.age = args.age + 1;
			},
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
			},
		})
	}])
	.controller('Ctrl', ['$scope', 'Dog', function ($scope, Dog) {
		$scope.dog = new Dog({age: 5});
		$scope.dog.getAge(); // Dog is 6 years old
		$scope.dog.setAge(8);
		$scope.dog.getAge(); // Dog is 18 years old
	}]);
```

##### With mixins
```js
angular.module('App', ['BaseClass'])
	.factory('MammalMixin', [function () {
		return {
			grow: function (number) {
				this.age += number;
			},
			getName: function () {
				return this.name;
			}
		};
	}]);
	.factory('Mammal', ['BaseClass', 'MammalMixin', function (BaseClass, mammalMixin) {
		return BaseClass.extend({
			constructor: function (args) {
				this.name = args.name;
				this.age = args.age;
			},
			setAge: function (age) {
				this.age = age;
			},
			getAge: function () {
				return this.age;
			},
			mixins: [mammalMixin]
		});
	}])
	.factory('Cat', ['Mammal', function (Mammal) {
		return Mammal.extend({
			getAgeAndName: function () {
				return 'Age: ' + this.getAge() + ' Name: ' + this.getName();
			}
		});
	}])
	.controller('Ctrl', ['$scope', 'Cat', function ($scope, Cat) {
		$scope.dog = new Cat({name: 'Meow', age: 5});
		$scope.dog.getAge(); // 5
		$scope.dog.setAge(8);
		$scope.dog.getAge(); // 8
		$scope.dog.getName(); // Meow
		$scope.dog.getAgeAndName(); // Age: 8 Name: Meow
		$scope.dog.grow(2);
		$scope.dog.getAge(); // 10

	}]);
```

## Running tests
- Get the source code
- ```npm install```
- ```grunt test```

## Credits
Some ideas were borrowed from the following:
- Axel Rauschmayer - http://www.2ality.com/
- http://backbonejs.org/

## License
Licensed under the MIT license. Copyright (c) 2015 Audrius Jakumavicius
