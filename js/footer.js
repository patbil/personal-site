export function setFooterDate() {
  const footerYear = document.getElementById("current-year");
  footerYear.textContent = new Date().getFullYear();
}
