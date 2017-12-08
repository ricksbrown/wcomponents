require(["wc/ui/components/renderer", "wc/ui/components/Component", "wc/ui/components/util"], function(renderer, Component, util) {
	var tagName = "wc-message",
		elementConfig = {
			render: function(createElement, context) {
				var component = new Component(context), className;
				context.tagName = tagName;
				className = util.attributes.makeCommonClass(context);
				component.addClass(className);
				return createElement("span", component, context.children);
			}
		};

	renderer.component(tagName, elementConfig);
});

