export const $ = (selector, scope = document) => scope.querySelector(selector);

export const $$ = (selector, scope = document) => [
  ...scope.querySelectorAll(selector),
];

export function setAttributes(element, attributes) {
  if (!element) return;
  Object.entries(attributes).forEach(([name, value]) => {
    if (typeof value === "string") element.setAttribute(name, value);
  });
}
