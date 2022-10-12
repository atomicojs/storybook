// src/serialize.ts
var serialize = (children, tab = 0) => [...children].reduce((html, child) => {
  let space = tab ? "   ".repeat(tab) : "";
  if (child instanceof Element) {
    const { localName, childNodes, attributes } = child;
    const { _props = {} } = child;
    if (localName.includes("-")) {
      const props = _props ? Object.entries(_props) : Object.values(attributes).map((attr) => [
        attr.name,
        attr.value
      ]);
      const attrs = props.reduce((attrs2, [prop, value]) => {
        if (value != null) {
          let type = typeof value;
          let attr = type === "boolean" ? value ? prop : "" : type === "function" ? `${prop}=${type}` : `${prop}=${JSON.stringify(value)}`;
          attr && attrs2.push(attr);
        }
        return attrs2;
      }, []);
      let content = serialize(childNodes, tab + 1);
      if (content) {
        content += `
${space}`;
      }
      html += `${space ? `
${space}` : ""}<${localName}${attrs.length ? ` ${attrs.join(" ")}` : ""}>${content}</${localName}>`;
    }
  } else if (child.textContent.trim()) {
    html += `
${space}${child.textContent}`;
  }
  return html;
}, "");

export {
  serialize
};
