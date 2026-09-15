import { $, $$ } from "./dom.js";
import { FORM } from "./config.js";
import { translate } from "./i18n.js";

const STATES = ["loading", "success", "error"];

let form, button, label, message;
let pending = false;

// --- STATE ---

function setButtonState(state) {
  button.classList.remove(...STATES);
  if (state) button.classList.add(state);
  button.disabled = state === "loading";
}

function setLabel(text) {
  if (text) label.textContent = text;
}

function setMessage(state, text = "") {
  message.classList.remove(...STATES);
  if (state) message.classList.add(state);
  message.textContent = text;
}

function reportFeedback(state, text, buttonLabel) {
  setButtonState(state);
  setLabel(buttonLabel);
  setMessage(state, text);

  setTimeout(() => {
    setButtonState(null);
    setLabel(translate("contact.send"));
    setMessage(null);
  }, FORM.feedbackMs);
}

// --- VALIDATION ---

function validate() {
  return $$("[required]", form).reduce((valid, field) => {
    const ok = field.checkValidity();
    field.setAttribute("aria-invalid", String(!ok));
    return valid && ok;
  }, true);
}

function clearValidation() {
  $$("[aria-invalid]", form).forEach((field) =>
    field.removeAttribute("aria-invalid"),
  );
}

// --- SUBMIT ---

async function submit(event) {
  event.preventDefault();
  if (pending) return;

  if (!validate()) {
    setMessage("error", translate("form.invalid", translate("form.error")));
    $("[aria-invalid='true']", form)?.focus();
    return;
  }

  pending = true;
  setButtonState("loading");

  try {
    const response = await fetch(FORM.endpoint, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error(`Formspree responded ${response.status}`);

    form.reset();
    clearValidation();
    reportFeedback("success", translate("form.success"), translate("form.sent"));
  } catch (error) {
    console.error("Form submission failed:", error);
    reportFeedback("error", translate("form.error"));
  } finally {
    pending = false;
  }
}

export function initForm() {
  form = document.getElementById("contact-form");
  if (!form) return;

  button = $(".submit-trigger", form);
  label = $(".btn-text", button);
  message = $(".submit-message", form);

  form.addEventListener("submit", submit);

  form.addEventListener("input", (event) => {
    const field = event.target;
    if (field.hasAttribute("aria-invalid") && field.checkValidity()) {
      field.setAttribute("aria-invalid", "false");
    }
  });
}
