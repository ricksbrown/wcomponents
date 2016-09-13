define(["react", "wc/ui/numberField"], function(React, numberField) {
	function NumberField(props) {
		return React.createElement("input", {
			type: "number",
			autoComplete: "off",
			id: props.id,
			name: props.id,
			min: props.min,
			max: props.max,
			step: props.step,
			defaultValue: props.defaultValue
		});
	}

	NumberField.propTypes = {
		readonly: React.PropTypes.bool,
		id: React.PropTypes.string.isRequired,
		min: React.PropTypes.number,
		max: React.PropTypes.number,
		step: React.PropTypes.number,
		defaultValue: React.PropTypes.number
	};

	return NumberField;
});
