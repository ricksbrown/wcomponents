package com.github.bordertech.wcomponents.examples.theme;

import com.github.bordertech.wcomponents.HeadingLevel;
import com.github.bordertech.wcomponents.Margin;
import com.github.bordertech.wcomponents.Size;
import com.github.bordertech.wcomponents.WContainer;
import com.github.bordertech.wcomponents.WHeading;
import com.github.bordertech.wcomponents.WHorizontalRule;
import com.github.bordertech.wcomponents.WPanel;
import com.github.bordertech.wcomponents.WText;

/**
 * <p>
 * This example demonstrates using {@link Margin} on {@link WPanel}.
 * </p>
 *
 * @author Jonathan Austin
 * @since 1.0.0
 */
public class WPanelMarginExample extends WContainer {

	/**
	 * Some dummy text.
	 */
	private static final String DUMMY_TEXT = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tristique pellentesque massa, et placerat justo ullamcorper vel. Nunc scelerisque, sem ut hendrerit pharetra, tellus erat dictum felis, at facilisis metus odio ac justo. Curabitur rutrum lacus in nulla iaculis at vestibulum metus facilisis. Aenean id nulla massa. Suspendisse vitae nunc nec urna laoreet elementum. Duis in orci ac leo elementum sagittis ac non massa. Sed vel massa purus, eu facilisis ipsum.</p><p>Maecenas quis mi non metus scelerisque sagittis quis ac lacus. Fusce faucibus, urna ut viverra vulputate, tellus metus venenatis enim, eget mollis neque libero a turpis. Nullam convallis, lacus vel gravida suscipit, ipsum ante interdum libero, placerat laoreet dui magna et odio.\n\nPhasellus interdum placerat risus ut aliquam. In hac habitasse platea dictumst. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>";

	/**
	 * Construct the example.
	 */
	public WPanelMarginExample() {
		add(new WHeading(HeadingLevel.H2, "Panels with large margin all around"));
		add(createPanel(new Margin(Size.LARGE)));
		add(createPanel(new Margin(Size.LARGE)));

		add(new WHorizontalRule());
		add(new WHeading(HeadingLevel.H2, "Panel with margin east, XL and Panel with margin west XL"));
		add(createPanel(new Margin(null, Size.XL, null, null)));
		add(createPanel(new Margin(null, null, null, Size.XL)));

		add(new WHorizontalRule());
		add(new WHeading(HeadingLevel.H2, "Middle Panel with margin north MEDIUM and south LARGE"));
		add(createPanel(null));
		add(createPanel(new Margin(Size.MEDIUM, null, Size.LARGE, null)));
		add(createPanel(null));
	}

	/**
	 * @param margin the margin to include on the panel.
	 * @return the panel with a margin.
	 */
	private WPanel createPanel(final Margin margin) {
		WText text = new WText(DUMMY_TEXT);
		text.setEncodeText(false);

		WPanel panel = new WPanel(WPanel.Type.BOX);
		panel.add(text);
		panel.setMargin(margin);
		return panel;
	}
}
