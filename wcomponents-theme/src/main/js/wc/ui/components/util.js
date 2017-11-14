define([], function() {


	function RenderUtil() {
		this.attributes = {
			accessKey: accessKey,
			makeCommonClass: makeCommonClass
		};
		this.states = {
			readonlyControl: function(element, createElement) {
				var tagName = element.tagName.toLowerCase();

			}
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

//
//
//
//	function isInvalid(element) {
//		if (ui:fieldindicator[not(@type='warn')]) {
//			element.aria-invalid =
//				"true"
//			;
//		}
//	}
//
//
//
//	function ariaLabel(element) {
//		if (@accessibleText) {
//			element.aria-label =
//				@accessibleText
//			;
//		}
//	}
//
//
//
	function makeCommonClass(element, additional) {
		var baseClass = element.tagName.toLowerCase(),
			result = [baseClass],
			margin = findChild(element, "wc-margin");
		// if there is a child margin element
		if (margin) {
			makeMarginClass(margin, result);
		}
		// if additional classes have been provided
		if (additional) {
			result = result.concat(additional);
		}
		classBuilderer(element, {
			"class": "",
			type: function(val) {
				if (baseClass !== "wc-file") {
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

		if (findChild(element, "wc-fieldindicator")) {
			result.push("wc-rel");
		}

		return result.join(" ");
	}

	function findChild(element, tagName) {
		var ucase = tagName.toUpperCase(),
			i, next, childNodes = element.$slots["default"];
		for (i = 0; i < childNodes.length; i++) {
			next = childNodes[i];
			if (next.tagName === ucase) {
				return next;
			}
		}
		return null;
	}

	function makeMarginClass(element, arr) {
		var result = arr || [],
			marginBuilder = function(extension, gap) {
				if (gap) {
					return "wc-margin-" + extension + gap;
				}
				return "";
			};
		classBuilderer(element, {
			all: marginBuilder.bind(this, "all-"),
			north:  marginBuilder.bind(this, "n-"),
			east:  marginBuilder.bind(this, "e-"),
			south:  marginBuilder.bind(this, "s-"),
			west:  marginBuilder.bind(this, "w-")
		}, result);
		return result;
	}

	function classBuilderer(element, mapperer, arr) {
		var result = arr || [], prop, val, computed, mapper;
		for (prop in mapperer) {
			val = element.$attrs[prop];
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
		return result;
	}
//
//
//
//	function makeCommonClass(element, additional) {
//		, additional
//		element.class =
//			commonClassHelper($additional);
//		;
//	}
//
//
//
//	function disabledElement(element, isControl = 1, field = .) {
//		, isControl = 1
//		, field = .
//		if ($field/@disabled) {
//			if (number($isControl) eq 1) {
//					element.disabled =
//						"disabled"
//					;
//				}else {
//					element.aria-disabled =
//						"true"
//					;
//				}
//		}
//	}
//
//
//
//	function hiddenElement(element) {
//		element.hidden =
//			"hidden"
//		;
//	}
//
//
//
//	function hideElementIfHiddenSet(element) {
//		if (@hidden) {
//			hiddenElement();
//		}
//	}
//
//
//
//	function requiredElement(element, field = ., useNative = 1) {
//		, field = .
//		, useNative = 1
//		if ($field/@required) {
//			if (number($useNative) eq 1) {
//					element.required =
//						"required"
//					;
//				}else {
//					element.aria-required =
//						"true"
//					;
//				}
//		}
//	}
//
//
//
//	function title(element) {
//		if (@toolTip) {
//			element.title =
//				@toolTip
//			;
//		}
//	}
//
//
//
//	function commonAttributes(element, isControl = 0, isWrapper = 0, class = '') {
//		var isControl = 0,
//			isWrapper = 0,
//			className = "";
//
//		element.id =
//			@id
//		;
//		makeCommonClass();
//		hideElementIfHiddenSet();
//		if (not(@readOnly or number($isWrapper) eq 1)) {
//			disabledElement($isControl);
//		}
//	}
//
//
//
//	function commonWrapperAttributes(element, class = '') {
//		, class = ''
//
//		commonAttributes(1, );
//		title();
//		ariaLabel();
//		isInvalid();
//	}
//
//
//
//	function wrappedInputAttributes(element, name = element.id, useTitle = 1, type = '') {
//		, name = element.id
//		, useTitle = 1
//		, type = ''
//
//		element.id =
//			concat(@id,'_input')
//		;
//		if ($name ne '') {
//			element.name =
//				$name
//			;
//		}
//		if ($type ne '') {
//			element.type =
//				$type
//			;
//		}
//		if (number($useTitle) eq 1) {
//			title();
//		}
//		if (not(self::ui:multifileupload)) {
//			requiredElement();
//		}
//		disabledElement();
//		ariaLabel();
//		if (@buttonId) {
//			element.data-wc-submit =
//				@buttonId
//			;
//		}
//		isInvalid();
//		if ((@submitOnChange and not(@list)) or (self::ui:dropdown and @optionWidth)) {
//			element.class =
//				if (@submitOnChange and not(@list)) {
//					"wc_soc"
//				}
//				if (self::ui:dropdown and @optionWidth) {
//					if ((@submitOnChange and not(@list))) {
//						' '
//					}
//					"wc-dd-ow-"
//					@optionWidth
//				}
//			;
//		}
//	}
//
//
//	function wrappedTextInputAttributes(element, useTitle = 1, type = '') {
//		, useTitle = 1
//		, type = ''
//		wrappedInputAttributes($useTitle, $type);
//		if (@placeholder) {
//			element.placeholder =
//				@placeholder
//			;
//		}
//	}
//
//
//	function commonInputWrapperAttributes(element, class = '') {
//		, class = ''
//		commonAttributes();
//	}



	return new RenderUtil();
});
