require(["wc/ui/components/renderer"], function(renderer) {
	var elementConfig = {
		render: function(createElement) {
			var options = { attrs: { "class": "wc-message" }};
			if (this.$attrs.id) {
				options.id = this.$attrs.id;
			}
			return createElement("span", options, this.$slots.default);
		}
	};

	renderer.component("wc-message", elementConfig);
});

