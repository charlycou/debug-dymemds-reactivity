// Utilities
import {createModel} from "../core/src";
import { defineStore } from "pinia";
import { ref } from "vue";

const modelInit = await createModel()

export const useModelStore = defineStore("app", () => {

  const model = ref(modelInit)

  function updateInput(value, id) {
    console.log("update input " + value)
    model.value?.getInputForId(id).set(value);
  }

  function getOutputSeriePointsForVar(varId) {
    const series = model.value.getSeriesForVar(varId)
    return ref(series.points)
  }


  return { model, updateInput, getOutputSeriePointsForVar};
});
