require(["wc/ui/components/renderer"], function(renderer) {
	var elementConfig = {
		render: function(createElement) {
			var className = "wc-fieldindicator wc-rel",
				icon = "fa",
				args = { attrs: { } };
			if (this.$attrs.id) {
				args.attrs.id = this.$attrs.id;
			}
			if (this.$attrs.type === "warn") {
				className += " wc-fieldindicator-type-warn";
				icon += " fa-exclamation-triangle";
			} else {
				className += " wc-fieldindicator-type-error";
				icon += " fa-times-circle";
			}
			args.attrs["class"] = className;
			return createElement("span", args, [createElement("i", {
				attrs: {
					"aria-hidden": true,
					"class": icon
				} } )].concat(this.$slots.default));
		}
	};

	renderer.component("wc-fieldindicator", elementConfig);
});

