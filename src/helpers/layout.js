export const toggleDocumentAttribute = (attribute, value, tag = "html", remove) => {
  if (!document.body) return;

  const element = document.getElementsByTagName(tag)[0];
  const hasAttribute = element?.hasAttribute(attribute);

  if (remove && hasAttribute) {
    element?.removeAttribute(attribute);
  } else {
    element?.setAttribute(attribute, value);
  }
};
