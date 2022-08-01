<script lang="ts">
  import type { ChartCtx } from "@/lib/chart.types";
  import { chartCtxKey } from "@/lib/context-keys";
  import { getContext } from "svelte";

  type Datum = $$Generic;

  const { margins, xScale, innerHeight, innerWidth, labels } =
    getContext<ChartCtx<Datum>>(chartCtxKey);
</script>

<g transform="translate(0 {$innerHeight})">
  {#each $xScale.ticks(5) as tick}
    <g transform="translate({$xScale(tick)} 0)">
      <line y1="5" y2="0" stroke="black" />
      <text y="20" text-anchor="middle">{tick}</text>
    </g>
  {/each}
  <path class="axis-line" d="M0,5V0H${$innerWidth}V5" />
  <text x={$innerWidth / 2} y={15}>{labels.xAxis}</text>
</g>

<style>
  .axis-line {
    fill: purple;
    stroke: orange;
    stroke-width: 1;
    shape-rendering: crispEdges;
  }

  .tick {
    font-size: 0.725em;
    font-weight: 200;
  }

  line,
  .tick line {
    stroke: #aaa;
    stroke-dasharray: 2;
  }

  .tick text {
    fill: #666;
  }

  .tick .tick-mark,
  .baseline {
    stroke-dasharray: 0;
  }
  /* This looks slightly better */
  .axis.snapTicks .tick:last-child text {
    transform: translateX(3px);
  }
  .axis.snapTicks .tick.tick-0 text {
    transform: translateX(-3px);
  }
</style>
