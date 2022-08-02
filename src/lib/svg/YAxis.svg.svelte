<script lang="ts">
  import type { ChartCtx } from "@/lib/chart.types";
  import { chartCtxKey } from "@/lib/context-keys";
  import { getContext } from "svelte";

  type Datum = $$Generic;
  const { margins, yScale, innerHeight, containerWidth, labels } =
    getContext<ChartCtx<Datum>>(chartCtxKey);
</script>

<g transform="translate({margins.left}, 0)">
  {#each $yScale.ticks(6) as tick}
    <g transform="translate(0 {$yScale(tick)})">
      <line x1="-5" x2="0" stroke="black" />
      <text x="-10" dominant-baseline="middle" text-anchor="end">{tick}</text>
    </g>
  {/each}

  <text
    x={($innerHeight / 2) * -1}
    y={-45}
    transform="rotate(-90)"
    text-anchor="middle"
    >{labels.yAxis}
  </text>
</g>

<style>
  .axis-line {
    fill: blue;
    stroke: rgb(128, 128, 128);
    stroke-width: 1;
    shape-rendering: crispEdges;
  }
</style>
