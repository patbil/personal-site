export const LANGUAGE = {
  supported: ["pl", "en"],
  fallback: "pl",
  storageKey: "lang",
};

export const RESUME = {
  driveIds: {
    pl: "1Bil74dFtPYr_odtiNjqiNR206CwzmV9u",
    en: "1yrXPh_yrHY5kP2Y4bPMn3i1EC-kyTv1v",
  },
  mode: "view",
  bundled: "./assets/files/resume-{lang}.pdf",
};

export const FORM = {
  endpoint: "https://formspree.io/f/mojnyyzz",
  feedbackMs: 3000,
};

export const LOADER = {
  // Hard ceiling for unlocking the page when the intro animation cannot run.
  watchdogMs: 3000,
};

export const SECTION_OBSERVER = {
  rootMargin: "-25% 0px -25% 0px",
  threshold: 0.2,
};

export const MEDIA = {
  mobile: "(max-width: 768px)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
  coarsePointer: "(pointer: coarse)",
};
