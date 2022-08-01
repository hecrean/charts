<script lang="ts">
  import type { ColorSpaceObject } from "d3";

  import { extent } from "d3-array";
  import { scaleLinear, scaleOrdinal } from "d3-scale";
  import { onMount, setContext } from "svelte";
  import { derived, writable } from "svelte/store";
  import type { Accesor, ChartCtx as Ctx, Margins } from "./chart.types";
  import { chartCtxKey } from "./context-keys";

  //https://www.newline.co/@kchan/state-management-with-svelte-context-api-part-2--cecddbc5

  /**	The .chart-container `<div>` tag.  */
  type Datum = $$Generic;

  type $$Props = {
    data: Iterable<Datum>;
    labels: { xAxis: string; yAxis: string };
    xAccessor: Accesor<Datum, number>;
    yAccessor: Accesor<Datum, number>;
    pointerEventsOn: boolean;
    margins: Margins;
    categoryKey: string;
    colors: Array<ColorSpaceObject>;
  };
  //   export let data: Iterable<A>;
  let chartContainerEl: HTMLDivElement;

  let containerWidth = writable(500);
  let containerHeight = writable(500);

  export let data: Iterable<Datum>;
  export let xAccessor: Accesor<Datum, number>;
  export let yAccessor: Accesor<Datum, number>;
  export let labels: { xAxis: string; yAxis: string };
  export let pointerEventsOn: boolean = true;
  export let margins: Margins;
  export let categoryKey: string;
  export let colors: Array<ColorSpaceObject>;

  $: innerWidth = derived(
    containerWidth,
    ($containerWidth) => $containerWidth - (margins.left + margins.right)
  );
  $: innerHeight = derived(
    containerHeight,
    ($containerHeight) => $containerHeight - (margins.top + margins.bottom)
  );

  const xScale = derived(containerWidth, ($containerWidth) =>
    scaleLinear()
      .domain(extent(data, xAccessor))
      .range([margins.left, $containerWidth - margins.right])
  );

  const yScale = derived(containerHeight, ($containerHeight) =>
    scaleLinear()
      .domain(extent(data, yAccessor))
      .range([$containerHeight - margins.bottom, margins.top])
  );

  // const xScale = derived(innerWidth, ($innerWidth) =>
  //   scaleLinear().domain(extent(data, xAccessor)).range([0, $innerWidth])
  // );

  // const yScale = derived(innerHeight, ($innerHeight) =>
  //   scaleLinear().domain(extent(data, yAccessor)).range([$innerHeight, 0])
  // );

  let categories = Array.from(new Set([...data].map((d) => d[categoryKey])));
  let colorScale = scaleOrdinal().domain(categories).range(colors);

  let ctx: Ctx<Datum>;

  $: ctx = {
    data,
    labels,
    chartContainerEl,
    containerWidth,
    containerHeight,
    innerWidth,
    innerHeight,
    margins,
    xAccessor,
    yAccessor,
    xScale,
    yScale,
    categoryKey,
    categories,
    colorScale,
  };

  $: setContext(chartCtxKey, ctx);

  /* --------------------------------------------
   * Keep track of whethr the component has mounted
   * This is used to emit warnings once we have measured
   * the container object and it doesn't have proper dimensions
   */
  let isMounted = false;
  onMount(() => {
    isMounted = true;
  });
</script>

<div
  bind:this={chartContainerEl}
  class:chart-container={true}
  style:pointer-events={pointerEventsOn ? "none" : null}
  bind:clientWidth={$containerWidth}
  bind:clientHeight={$containerHeight}
>
  <slot {chartCtxKey} />
</div>

<style>
  .chart-container,
  .chart-container :global(*) {
    box-sizing: border-box;
  }
  .chart-container {
    background-color: green;
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
