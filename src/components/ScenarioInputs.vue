<template>
  <v-app-bar-nav-icon
    class="hidden-lg-and-up"
    @click="showDrawer = !showDrawer"
  ></v-app-bar-nav-icon>
  <v-navigation-drawer v-model="showDrawer" width="400">
    <v-app-bar-nav-icon
      icon="mdi-close"
      class="hidden-lg-and-up"
      @click="showDrawer = !showDrawer"
    ></v-app-bar-nav-icon>
    <v-list nav>
      <v-list-item
        link
        href="#socio-economics"
        title="Socio-economics"
      ></v-list-item>
      <Slider
        v-for="input in inputsSocioEco"
        :input="input"
      />
      <v-list-item
        link
        href="#saturation-stocks"
        title="Saturation stocks"
      ></v-list-item>
      <Slider
        v-for="input in inputsSaturationStocks"
        :input="input"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";
import { config as coreConfig } from "../core/src"
import Slider from "./Slider.vue";

const showDrawer = ref(true);

/**
 * Get all inputs configured in `config/inputs.csv` and return an array
 */
function getInputs() {
  // console.log("all inputs: ", coreConfig.inputs.entries().toArray());
  if (!coreConfig?.inputs?.size) {
    console.log(
      `No sliders configured. You can edit 'config/inputs.csv' to get started.`
    );
    return [];
  }

  return coreConfig.inputs.values().toArray();
}

function addCategory(input) {
  const newInput = input;
  newInput.id <= 2
    ? (newInput.category = "socio-economics")
    : (newInput.category = "saturation-stocks");
  return newInput;
}

function getInputsByCategory(category) {
  if (!category) return [];
  return getInputs()
    .map((input) => addCategory(input))
    .filter((input) => category === input.category);
}

const inputsSocioEco = getInputsByCategory("socio-economics");
const inputsSaturationStocks = getInputsByCategory("saturation-stocks");

</script>

<style>
.v-list-item-title {
  font-size: 1.4rem !important;
}
</style>
