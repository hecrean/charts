<script lang="ts">
  import type { ChartCtx } from "@/lib/chart.types";
  import { chartCtxKey } from "@/lib/context-keys";
  import { getContext } from "svelte";

  type $$Props = {
    zIndex: number;
    pointerEventsEnabled: true;
  };
  export let zIndex: number;
  export let pointerEventsEnabled: boolean;

  type Datum = $$Generic;

  const { margins, containerWidth, containerHeight } =
    getContext<ChartCtx<Datum>>(chartCtxKey);

  let canvasEl: HTMLCanvasElement;
  let gl: CanvasRenderingContext2D;
</script>

<canvas
  width={$containerWidth}
  height={$containerHeight}
  bind:this={canvasEl}
  class="layercake-layout-canvas"
  style:z-index={zIndex}
  style:pointer-events={pointerEventsEnabled ? "none" : null}
  style:top={margins.top + "px"}
  style:right={margins.right + "px"}
  style:bottom={margins.bottom + "px"}
  style:left={margins.left + "px"}
/>
<slot {canvasEl} {gl} />

<style lang="scss">
  canvas {
    width: 100%;
    height: 100%;
    position: absolute;
  }
</style>
