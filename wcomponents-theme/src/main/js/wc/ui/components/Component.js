define(["wc/ui/components/util"], function(util) {

	Component.classProp = "class";

	/**
	 * Adds CSS classes to this component instance.
	 * @param {...string} newClass The class or classes to add.
	 */
	Component.prototype.addClass = function(newClass) {
		var i = 0,
			len = arguments.length,
			nextClass = newClass,
			classProp = Component.classProp;
		do {
			i++;
			if (nextClass) {
				if (this.attrs[classProp]) {
					this.attrs[classProp] += " " + nextClass;
				} else {
					this.attrs[classProp] = nextClass;
				}
			}
			nextClass = arguments[i];
		} while (i < len);
	};

	Component.prototype.requiredElement = function (args) {
		var component = this,
			source = component.context.data.attrs;
		if (source.required) {
			if (args.useNative !== false) {  // if not explicitly set to false then defaults to true
				component.attrs.required = "required";
			} else {
				component.attrs["aria-required"] = true;
			}
		}
	};

	Component.prototype.isInvalid = function () {
		// TODO Should we mark components invalid in the renderer rather than having to compute with a DOM search?
		var component = this,
			diagnostic = util.findChild(component.context, "wc-fieldindicator");
		if (diagnostic) {
			if (diagnostic.data && diagnostic.data.attrs && diagnostic.data.attrs.type !== "warn") {
				component.attrs["aria-invalid"] = true;
			} else if (!util.hasClass(diagnostic, "wc-fieldindicator-type-warn")) {
				component.attrs["aria-invalid"] = true;
			}
		}
	};

	Component.prototype.disabledElement = function(args) {
		var component = this,
			source = component.context.data.attrs;
		if (component && source.disabled) {
			if (args.isControl !== false) {  // defaults to true unless explicitly false
				component.attrs.disabled = "disabled";
			} else {
				component.attrs["aria-disabled"] = "true";
			}
		}
	};

	Component.prototype.hideElementIfHiddenSet = function() {
		var component = this,
			source = component.context.data.attrs;
		if (component && source.hidden) {
			component.attrs.hidden = "hidden";
		}
	};

	Component.prototype.title = function() {
		var component = this,
			source = component.context.data.attrs;
		if (component) {
			if (source.toolTip) {
				component.attrs.title = source.toolTip;
			}
		}
	};

	Component.prototype.commonAttributes = function(args) {
		var component = this,
			source = component.context.data.attrs;
		if (component) {
			if (source.id) {
				component.attrs.id = source.id;
			}
			component.addClass(util.attributes.makeCommonClass(component.context, args["class"]));
			component.hideElementIfHiddenSet(args);
			if (!(util.states.isReadOnly(component.context) || args.isWrapper)) {
				component.disabledElement(args);
			}
		}
	};

	Component.prototype.commonWrapperAttributes = function(args) {
		var component = this,
			source = component.context.data.attrs,
			tagName = util.getTagName(component.context);
		if (component) {
			args.isWrapper = true;

			if (!util.states.isReadOnly(component.context)) {
				component.addClass(args["class"], "wc-fset-wrapper");

				if (((tagName === "wc-checkboxselect" || tagName === "wc-radiobuttonselect") && !source.frameless)) {
					component.addClass("wc-fset-wrapper");
				}

				if (source.required) {
					component.addClass("wc_req");
				}
			}

			component.commonAttributes(args);
			component.title(args);
			component.ariaLabel(args);
			component.isInvalid(args);
		}
	};

	Component.prototype.wrappedInputAttributes = function(args) {
		var component = this,
			source = component.context.data.attrs,
			tagName = util.getTagName(component.context);
		if (component) {
			component.attrs.id = source.id + "_input";
			component.attrs.name = args.name || source.id;

			if (args.type) {
				component.attrs.type = args.type;
			}

			if (args.useTitle) {
				component.title(args);
			}

			if (tagName !== "wc-multifileupload") {
				component.requiredElement(args);
			}
			component.disabledElement(args);
			component.ariaLabel(args);

			if (source.buttonId) {
				component.attrs["data-wc-submit"] = source.buttonId;
			}

			component.isInvalid(args);

			if ((source.submitOnChange && !source.list) || (tagName === "ui:dropdown" && source.optionWidth)) {
				if (source.submitOnChange && !source.list) {
					component.addClass("wc_soc");
				}

				if (tagName === "ui:dropdown" && source.optionWidth) {
					component.addClass("wc-dd-ow-" + source.optionWidth);
				}
			}
		}
	};

	Component.prototype.wrappedTextInputAttributes = function(args) {
		var component = this,
			source = component.context.data.attrs;
		if (component) {
			component.wrappedInputAttributes(args);
			if (source.placeholder) {
				component.attrs.placeholder = source.placeholder;
			}
		}
	};

	Component.prototype.commonInputWrapperAttributes = function(args) {
		var component = this;
		if (component) {
			component.addClass(args["class"], "wc-input-wrapper");
			component.commonAttributes(args);
		}
	};

	Component.prototype.readOnlyValue = function() {
		var component = this,
			source = component.context.data.attrs,
			value = null,
			tagName = util.getTagName(component.context);
		if (tagName === "wc-checkbox" || tagName === "wc-radiobutton" || tagName === "wc-togglebutton") {
			value = !!source.selected;
		} else if (tagName === "wc-datefield" && source.date) {
			if (source.allowPartial) {
				value = source.date;
			} else {
				component.attrs["datetime"] = source.date;
			}
		} else if (tagName === "wc-numberfield") {
			value = util.getTextContent(component.context);
		}
		if (value !== null) {
			component.attrs["data-wc-value"] = value;
		}
	};

	Component.prototype.ariaLabel = function() {
		var component = this,
			source = component.context.data.attrs;
		if (source.accessibleText) {
			component.attrs["aria-label"] = source.accessibleText;
		}
	};

	Component.prototype.roComponentName = function() {
		var component = this,
			tagName = util.getTagName(component.context);
		component.attrs["data-wc-component"] = tagName.replace(/^wc-/, "");
	};

	Component.prototype.readonlyControl = function(args) {
		var component = this,
			source = component.context.data.attrs,
			elementName, tagName = util.getTagName(component.context);
		if (args.isList) {
			elementName = "ul";
			component.addClass("wc_list_nb");
		} else if (tagName === "wc-textarea") {
			if (util.findChild(component.context, "wc-rtf")) {
				elementName = "div";
			} else {
				elementName = "pre";
			}
		} else if (tagName === "wc-datefield" && source.date) {
			if (source.allowPartial) {
				elementName = "span";
			} else {
				elementName = "time";
			}
		} else {
			elementName = "span";
		}

		component.tagName = elementName;
		component.commonAttributes(args);
		component.roComponentName();
		component.readOnlyValue();
	};

	/**
	 * Used to describe the element we want created by `createElement`.
	 *
	 * @param context Source element.
	 * @constructor
	 */
	function Component(context) {

		Object.defineProperty(this, "context", {
			enumerable: false,
			configurable: false,
			writable: false,
			value: context
		});

		this.attrs = {};
	}

	return Component;
});
