<script lang="ts">
  import Chart from "@/lib/Chart.svelte";
  import { Svg, XAxis, YAxis } from "@/lib/svg";
  import Dots from "./lib/svg/Dots.svg.svelte";
</script>

<main>
  <Chart
    let:chartCtxKey
    data={[
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 4, y: 2 },
      { x: 5, y: 2 },
      { x: 6, y: 2 },
      { x: 7, y: 2 },
      { x: 8, y: 3 },
      { x: 9, y: 3 },
      { x: 10, y: 3 },
    ]}
    xAccessor={(d) => d.x}
    yAccessor={(d) => d.x}
    categoryKey={"species"}
    colors={["#754668", "#982649", "#9395d3"]}
    labels={{ xAxis: "x axis", yAxis: "y axis" }}
    pointerEventsOn={true}
    margins={{
      top: 10,
      right: 30,
      bottom: 30,
      left: 60,
    }}
  >
    <Svg pointerEventsOn={true} layerZIndex={0}>
      <XAxis />
      <YAxis />
      <Dots />
    </Svg>
  </Chart>
</main>

<style lang="scss">
  main {
    max-width: 800px;
    width: 80%;
    height: 200px;
    background-color: red;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-items: center;
    padding: 2rem 2rem;
  }
</style>
