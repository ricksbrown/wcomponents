package com.github.bordertech.wcomponents;

import org.junit.Assert;
import org.junit.Test;

import java.io.Serializable;

/**
 * WLabel_Test - unit tests for {@link WLabel}.
 *
 * @author Ming Gao
 * @since 1.0.0
 */
public class WLabel_Test extends AbstractWComponentTestCase {

	@Test
	public void testGetText() {
		String defaultText = "test";
		WLabel lbl = new WLabel(defaultText);

		lbl.setLocked(true);
		setActiveContext(createUIContext());
		Assert.assertTrue("Should be in default state by default", lbl.isDefaultState());
		lbl.setText("blah");
		Assert.assertFalse("Should not be in default state when has session text", lbl.
				isDefaultState());
		Assert.assertEquals("getText returned incorrect session text", "blah", lbl.getText());

		resetContext();
		Assert.assertEquals("Default text should not have changed", defaultText, lbl.getText());
	}

	@Test
	public void testSpecialCharacters() {
		WLabel lbl = new WLabel();

		Assert.assertNull("Default text should be null by default", lbl.getText());

		lbl.setLocked(true);
		setActiveContext(createUIContext());
		lbl.setText(null);
		Assert.assertNull("Session text should be null after set to null", lbl.getText());
		String myText = "a!@#$%^&()-=_+\\[]~{}|<>:;',.?/`~z";
		lbl.setText(myText);
		Assert.assertEquals("getText returned incorrect session text", myText, lbl.getText());

		resetContext();
		lbl.setText(myText);
		Assert.assertEquals("getText returned incorrect default text", myText, lbl.getText());
	}

	@Test
	public void testForComponentAccessors() {
		WText forComponent1 = new WText();
		WText forComponent2 = new WText();

		WLabel lbl = new WLabel("test", forComponent1);
		Assert.assertSame("forComponent accessor incorrect", forComponent1, lbl.getForComponent());

		lbl.setForComponent(forComponent2);
		Assert.assertSame("forComponent accessors incorrect", forComponent2, lbl.getForComponent());
	}

	@Test
	public void testAccessKeyAccessors() {
		char accessKey1 = 'B';
		char accessKey2 = 'C';

		WLabel lbl = new WLabel("test", accessKey1);
		Assert.assertEquals("accessKey accessor incorrect", accessKey1, lbl.getAccessKey());

		lbl.setAccessKey(accessKey2);
		Assert.assertEquals("accessKey accessors incorrect", accessKey2, lbl.getAccessKey());
	}

	@Test
	public void testHintAccessors() {
		String hint = "Test hint text";

		WLabel lbl = new WLabel("test");
		lbl.setHint(hint);
		Assert.assertEquals("hint accessors incorrect", hint, lbl.getHint());
	}

	@Test
	public void testSanitizeOnOutputAccessors() {
		assertAccessorsCorrect(new WLabel("test"), WLabel::isSanitizeOnOutput, WLabel::setSanitizeOnOutput, false, true, false);
	}

	// sanitizeOnOutput runs a lax HTML sanitizer rule set but only if encodeText is false. FORM elements are always
	// filtered.
	@Test
	public void testNoSanitizeOnOutput() {
		String input = "<form>content</form>";
		WLabel label = new WLabel(input);
		label.setEncodeText(false);
		Assert.assertEquals("Expect output to not be sanitized", input, label.getText());
	}

	@Test
	public void testSanitizeOnOutput() {
		WLabel label = new WLabel("<form>content</form>");
		label.setSanitizeOnOutput(true);
		label.setEncodeText(false);
		Assert.assertEquals("Expect output to be sanitized", "content", label.getText());
	}

	@Test
	public void testDuplicateComponentModels() {
		WLabel wLabel = new WLabel("tesLabel");
		assertNoDuplicateComponentModels(wLabel, "text", "testText", new Serializable[]{});
		assertNoDuplicateComponentModels(wLabel, "hint", "testHint", new Serializable[]{});
		assertNoDuplicateComponentModels(wLabel,"sanitizeOnOutput", true);
	}
}
