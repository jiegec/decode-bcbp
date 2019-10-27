<template>
  <div>
    <h1>Input BCBP here</h1>
    <textarea v-model="content"></textarea>
    <h3>Result</h3>
    <p v-if="result.passengerName">Name: {{ result.passengerName }}</p>
    <p v-if="result.passengerDescription">Description: {{ passengerDescription }}</p>
    <h3>Original Result from georgesmith46/bcbp</h3>
    {{ result }}
  </div>
</template>

<script>
import * as bcbp from "bcbp";
export default {
  name: "Main",
  data: () => ({
    content: "M1DESMARAIS/LUC       EABC123 YULFRAAC 0834 226F001A0025100", // Taken from BCBP Standard (Resolution 792) example
  }),
  computed: {
    passengerDescription() {
      return "";
    },
    result() {
      return bcbp.decode(this.content);
    }
  },
};
</script>

<style>
.example {
  color: red;
}
</style>