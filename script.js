(() => {
"use strict";
const NUMBER = "2250709000102";
const modal = document.querySelector("#booking-modal");
const form = document.querySelector("#booking-form");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
let lastFocus = null;
const waUrl = message => `https://wa.me/${NUMBER}?text=${encodeURIComponent(message)}`;

document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
document.querySelectorAll("[data-whatsapp]").forEach(link => {
  link.href = waUrl("Bonjour A.Linda Institut, je souhaiterais obtenir des informations sur vos prestations et prendre rendez-vous.");
  link.target = "_blank"; link.rel = "noopener noreferrer";
});
function openModal() {
  lastFocus = document.activeElement;
  modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setTimeout(() => modal.querySelector("input")?.focus(), 100);
}
function closeModal() {
  modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lastFocus?.focus?.();
}
document.querySelectorAll(".js-book").forEach(btn => btn.addEventListener("click", () => {
  nav?.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
  openModal();
}));
document.querySelectorAll("[data-close]").forEach(btn => btn.addEventListener("click", closeModal));
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    menuButton.setAttribute("aria-label", open ? "Ouvrir le menu" : "Fermer le menu");
    nav.classList.toggle("is-open", !open);
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }));
}
const dateInput = document.querySelector("#client-date");
if (dateInput) {
  const now = new Date();
  dateInput.min = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0,10);
}
form?.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const service = String(data.get("service") || "").trim();
  const date = String(data.get("date") || "").trim();
  const time = String(data.get("time") || "").trim();
  const details = String(data.get("message") || "").trim();
  const feedback = document.querySelector("#modal-feedback");
  if (!name || !service || !date || !time) {
    feedback.textContent = "Veuillez remplir tous les champs obligatoires."; return;
  }
  const dateFr = new Date(`${date}T12:00:00`).toLocaleDateString("fr-FR", {
    weekday:"long", day:"numeric", month:"long", year:"numeric"
  });
  const lines = [
    "Bonjour A.Linda Institut, je souhaite demander un rendez-vous.", "",
    `Nom : ${name}`, phone ? `Téléphone : ${phone}` : null,
    `Prestation souhaitée : ${service}`, `Date souhaitée : ${dateFr}`,
    `Heure souhaitée : ${time}`, details ? `Précisions : ${details}` : null, "",
    "Merci de me confirmer votre disponibilité."
  ].filter(Boolean);
  feedback.textContent = "WhatsApp va s'ouvrir avec votre demande. Appuyez sur Envoyer dans WhatsApp.";
  window.open(waUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
});
})();