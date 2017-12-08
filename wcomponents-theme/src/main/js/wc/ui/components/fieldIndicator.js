require(["wc/ui/components/renderer", "wc/ui/components/Component", "wc/ui/components/util"], function(renderer, Component, util) {
	var tagName = "wc-fieldindicator",
		elementConfig = {
			render: function(createElement, context) {
				var component = new Component(context),
					className,
					icon;
				context.tagName = tagName;
				className = util.attributes.makeCommonClass(context);
				component.addClass(className);
				if (context.data.attrs.id) {
					this.attrs.id = context.data.attrs.id;
				}
				if (context.data.attrs.type === "warn") {
					icon = "fa-exclamation-triangle";
				} else {
					icon = "fa-times-circle";
				}
				icon = util.icon(icon);
				return createElement("span", component, [createElement(icon.tag, icon)].concat(context.children));
			}
		};

	renderer.component(tagName, elementConfig);
});

