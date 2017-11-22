define([], function() {
	var util = new RenderUtil();

	function RenderUtil() {

		this.icon = function(icon) {
			var result = {
				tag: "i",
				attrs: {
					"aria-hidden": true,
					"class": "fa " + icon
				}};
			return result;
		};

		this.getTextContent = function(context) {
			if (context.$vnode) {
				return context.$vnode.text || "";
			}
			return context.textContent;
		};

		this.getTagName = function(context) {
			if (context.tagName) {
				return context.tagName.toLowerCase();
			} else if (context.$vnode && context.$vnode.componentOptions) {
				return context.$vnode.componentOptions.tag;
			}
			return "";
		};

		this.findChild = function(context, tagName) {
			var i, next, childNodes = context.children;
			for (i = 0; childNodes && i < childNodes.length; i++) {
				next = childNodes[i];
				if (util.getTagName(next) === tagName) {
					return next;
				}
			}
			return null;
		};

		this.attributes = {
			accessKey: accessKey,
			makeCommonClass: makeCommonClass
		};

		this.states = {
			isReadOnly: function(context) {
				var source = context.data.attrs;
				if (context && source) {
					return source.readonly || source.readOnly;
				}
				return false;
			}
		};
	}

	function accessKey(target, args, createElement) {
		var attribName, children = [], tooltipName = args.id + "_wctt";
		if (args.accessKey) {
			if (args.native !== false) {  // defaults to true
				attribName = "accesskey";
			} else {
				attribName = "data-wc-accesskey";
			}
			target[attribName] = args.accessKey;
			target["aria-describedby"] = tooltipName;
			children.push(createElement("span", {
				attrs: {
					id: tooltipName,
					role: "tooltip",
					hidden: "hidden",
					text: args.accessKey
				}
			}));
		}
		return children;
	}

	function makeCommonClass(context, additional) {
		var baseClass = util.getTagName(context),
			result = [baseClass],
			margin = util.findChild(context, "wc-margin");
		// if there is a child margin context
		if (margin) {
			makeMarginClass(margin, result);
		}
		// if additional classes have been provided
		if (additional) {
			result = result.concat(additional);
		}
		classBuilderer(context, {
			"class": "",
			type: function(val) {
				if (baseClass && baseClass !== "wc-file") {
					return baseClass + "-type-" + val;
				}
				return "";
			},
			align: function(val) {
				return "wc-align-" + val;
			},
			layout: function(val) {
				return "wc-layout-" + val;
			},
			track: "wc_here"
		}, result);

		if (util.findChild(context, "wc-fieldindicator")) {
			result.push("wc-rel");
		}

		return result.join(" ");
	}

	function makeMarginClass(context, arr) {
		var result = arr || [],
			marginBuilder = function(extension, gap) {
				if (gap) {
					return "wc-margin-" + extension + gap;
				}
				return "";
			};
		classBuilderer(context, {
			all: marginBuilder.bind(this, "all-"),
			north:  marginBuilder.bind(this, "n-"),
			east:  marginBuilder.bind(this, "e-"),
			south:  marginBuilder.bind(this, "s-"),
			west:  marginBuilder.bind(this, "w-")
		}, result);
		return result;
	}

	function classBuilderer(context, mapperer, arr) {
		var result = arr || [], prop, val, computed, mapper, source = context.data.attrs;
		if (source) {
			for (prop in mapperer) {
				val = source[prop];
				if (val) {
					mapper = mapperer[prop];
					if (!mapper) {
						computed = val;
					} else if (typeof mapper === "string") {
						computed = mapper;
					} else if (typeof mapper === "function") {
						computed = mapper(val);
					} else {
						console.warn("Could not map", mapper);
					}
					if (computed) {
						result.push(computed);
					}
				}
			}
		}
		return result;
	}

	return util;
});
