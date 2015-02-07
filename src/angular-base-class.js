angular.module('BaseClass', [])
	.factory('BaseClass', function () {

		'use strict';

		var findObjectOfProperty = function (start, propName) {
			while (true) {
				if (!start) {
					throw Error('Could not find property ' + propName);
				}

				if (start.hasOwnProperty(propName)) {
					return start;
				}

				start = Object.getPrototypeOf(start);
			}
		};

		// BaseClass constructor
		var BaseClass = function (attributes) {
			angular.extend(this, attributes);
		};

		BaseClass.extend = function (properties) {

			var Class = this,
				SubClass;

			if (angular.isObject(properties) && properties.hasOwnProperty('constructor')) {
				SubClass = properties.constructor;
			} else {
				SubClass = function () {
					return Class.apply(this, arguments);
				}
			}

			SubClass.extend = Class.extend;

			// Creates new Object based on Class prototype.
			SubClass.prototype = Object.create(Class.prototype, {
				constructor: { // Sets correct constructor on a SubClass prototype.
					writable: true,
					value: SubClass
				},
				_super: { // In case we need to access Class prototype from within a SubClass prototype.
					value: function (method, args) {
						var __super, previousSuper, start, superObject, returnValue;

						__super = '__super__' + method;

						previousSuper = this[__super];

						start = Object.getPrototypeOf(
							previousSuper ? previousSuper : findObjectOfProperty(this, method) // where is the current method?
						);

						superObject = findObjectOfProperty(start, method);

						this[__super] = superObject;

						returnValue = superObject[method].apply(this, args);

						if (previousSuper) {
							this[__super] = previousSuper;
						} else {
							delete this[__super];
						}

						return returnValue;
					}
				}
			});

			angular.extend(SubClass.prototype, properties); // Extends SubClass prototype with supplied properties.

			if (Array.isArray(properties.mixins)) { // Add any mixin methods to SubClass prototype.

				properties.mixins.forEach(function (mixin) {
					for (var prop in mixin) {
						if (angular.isFunction(mixin[prop]) && angular.isUndefined(SubClass.prototype[prop])) {
							SubClass.prototype[prop] = mixin[prop];
						}
					}
				});
			}

			return SubClass;
		};

		return BaseClass;
	});