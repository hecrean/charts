<!--
	@component
	SVG layout component
 -->
<script lang="ts">
  import type { ChartCtx } from "@/lib/chart.types";
  import { chartCtxKey } from "@/lib/context-keys";
  import { getContext } from "svelte";

  // export let viewBox: Viewbox;
  export let layerZIndex: number;
  export let pointerEventsOn: boolean;

  /**  The layer's `<svg>` tag. */
  let svgEl: SVGElementTagNameMap["svg"];
  /** The layer's `<g>` tag. */
  let innerElement: SVGElementTagNameMap["g"];

  type T = $$Generic;

  const {
    data,
    chartContainerEl,
    containerWidth,
    containerHeight,
    margins,
    xAccessor,
    yAccessor,
    xScale,
    yScale,
    colorScale,
  } = getContext<ChartCtx<T>>(chartCtxKey);
</script>

<svg
  bind:this={svgEl}
  viewBox="0 0 {$containerWidth} {$containerHeight}"
  width={$containerWidth}
  height={$containerHeight}
  style:z-index={layerZIndex}
  style:pointer-events={pointerEventsOn === false ? "none" : null}
>
  <defs>
    <slot name="defs" />
  </defs>
  <g bind:this={innerElement}>
    <slot {svgEl} />
  </g>
</svg>

<style>
  svg {
    position: absolute;
    top: 0;
    left: 0;
    overflow: visible;
  }
</style>
