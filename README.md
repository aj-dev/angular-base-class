angular-base-class
==================

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

## Key features
- Constructor definition is optional
- Uses ```._super('methodName', arguments)``` to call super class methods
- Supports multiple inheritance by resolving correct ```this``` context in ```super()``` calls
- Mixins can be injected and used by adding them to ```.mixins: []```
- Compatible with AngularJS 1.2.x and 1.3.x

## Installation
- ```bower install angular-class --save```

## Usage
- Include angular-base-class.min.js in your project
- Add module ```BaseClass``` as dependency to your AngularJS app

##### Default constructor
```js
angular.module('app', ['BaseClass'])
	.factory('Mammal', function (BaseClass) {
		return BaseClass.extend({
			setAge: function (age) {
				this.age = age;
			},
			getAge: function () {
				return this.age;
			}
		});
	})
	.factory('Dog', ['Mammal', function (Mammal) {
		return Mammal.extend({
			setAge: function (age) {
				this._super('setAge', age + 10);
			},
			getAge: function () {
				return 'Dog is ' + this._super('getAge') + ' years old';
			}
		})
	}]);
```

##### Custom constructor
```js
angular.module('app', ['BaseClass'])
	.factory('Mammal', function (BaseClass) {
		return BaseClass.extend({
			constructor: function (age) {
				this.age = age;
			},
			setAge: function (age) {
				this.age = age;
			},
			getAge: function () {
				return this.age;
			}
		});
	})
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
	}]);
```

##### With mixins
```js
angular.module('app', ['BaseClass'])
	.factory('MammalMixin', function () {
		return {
			grow: function (number) {
				this.age += number;
			},
			getName: function () {
				return this.name;
			}
		};
	});
	.factory('Mammal', ['BaseClass', 'MammalMixin', function (BaseClass, mammalMixin) {
		return BaseClass.extend({
			constructor: function (name, age) {
				this.name = name;
				this.age = age;
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
	}]);
```

## Running tests
- Get the source code
- ```npm-install```
- ```grunt test```

## Credits
When creating this repo some ideas were borrowed from the following:
- Axel Rauschmayer - http://www.2ality.com/
- http://backbonejs.org/  