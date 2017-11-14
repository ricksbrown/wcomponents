/**
 * Provides a basic level of abstraction away from the ever-changing and somewhat annoying Custom Element spec.
 */
define(["lib/vue/vue"], function(Vue) {
	var replace = true,
		useVue = window.localStorage["wc/ui/renderer/vue"] === "true";
	/**
	 * Helper for createElement - sets attributes on an Element from a provided associative array.
	 * @param {Element} element The element on which the attributes are to be set.
	 * @param {Object} attrs key/value pairs of attributes to set.
	 */
	function setAttributes(element, attrs) {
		var attrName;
		if (attrs) {
			for (attrName in attrs) {
				if (attrs.hasOwnProperty(attrName)) {
					element.setAttribute(attrName, attrs[attrName]);
				}
			}
		}
	}

	/**
	 * Takes the attributes from an Element and turns them into a key/value map for easy lookup.
	 * @param {Element} element The element which may contain attributes to map.
	 * @param {Object} [obj] Optionally the attributes will be mapped onto this object.
	 * @returns {Object} A map of attributes set on this Element.
	 */
	function extractAttributes(element, obj) {
		var result = obj || {}, next, nextName, attrs, i;
		if (element) {
			attrs = element.attributes;
			if (attrs) {
				for (i = 0; i < attrs.length; i++) {
					next = attrs[i];
					nextName = next.name;  // .toLowerCase();
					if (next.value) {
						if (next.value === "true") {
							result[nextName] = true;
						} else if (next.value === "false") {
							result[nextName] = false;
						} else {
							result[nextName] = next.value;
						}
					} else {
						result[nextName] = true;  // The attribute is true because it is present
					}
				}
			}
		}
		return result;
	}

	/**
	 * Creates a new Element.
	 * @param {string} name The node name.
	 * @param {Object} elementConfig additional element attributes, properties etc.
	 * @param {Element[]} childNodes Nodes to append to the newly created Element
	 * @returns {Element} The newly created element.
	 */
	function createElement(name, elementConfig, childNodes) {
		var element = document.createElement(name);
		if (elementConfig) {
			setAttributes(element, elementConfig.attrs);
		}
		if (childNodes && childNodes.length) {
			childNodes.forEach(function(next) {
				element.appendChild(next);
			});
		}
		return element;
	}

	function importKids(from, to) {
		while (from.firstChild) {
			if (to.appendChild) {
				to.appendChild(from.firstChild);
			} else if (Array.isArray(to)) {
				to.push(from.removeChild(from.firstChild));
			} else {
				break;
			}
		}
	}

	/**
	 * Creates a callback to register with the custom element lifecycle - should be invoked when the element is created.
	 * @param args Expected to hold the "render" function.
	 * @returns {Function} The callback, curried with the provided args.
	 */
	function elementReadyCallbackWrapper(args) {
		/**
		 * When a custom element is "ready" this function will be invoked.
		 * It will delegate execution to the render function registered with this custom element.
		 * The render function will be passed a "createElement" function which can be used to create new nodes.
		 * The return value of the render function will be added to the DOM in place (in the custom element).
		 */
		return function() {
			var newNode;
			if (args.render) {
				try {
					this.$attrs = extractAttributes(this);  // provide an easy lookup for the attributes
					this.$slots = {};
					this.$slots["default"] = [];
					importKids(this, this.$slots["default"]);
					newNode = args.render.call(this, createElement);
					if (newNode) {
						this.removeAttribute("id");
						if (replace) {
							this.parentNode.replaceChild(newNode, this);
						} else {
							this.appendChild(newNode);
						}
					}
				} catch (ex) {
					// try to continue but log error
					console.error(ex);
				}
			} else {
				console.warn("No renderer registered for", this);
			}
		};
	}

	function componentVue(name, args) {
		Vue.component(name, args);
	}

	function component(name, args) {
		var ElementProto;
		if (name && (name.constructor === String || typeof name === "string")) {
			ElementProto = Object.create(HTMLElement.prototype);
			ElementProto.createdCallback = elementReadyCallbackWrapper(args);
			document.registerElement(name, {
				prototype: ElementProto
			});
		}
	}

	if (useVue) {
		window.setTimeout(function() {
			new Vue({
				el: document.forms[0],
				data: {

				}
			});
		}, 5000);
	}

	return {
		component: useVue ? componentVue : component
	};
});
