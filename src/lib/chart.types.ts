import type { Numeric } from "d3-array";
import type { ScaleLinear, ScaleOrdinal } from "d3-scale";
import type { Readable, Writable } from "svelte/store";

//https://www.newline.co/@kchan/state-management-with-svelte-context-api-part-2--cecddbc5

interface Margins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

// type ChartableDatum<T> = { x: number; y: number } & T;

type Labels = { xAxis: string; yAxis: string };

type Viewbox = `${number} ${number} ${number} ${number}`;

type Accesor<T, U extends Numeric> = (
  datum: T,
  index: number,
  array: Iterable<T>
) => U;

type ChartCtx<Datum> = {
  data: Iterable<Datum>;
  labels: Labels;
  chartContainerEl: HTMLDivElement;
  containerWidth: Writable<number>;
  innerWidth: Readable<number>;
  containerHeight: Writable<number>;
  innerHeight: Readable<number>;
  margins: Margins;
  xAccessor: Accesor<Datum, number>;
  yAccessor: Accesor<Datum, number>;
  xScale: Readable<ScaleLinear<number, number, never>>;
  yScale: Readable<ScaleLinear<number, number, never>>;
  colorScale: ScaleOrdinal<string, unknown, never>;
  categories: Array<any>;
  categoryKey: string;
};

export type { Margins, Accesor, ChartCtx, Viewbox, Labels };
