package com.github.bordertech.wcomponents.render.webxml;

import com.github.bordertech.wcomponents.Diagnosable;
import com.github.bordertech.wcomponents.XmlStringBuilder;
import com.github.bordertech.wcomponents.servlet.WebXmlRenderContext;
import com.github.bordertech.wcomponents.util.SystemException;
import com.github.bordertech.wcomponents.validation.Diagnostic;
import java.util.List;

/**
 * Utility to render inline diagnostic messages.
 * @author Mark Reeves
 * @since 1.4.12
 */
public final class DiagnosticRenderUtil {

	/**
	 * The xml element name used for diagnostic output.
	 */
	private static final String TAG_NAME = "ui:fieldindicator";
	/**
	 * The xml element name used for each message in the diagnostic output.
	 */
	private static final String MESSAGE_TAG_NAME = "ui:message";

	/**
	 * The custom element name used for diagnostic output.
	 */
	private static final String TAG_NAME_CUSTOM = "wc-fieldindicator";
	/**
	 * The custom element name used for each message in the diagnostic output.
	 */
	private static final String MESSAGE_TAG_NAME_CUSTOM = "wc-message";

	/**
	 * Prevent instantiation.
	 */
	private DiagnosticRenderUtil() {
	}

	/**
	 * @param severity the diagnostic severity.
	 * @return a string representation of the diagnostic severity level.
	 */
	private static String getLevel(final int severity) {
		switch (severity) {
			case Diagnostic.ERROR:
				return "error";
			case Diagnostic.WARNING:
				return "warn";
			default:
				throw new SystemException("Unexpected diagnostic severity");
		}
	}

	/**
	 * Render the diagnostics.
	 * @param renderContext the current renderContext
	 * @param diags the list of Diagnostic objects
	 * @param severity the severity we are rendering
	 * @param useCutomElement if true then output using a custom element instead of namespaced XML.
	 */
	private static void renderHelper(final WebXmlRenderContext renderContext, final List<Diagnostic> diags, final int severity,
			final boolean useCutomElement) {
		if (diags.isEmpty()) {
			return;
		}
		String tagName, messageTagName;
		if (useCutomElement) {
			tagName = TAG_NAME_CUSTOM;
			messageTagName = MESSAGE_TAG_NAME_CUSTOM;
		} else {
			tagName = TAG_NAME;
			messageTagName = MESSAGE_TAG_NAME;
		}

		XmlStringBuilder xml = renderContext.getWriter();
		xml.appendTagOpen(tagName);
		xml.appendAttribute("type", getLevel(severity));
		xml.appendClose();

		for (Diagnostic diagnostic : diags) {
			xml.appendTag(messageTagName);
			xml.appendEscaped(diagnostic.getDescription());
			xml.appendEndTag(messageTagName);
		}
		xml.appendEndTag(tagName);
	}

	/**
	 * Render diagnostics for the component.
	 * @param component the component being rendered
	 * @param renderContext the RenderContext to paint to.
	 * @param useCutomElement if true then output using a custom element instead of namespaced XML.
	 */
	public static void renderDiagnostics(final Diagnosable component, final WebXmlRenderContext renderContext,
			final boolean useCutomElement) {
		List<Diagnostic> diags = component.getDiagnostics(Diagnostic.WARNING);
		if (diags != null) {
			renderHelper(renderContext, diags, Diagnostic.WARNING, useCutomElement);
		}
		diags = component.getDiagnostics(Diagnostic.ERROR);
		if (diags != null) {
			renderHelper(renderContext, diags, Diagnostic.ERROR, useCutomElement);
		}
	}

	/**
	 * Render diagnostics for the component.
	 * @param component the component being rendered
	 * @param renderContext the RenderContext to paint to.
	 */
	public static void renderDiagnostics(final Diagnosable component, final WebXmlRenderContext renderContext) {
		renderDiagnostics(component, renderContext, false);
	}
}
