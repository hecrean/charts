<script lang="ts">
  import type { ChartCtx } from "@/lib/chart.types";
  import { chartCtxKey } from "@/lib/context-keys";
  import { getContext } from "svelte";

  type T = $$Generic;

  const { categories, margins, colorScale } =
    getContext<ChartCtx<T>>(chartCtxKey);
</script>

<g transform={`translate(${margins.left + 25}, 25)`}>
  {#each categories as category, i}
    <g transform={`translate(0, ${i * 25})`}>
      <rect height="10" width="10" fill={colorScale(category)} />
      <text dominant-baseline="middle" y="5" x="20">{category}</text>
    </g>
  {/each}
</g>
