<script lang="ts">
  import type { ChartCtx } from "@/lib/chart.types";
  import { chartCtxKey } from "@/lib/context-keys";
  import { getContext } from "svelte";

  type Datum = $$Generic;

  const { margins, xScale, innerHeight, innerWidth, labels } =
    getContext<ChartCtx<Datum>>(chartCtxKey);
</script>

<g transform="translate({0} {$innerHeight + margins.top})">
  {#each $xScale.ticks(10) as tick}
    <g transform="translate({$xScale(tick)} 0)">
      <line y1="5" y2="0" stroke="black" />
      <text y="20" text-anchor="middle">{tick}</text>
    </g>
  {/each}
  <text x={$innerWidth / 2} y={60}>{labels.xAxis}</text>
</g>

<style lang="scss">
</style>
