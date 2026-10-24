"use strict";
// Only change this URL if the GitHub account changes.
const GITHUB_PROFILE = "https://github.com/TaeHeonKim12";

function safeLink(value, externalOnly = false) {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const u = new URL(value, document.baseURI);
    if (externalOnly && u.protocol !== "https:") return null;
    if (!["https:", "http:", "file:"].includes(u.protocol)) return null;
    if (u.username || u.password) return null;
    if (u.protocol === "file:" && location.protocol !== "file:") return null;
    return u.href;
  } catch (_) { return null; }
}
function node(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text) n.textContent = text;
  return n;
}
function projectLink(label, path, cls) {
  const href = safeLink(path);
  if (!href) return null;
  const a = node("a", cls, label);
  a.href = href; a.target = "_blank"; a.rel = "noopener noreferrer";
  return a;
}
function card(item) {
  const article = node("article", "project-card");
  if (item.status) article.append(node("span", "status", item.status));
  article.append(node("h3", "", item.title), node("p", "", item.description));
  const tags = node("div", "tag-list");
  for (const method of item.methods || []) tags.append(node("span", "", method));
  article.append(tags);
  const actions = node("div", "card-actions");
  const primary = projectLink("View project ↗", item.url, "");
  if (primary) { primary.setAttribute("aria-label", "View " + item.title + " (opens in a new tab)"); actions.append(primary); }
  else actions.append(node("span", "availability", "Report forthcoming"));
  for (const [label, key] of [["PDF ↗", "pdf"], ["GitHub ↗", "github"]]) {
    const a = projectLink(label, item[key], "secondary");
    if (a) actions.append(a);
  }
  article.append(actions);
  return article;
}
function validateProjects(data) {
  if (!Array.isArray(data)) throw new Error("projects.json must contain a JSON array.");
  const ids = new Set();
  for (const item of data) {
    if (!item || typeof item.title !== "string" || typeof item.description !== "string") throw new Error("Every project needs a title and description.");
    if (item.methods !== undefined && (!Array.isArray(item.methods) || item.methods.some(x => typeof x !== "string"))) throw new Error("Project methods must be an array of strings.");
    if (item.id && ids.has(item.id)) throw new Error("Project IDs must be unique.");
    if (item.id) ids.add(item.id);
    if (item.status !== undefined && typeof item.status !== "string") throw new Error("Project status must be text.");
  }
  return data;
}
async function loadProjects() {
  const lists = document.querySelectorAll("[data-project-list]");
  if (!lists.length) return;
  try {
    if (location.protocol === "file:") throw new Error("For a local preview, open this folder through an HTTP preview server. The automatic catalog loads normally on GitHub Pages.");
    const response = await fetch("projects.json", {cache: "no-cache"});
    if (!response.ok) throw new Error("The project list could not be loaded. Please try again later.");
    const data = validateProjects(await response.json());
    for (const list of lists) {
      const selected = list.dataset.featured === "true" ? data.filter(p => p.featured === true) : data;
      list.replaceChildren();
      if (!selected.length) list.append(node("p", "muted", "Projects will be added here soon."));
      else selected.forEach(p => list.append(card(p)));
    }
  } catch (error) {
    for (const list of lists) {
      const box = node("div", "load-error");
      box.append(node("p", "", location.protocol === "file:" ? error.message : "The project catalog is temporarily unavailable. Please check back shortly."));
      const a = node("a", "text-link", "View project list (JSON)"); a.href = "projects.json"; box.append(a);
      list.replaceChildren(box);
    }
    console.warn("Project catalog:", error.message);
  }
}
const github = safeLink(GITHUB_PROFILE, true);
if (github) {
  document.querySelectorAll("[data-github]").forEach(a => { a.href = github; a.hidden = false; a.target = "_blank"; a.rel = "noopener noreferrer"; });
  document.querySelectorAll("[data-github-pending]").forEach(n => { n.hidden = true; });
}
loadProjects();
