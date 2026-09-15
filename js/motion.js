import { MEDIA } from "./config.js";

const reducedMotion = window.matchMedia(MEDIA.reducedMotion);
const coarsePointer = window.matchMedia(MEDIA.coarsePointer);

export const prefersReducedMotion = () => reducedMotion.matches;

export const isCoarsePointer = () => coarsePointer.matches;
