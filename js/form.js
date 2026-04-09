import { getTranslation } from "./language.js";

const form = document.getElementById("contact-form");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- STATE ---
function changeElementState(element, classList, { state, text }) {
  element.classList.remove(...classList);
  if (state) element.classList.add(state);
  if (text) element.textContent = text;
}

function setButtonState(state, text) {
  const submitButton = form.querySelector(".submit-trigger");
  changeElementState(submitButton, ["loading", "success", "error"], {
    state,
    text,
  });
}

function setMessageState(state, text) {
  const submitMessage = form.querySelector(".submit-message");
  changeElementState(submitMessage, ["success", "error"], { state, text });
}

// --- HTTP ---
async function sendMessage(data) {
  const response = await fetch("https://formspree.io/f/mojnyyzz", {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json",
    },
  });

  return response;
}

// --- HELPERS ---
function showFeedback(status, message, buttonText) {
  setButtonState(status, buttonText);
  if (message) setMessageState(status, message);

  setTimeout(() => {
    setButtonState(null, getTranslation("contact.send"));
    setMessageState(false);
  }, 3000);
}

export function initForm() {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setButtonState("loading");

    try {
      const data = new FormData(form);
      const response = await sendMessage(data);
      await sleep(500);

      if (response.ok) {
        form.reset();
        showFeedback(
          "success",
          getTranslation("form.success"),
          getTranslation("form.sent"),
        );
      } else {
        showFeedback("error", getTranslation("form.error"));
      }
    } catch (err) {
      console.error("Form submission failed:", err);
      showFeedback("error", getTranslation("form.error"));
    }
  });
}
