import { RESUME } from "./config.js";

const DRIVE = {
  view: (id) => `https://drive.google.com/file/d/${id}/view`,
  download: (id) =>
    `https://drive.usercontent.google.com/download?id=${id}&export=download`,
};

export function resumeUrl(language) {
  const id = RESUME.driveIds[language];
  const build = DRIVE[RESUME.mode];
  return id && build ? build(id) : RESUME.bundled.replace("{lang}", language);
}
