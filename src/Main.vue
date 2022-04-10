<template>
  <div>
    <h1>Input BCBP here</h1>
    <textarea v-model="content"></textarea>
    <h2>Result</h2>
    <p v-for="field in fields">{{ field }}</p>
    <div v-for="(entry, i) in entries">
      <p>Entry #{{ i + 1 }}</p>
      <table>
        <thead>
          <th>Key</th>
          <th>Value</th>
        </thead>
        <tbody>
          <tr v-for="v in entry">
            <td>{{ v[0] }}</td>
            <td>{{ v[1] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <table></table>
    <h3>Original Result from georgesmith46/bcbp</h3>
    {{ result }}
  </div>
</template>

<script>
import * as bcbp from "bcbp";
import lodash from "lodash";
export default {
  name: "Main",
  data: () => ({
    content: "M1DESMARAIS/LUC       EABC123 YULFRAAC 0834 226F001A0025100", // Taken from BCBP Standard (Resolution 792) example
  }),
  computed: {
    fields() {
      let result = [];
      for (let key in this.result) {
        let value = this.result[key];
        if (key == "legs") {
          continue;
        } else if (value === undefined) {
          continue;
        }
        result.push(lodash.startCase(key) + ": " + value);
      }
      return result;
    },
    result() {
      return bcbp.decode(this.content);
    },
    entries() {
      return this.result.legs.map((leg) => {
        let result = [];
        for (let key in leg) {
          let value = leg[key];
          result.push([lodash.startCase(key), value]);
        }
        return result;
      });
    },
  },
};
</script>

<style>
.example {
  color: red;
}
</style>