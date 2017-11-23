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

	Component.prototype.requiredElement = 	function (context, args) {
		var component = this,
			source = context.data.attrs;
		if (source.required) {
			if (args.useNative !== false) {  // if not explicitly set to false then defaults to true
				component.attrs.required = "required";
			} else {
				component.attrs["aria-required"] = true;
			}
		}
	};

	Component.prototype.isInvalid = function (context) {
		// TODO Should we mark components invalid in the renderer rather than having to compute with a DOM search?
		var component = this,
			diagnostic = util.findChild(context, "wc-fieldindicator");
		if (diagnostic) {
			if (diagnostic.data && diagnostic.data.attrs && diagnostic.data.attrs.type !== "warn") {
				component.attrs["aria-invalid"] = true;
			} else if (!util.hasClass(diagnostic, "wc-fieldindicator-type-warn")) {
				component.attrs["aria-invalid"] = true;
			}
		}
	};

	Component.prototype.disabledElement = function(context, args) {
		var component = this,
			source = context.data.attrs;
		if (component && source.disabled) {
			if (args.isControl !== false) {  // defaults to true unless explicitly false
				component.attrs.disabled = "disabled";
			} else {
				component.attrs["aria-disabled"] = "true";
			}
		}
	};

	Component.prototype.hideElementIfHiddenSet = function(context) {
		var component = this,
			source = context.data.attrs;
		if (component && source.hidden) {
			component.attrs.hidden = "hidden";
		}
	};

	Component.prototype.title = function(context) {
		var component = this,
			source = context.data.attrs;
		if (component) {
			if (source.toolTip) {
				component.attrs.title = source.toolTip;
			}
		}
	};

	Component.prototype.commonAttributes = function(context, args) {
		var component = this,
			source = context.data.attrs;
		if (component) {
			if (source.id) {
				component.attrs.id = source.id;
			}
			component.addClass(util.attributes.makeCommonClass(context, args["class"]));
			component.hideElementIfHiddenSet(context, args);
			if (!(util.states.isReadOnly(context) || args.isWrapper)) {
				component.disabledElement(context, args);
			}
		}
	};

	Component.prototype.commonWrapperAttributes = function(context, args) {
		var component = this,
			source = context.data.attrs,
			tagName = util.getTagName(context);
		if (component) {
			args.isWrapper = true;

			if (!util.states.isReadOnly(context)) {
				component.addClass(args["class"], "wc-fset-wrapper");

				if (((tagName === "wc-checkboxselect" || tagName === "wc-radiobuttonselect") && !source.frameless)) {
					component.addClass("wc-fset-wrapper");
				}

				if (source.required) {
					component.addClass("wc_req");
				}
			}

			component.commonAttributes(context, args);
			component.title(context, args);
			component.ariaLabel(context, args);
			component.isInvalid(context, args);
		}
	};

	Component.prototype.wrappedInputAttributes = function(context, args) {
		var component = this,
			source = context.data.attrs,
			tagName = util.getTagName(context);
		if (component) {
			component.attrs.id = source.id + "_input";
			component.attrs.name = args.name || source.id;

			if (args.type) {
				component.attrs.type = args.type;
			}

			if (args.useTitle) {
				component.title(context, args);
			}

			if (tagName !== "wc-multifileupload") {
				component.requiredElement(context, args);
			}
			component.disabledElement(context, args);
			component.ariaLabel(context, args);

			if (source.buttonId) {
				component.attrs["data-wc-submit"] = source.buttonId;
			}

			component.isInvalid(context, args);

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

	Component.prototype.wrappedTextInputAttributes = function(context, args) {
		var component = this,
			source = context.data.attrs;
		if (component) {
			component.wrappedInputAttributes(context, args);
			if (source.placeholder) {
				component.attrs.placeholder = source.placeholder;
			}
		}
	};

	Component.prototype.commonInputWrapperAttributes = function(context, args) {
		var component = this;
		if (component) {
			component.addClass(args["class"], "wc-input-wrapper");
			component.commonAttributes(context, args);
		}
	};

	Component.prototype.readOnlyValue = function(context) {
		var component = this,
			source = context.data.attrs,
			value = null,
			tagName = util.getTagName(context);
		if (tagName === "wc-checkbox" || tagName === "wc-radiobutton" || tagName === "wc-togglebutton") {
			value = !!source.selected;
		} else if (tagName === "wc-datefield" && source.date) {
			if (source.allowPartial) {
				value = source.date;
			} else {
				component.attrs["datetime"] = source.date;
			}
		} else if (tagName === "wc-numberfield") {
			value = util.getTextContent(context);
		}
		if (value !== null) {
			component.attrs["data-wc-value"] = value;
		}
	};

	Component.prototype.ariaLabel = function(context) {
		var component = this,
			source = context.data.attrs;
		if (source.accessibleText) {
			component.attrs["aria-label"] = source.accessibleText;
		}
	};

	Component.prototype.roComponentName = function(context) {
		var component = this,
			tagName = util.getTagName(context);
		component.attrs["data-wc-component"] = tagName.replace(/^wc-/, "");
	};

	Component.prototype.readonlyControl = function(context, args) {
		var component = this,
			source = context.data.attrs,
			elementName, tagName = util.getTagName(context);
		if (args.isList) {
			elementName = "ul";
			component.addClass("wc_list_nb");
		} else if (tagName === "wc-textarea") {
			if (util.findChild(context, "wc-rtf")) {
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
		component.commonAttributes(context, args);
		component.roComponentName(context);
		component.readOnlyValue(context);
	};

	/**
	 * Helper class used to pass arguments to `createElement`.
	 *
	 * @constructor
	 */
	function Component() {
		this.attrs = {};
	}

	return Component;
});
