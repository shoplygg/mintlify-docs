/*
 * The live demos on the Embeds and Checkout Kit guides: the real checkout, opened in the
 * page that describes it. Mintlify serves any script in this repository on every page,
 * so this file does nothing until one of its blocks is pressed.
 *
 * NOT SWITCHED ON YET. The store and the product a demo sells are left empty on purpose,
 * and a demo with none says so when it is pressed. Before release, fill in DEMO below
 * with a store and a product that are meant to be shown to the public, and both demos
 * work: nothing else has to change. AGENTS.md says the same.
 */
(() => {
  const DEMO = {
    // The store's ID, as its dashboard's SDK page shows it. The kit needs it.
    store: "",
    // The product both demos sell, and one option of it if the demo should skip the choice.
    product: "",
    variant: "",
  };

  const SDK = "https://shoply.gg/sdk/";
  const loading = {};

  /** One of Shoply's own scripts, asked for once however often a demo is pressed. */
  const load = (file) =>
    (loading[file] ??= new Promise((done, failed) => {
      const script = document.createElement("script");

      script.src = SDK + file;
      script.onload = done;
      script.onerror = failed;
      document.head.append(script);
    }));

  const say = (block, words) => {
    const line = block.querySelector("[data-demo-says]");

    if (!line) return;

    line.textContent = words;
    line.hidden = words === "";
  };

  /** The docs are dark or light by a class on the page: the checkout is opened to match. */
  const look = () => (document.documentElement.classList.contains("dark") ? "dark" : "light");

  let kit = null;

  const open = async (block) => {
    if (DEMO.product === "") return say(block, "The live demo is not switched on yet.");

    say(block, "");

    if (block.getAttribute("data-shoply-demo") === "embed") {
      await load("embed.js");
      window.shoplyEmbed.open({ product: DEMO.product, theme: look(), ...(DEMO.variant ? { variant: DEMO.variant } : {}) });

      return;
    }

    // The kit: its one piece that is the whole checkout, in the stage the block keeps for it.
    const stage = block.querySelector("[data-demo-stage]");

    if (!stage || kit) return;

    await load("kit.js");

    stage.hidden = false;
    kit = window.shoplyKit({ store: DEMO.store, product: DEMO.product, theme: look(), ...(DEMO.variant ? { variant: DEMO.variant } : {}) });
  };

  document.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest("[data-demo-open]") : null;
    const block = button?.closest("[data-shoply-demo]");

    if (!block) return;

    open(block).catch(() => say(block, "The demo could not be loaded. Try again in a moment."));
  });

  // The docs change page without loading one, and a kit left behind would go on listening
  // for a stage that is gone.
  addEventListener("popstate", () => {
    if (kit && !document.querySelector("[data-demo-stage]")) {
      kit.destroy();
      kit = null;
    }
  });
})();
