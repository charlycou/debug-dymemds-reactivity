<template>
  <div>{{test}}</div>
<!--  <Line :data="graphView" class="graph" />-->
</template>

<script setup>
import { useModelStore } from "../stores/model";
import {computed, ref, watch} from "vue";

const store = useModelStore();
const props = defineProps(["graph"])

const seriesObs = store.getOutputSeriePointsForVar(props.graph.datasets[0].varId)
const seriesSim = store.getOutputSeriePointsForVar(props.graph.datasets[1].varId)

const test = seriesObs.value[200]

watch(
  () => seriesObs,
  (newSeriesObs) => {
    console.log("terst")
  }
);

const labelsX = seriesObs.value.map((point) => point.x)
const dataObs  = seriesObs
const dataSim  = seriesSim

const graphView = computed(() => {
  return {
    labels:labelsX,
    datasets:[{
      data:dataObs,
      pointStyle: "line",
      color:"red"
    },{
      data:dataSim,
      pointStyle: "line",
      color:"blue"
    }]
  }
})

// export default {
//   name: "Graph",
//   components: {
//     Line,
//   },
//   props: ["graph"],
//   setup(props) {
//     // console.log("props graph: ", props.graph);
//   },
//   data() {
//     return {
//       data: {
//         labels: this.$props.graph.datasets[0].series.points.map(
//           (point) => point.x
//         ),
//         //TODO for dataset in datasets
//         datasets: [
//           {
//             label: enStrings[this.$props.graph.legendItems[0].labelKey],
//             backgroundColor: this.$props.graph.legendItems[0].color,
//             data: this.$props.graph.datasets[0].series.points,
//             // data: getRandomData(),
//             pointStyle: "line",
//             borderColor: this.$props.graph.legendItems[0].color,
//           },
//           {
//             label: enStrings[this.$props.graph.legendItems[1].labelKey],
//             backgroundColor: this.$props.graph.legendItems[1].color,
//             data: this.$props.graph.datasets[1].series.points.map((point) =>
//               point.y > 1 ? point.y : null
//             ),
//             // data: getRandomData(),
//             showLine: false,
//             radius: 4,
//           },
//         ],
//       },
//       options: {
//         maintainAspectRatio: false,
//         plugins: {
//           legend: {
//             display: true,
//             position: "bottom",
//           },
//           title: {
//             display: true,
//             text: enStrings[this.$props.graph.titleKey],
//           },
//         },
//       },
//     };
//   },
// };
</script>

<style>
.graph {
  margin: 1rem;
  max-width: 600px;
  max-height: 400px;
}
</style>
