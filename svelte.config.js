import sveltePreprocess from "svelte-preprocess";
import switchCase from "svelte-switch-case";

const config = {
  preprocess: [sveltePreprocess(), switchCase()],
};

export default config;
