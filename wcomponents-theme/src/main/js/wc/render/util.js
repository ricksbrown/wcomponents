define(function() {


	function RenderUtil() {
		this.attributes = {
			accessKey: accessKey
		};
	}

	/**
	 *
	 */
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
				id: tooltipName,
				role: "tooltip",
				hidden: "hidden",
				text: args.accessKey
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
//	function commonClassHelper(element, additional = '') {
//		, additional = ''
//		var baseClass = ;
//		var computed =
//
//			concat($baseClass, ' ', @class, ' ', $additional)
//			if (@type and not(self::ui:file)) {
//				concat($baseClass,'-type-', @type)
//			}
//			if (@align) {
//				concat(' wc-align-', @align)
//			}
//			if (@layout) {
//				concat(' wc-layout-', @layout)
//			}
//			if (@track) {
//				" wc_here"
//			}
//			if (ui:fieldindicator) {
//				" wc-rel"
//			}
//		;
//		normalize-space($computed)
//	}
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
//		, isControl = 0
//		, isWrapper = 0
//		, class = ''
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
