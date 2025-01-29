<template>
  <div class="graphs-container">
    <h1 class="category-title" id="socio-economics">Socio-economics</h1>
    <div class="graphs-category">
      <Graph v-for="graph in graphsSocioEco" :graph="graph" />
    </div>
    <h1 class="category-title" id="saturation-stocks">Saturation stocks</h1>
    <div class="graphs-category">
      <Graph v-for="graph in graphsSaturationStocks" :graph="graph" />
    </div>
  </div>
</template>

<script setup>
import { config as coreConfig } from "../core/src";
import Graph from "./Graph.vue";
// import model from "./init.ts";
import { useModelStore } from "../stores/model";

const store = useModelStore();






// const model = store.modelStored;

/**
 * Get all graphs configured in `config/graphs.csv` and return an array
 */
function getGraphs() {
  // console.log("all graphs: ", coreConfig.graphs.entries().toArray());
  if (!coreConfig?.graphs?.size) {
    console.log(
      `No graphs configured. You can edit 'config/graphs.csv' to get started.`
    );
    return [];
  }

  return Array.from(coreConfig.graphs.values());
}

// function addDataSeries(graph) {
//   const newGraph = graph;
//   newGraph.datasets.forEach((item) => {
//     item.series = model.getSeriesForVar(item.varId);
//     item.varId.includes("obs")
//       ? (item.type = "observed")
//       : (item.type = "expected");
//   });
//   return newGraph;
// }

function updateCategory(graph) {
  graph.id <= 3
    ? (graph.category = "socio-economics")
    : (graph.category = "saturation-stocks");
}

//TODO ??
// function defineDatasets(graph) {
//   // const observedData = graph.datasets.
//   return {
//     category: graph.category,
//     id: graph.id,
//     kind: graph.kind,
//     titleKey: graph.titleKey,
//     xMax: graph.xMax,
//     xMin: graph.xMin,
//     yFormat: graph.yFormat,
//     yMin: graph.yMin,
//     observedDataset: observedDataset,
//     calculatedDataset: calculatedDataset,
//   };
// }

function getGraphsByCategory(category) {
  if (!category) return [];
  //TODO what if one empty/null/undefined graph?
  const graphs = getGraphs()
    graphs.forEach(graph => {
    updateCategory(graph)
  })
  return graphs.filter((graph) => category === graph.category);
  //
  // return getGraphs()
  //   .map((graph) => addDataSeries(graph))
  //   .map((graph) => addCategory(graph))
  //   .filter((graph) => category === graph.category);
}

// const graphs = getGraphs()
//   .map((graph) => addModel(graph))
//   .map((graph) => addCategory(graph));
// console.log("newGraphs", graphs);

const graphsSocioEco = getGraphsByCategory("socio-economics");
const graphsSaturationStocks = getGraphsByCategory("saturation-stocks");
</script>

<style>
.graphs-container {
  margin: 4rem;
  display: flex;
  flex-direction: column;
}
.category-title:not(:first-child) {
  margin-top: 4rem;
}
.graphs-category {
  display: flex;
  flex-wrap: wrap;
}
</style>
