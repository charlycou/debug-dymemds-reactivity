<template>
  <div class="slider-container">
    <div>{{ slider.label }}: {{ sliderValue }} units</div>
    <v-slider
      v-model="sliderValue"
      v-on:update:modelValue="store.updateInput(sliderValue,slider.id)"
      :min="slider.min"
      :max="slider.max"
      :step="slider.step"
    ></v-slider>
  </div>
</template>

<script setup>
import enStrings from "../core/strings/en.js";
import {computed, ref, toRef, toRefs, unref} from "vue";
import {useModelStore} from "@/stores/model.js";

const store = useModelStore()

const props = defineProps(['input'])
const slider = {
    label: enStrings[props.input.labelKey],
    value: props.input.defaultValue,
    id: props.input.id,
    max: props.input.maxValue,
    min: props.input.minValue,
    step: props.input.step,

}


// const sliderValue = ref(0)
//Get the min value of the input from the props
const sliderValue = ref(unref(slider.min))

// export default {
//   props: ["input"],
//   setup(props) {
//     // console.log("props input: ", props.input);
//   },
//   data() {
//     return {
//       slider: {
//         label: enStrings[this.$props.input.labelKey],
//         value: this.$props.input.defaultValue,
//         id: this.$props.input.id,
//         max: this.$props.input.maxValue,
//         min: this.$props.input.minValue,
//         step: this.$props.input.step,
//       },
//     };
//   },
// };
</script>

<style>
.slider-container {
  margin: 1rem 1rem 1rem 1.5rem !important;
}
</style>
