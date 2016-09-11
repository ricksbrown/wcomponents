define(["react", "wc/ui/numberField"], function(React, numberField) {
	var NumberField = React.createClass({
		propTypes: {
			readonly: React.PropTypes.bool,
			id: React.PropTypes.string.isRequired,
			min: React.PropTypes.number,
			max: React.PropTypes.number,
			step: React.PropTypes.number,
			defaultValue: React.PropTypes.number
		},
		render: function() {
			return React.createElement("input", {
				type: "number",
				autoComplete: "off",
				id: this.props.id,
				name: this.props.id,
				min: this.props.min,
				max: this.props.max,
				step: this.props.step,
				defaultValue: this.props.defaultValue
			});
		},
		componentDidMount: function($event) {
			console.log("cdm", $event);
		}
	});
	return NumberField;
});
