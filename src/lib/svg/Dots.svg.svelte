<script lang="ts">
  import type { ChartCtx } from "@/lib/chart.types";
  import { chartCtxKey } from "@/lib/context-keys";
  import { getContext } from "svelte";

  type Datum = $$Generic;

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
    categoryKey,
  } = getContext<ChartCtx<Datum>>(chartCtxKey);

  console.log(data);

  console.log(data);
  console.log(yAccessor(data[0], 0, data));
</script>

<g>
  {#each [...data] as datum, i}
    <circle
      r="3"
      cx={$xScale(xAccessor(datum, i, data))}
      cy={$yScale(yAccessor(datum, i, data))}
      fill={"red"}
    />
  {/each}
</g>
