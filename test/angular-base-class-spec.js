/* globals: beforeEach, describe, it, module, inject, expect */
describe('BaseClass', function () {

	var BaseClass, Human, Man, Woman, Child, humanInstance, manInstance, womanInstance, childInstance;

	createSubclasses = function () {

		Human = BaseClass.extend({
			getName: function () {
				return this.name;
			},
			getAge: function () {
				return this.age;
			}
		});

		Man = Human.extend({
			constructor: function () {
				this._super('constructor', arguments);
				this.isYoung = false;
			},
			checkAge: function () {
				if (this.age < 18) {
					this.isYoung = true;
				}
			},
			mixins: [{
				getNameLength: function () {
					return this.name.length;
				}
			}]
		});

		Woman = Man.extend({
			constructor: function () {
				this._super('constructor', arguments);
			},
			isFemale: function () {
				return this.sex === 'female';
			},
			checkAge: function () {
				this._super('checkAge');

				if (this.age < 25) {
					this.isYoung = true;
				}
			},
			find: function () {
				this._super('find');
			},
			mixins: [{
				getSex: function () {
					return this.sex;
				},
				getNameLength: function () {
					return 10;
				}
			}]
		});

		humanInstance = new Human({
			name: 'Homo sapien',
			age: 30
		});

		manInstance = new Man({
			name: 'John',
			age: 40,
			sex: 'male'
		});

		womanInstance = new Woman({
			name: 'Jenny',
			age: 20,
			sex: 'female'
		});
	};

	beforeEach(module('BaseClass'));

	beforeEach(inject(function ($injector) {
		BaseClass = $injector.get('BaseClass');
	}));

	beforeEach(createSubclasses);

	describe('when Human instance is created', function () {
		it('should use BaseClass constructor', function () {
			expect(humanInstance.name).toEqual('Homo sapien');
			expect(humanInstance.age).toEqual(30);
		});

		it('should be an instance of BaseClass and instance of Human', function () {
			expect(humanInstance instanceof Human).toBe(true);
			expect(humanInstance instanceof BaseClass).toBe(true);
		});

		it('should have prototype methods implemented', function () {
			expect(humanInstance.getName()).toEqual('Homo sapien');
			expect(humanInstance.getAge()).toEqual(30);
		});
	});

	describe('when Man instane is created', function () {
		it('should use its own constructor', function () {
			expect(manInstance.isYoung).toBe(false);
		});

		it('should also call `_super` constructor of the ancestor class', function () {
			expect(manInstance.name).toEqual('John');
			expect(manInstance.age).toEqual(40);
		});
	});

	describe('mixin usage', function () {
		it('should extend SubClass with mixin methods', function () {
			expect(manInstance.getNameLength()).toBe(4);
		});

		it('should not override SubClass mixins', function () {
			expect(womanInstance.getNameLength()).toBe(5);
			expect(womanInstance.getSex()).toEqual('female');
		});
	});

	describe('error handling', function () {
		it('should throw error when calling non-existent super method', function () {
			expect(function () {
				womanInstance.find();
			}).toThrowError('Could not find property "find"');
		});

		it('should throw error when "attributes" provided to constructor is not an object', function () {
			expect(function () {
				var alienInstance = new Human('alien');
			}).toThrowError('arguments provided to constructor must be a key/value pair object!');
		});
	});
});
