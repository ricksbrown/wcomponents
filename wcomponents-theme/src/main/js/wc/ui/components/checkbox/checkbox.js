require(["wc/ui/components/renderer", "wc/ui/components/util", "wc/ui/components/Component", "wc/ui/checkBox"], function(renderer, util, Component) {
	var tagName = "wc-checkbox",
		elementConfig = {
			render: function(createElement, ctxt) {
				var context = ctxt || this;
				context.tagName = tagName;
				if (util.states.isReadOnly(context)) {
					return readonlyCheckbox(createElement, context);
				} else {
					return wrappedCheckbox(createElement, context);
				}
			}
		};

	function wrappedCheckbox(createElement, context) {
		var wrapper, checkbox,
			component = new Component();
		component.attrs.type = "checkbox";
		if (context.data.attrs.selected) {
			component.attrs["checked"] = "checked";
		}
		component.attrs.value = true;
		if (context.data.attrs.groupName) {
			component.attrs["data-wc-group"] = context.data.attrs.groupName;
		}
		component.wrappedInputAttributes(context, component.attrs);
		checkbox = createElement("input", component);
		wrapper = createWrapper(createElement, context, [checkbox].concat(context.children));
		return wrapper;
	}

	function createWrapper(createElement, context, children) {
		var component = new Component();
		component.commonInputWrapperAttributes(context, {});
		return createElement("span", component, children);
	}

	function readonlyCheckbox(createElement, context) {
		var icon, checkbox, component = new Component();

		component.attrs["class"] = "wc-ro-input";
		if (context.data.attrs.selected) {
			component.attrs["class"] += " wc_ro_sel";
			component.attrs.title = "TODO i18n selected";
			icon = "fa-check-square-o";
		} else {
			component.attrs.title = "TODO i18n unselected";
			icon = "fa-square-o";
		}

		component.readonlyControl(context, component.attrs);

		icon = util.icon(icon);
		checkbox = createElement("span", component, [createElement(icon.tag, icon)]);
		return checkbox;
	}

	renderer.component(tagName, elementConfig);
});

