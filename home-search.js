/* The front page's search box (index.mdx) opens the docs' own search. Written by docs_home_build.mjs. */
document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element) || !event.target.closest("[data-open-search]")) return;

  const entry = document.getElementById("search-bar-entry") ?? document.getElementById("search-bar-entry-mobile");

  if (entry) entry.click();
  else document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, ctrlKey: true, bubbles: true }));
});
