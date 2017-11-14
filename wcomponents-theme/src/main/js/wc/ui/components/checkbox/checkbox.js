require(["wc/ui/components/renderer", "wc/ui/components/util", "wc/ui/checkBox"], function(renderer, util) {
	var elementConfig = {
		render: function(createElement) {
			if (this.$attrs.readonly || this.$attrs.readOnly) {
				return readonlyCheckbox(this, createElement);
			} else {
				return wrappedCheckbox(this, createElement);
			}
		}
	};

	function wrappedCheckbox(obj, createElement) {
		var wrapper, checkbox,
			id = obj.$attrs.id,
			args = {},
			attrs = args.attrs = {};
		attrs["class"] = "";
		attrs.type = "checkbox";
		attrs.value = true;
		attrs.id = id + "_input";
		attrs.name = id;
		if (obj.$attrs.selected) {
			attrs["checked"] = "checked";
		}
		if (obj.$attrs.groupName) {
			attrs["data-wc-group"] = obj.$attrs.groupName;
		}
		if (obj.$attrs.disabled) {
			attrs.disabled = true;
		}
		if (obj.$attrs.required) {
			attrs.required = true;
		}
		checkbox = createElement("input", args);
		wrapper = createWrapper(obj, [checkbox].concat(obj.$slots.default), createElement);
		return wrapper;
	}

	function createWrapper(obj, childNodes, createElement) {
		var className = util.attributes.makeCommonClass(obj, "wc-input-wrapper"),
			args = {
				attrs: {
					"class": className,
					id: obj.$attrs.id
				}
			};
		return createElement("span", args, childNodes);
	}

	function readonlyCheckbox(obj, createElement) {
		var icon, checkbox, args = {}, attrs = args.attrs = {};
		attrs.id = obj.$attrs.id;
		attrs["class"] = "wc-ro-input";
		attrs["data-wc-component"] = "checkbox";
		if (obj.$attrs.selected) {
			attrs["class"] += " wc_ro_sel";
			attrs["data-wc-value"] = true;
			attrs.title = "TODO i18n selected";
			icon = "fa-check-square-o";
		} else {
			attrs["data-wc-value"] = false;
			attrs.title = "TODO i18n unselected";
			icon = "fa-square-o";
		}
		checkbox = createElement("span", args, [createElement("i", { attrs:{
			"aria-hidden": true,
			"class": "wc-checkbox fa " + icon
		}})]);
		return checkbox;
	}

	renderer.component("wc-checkbox", elementConfig);
});

