<script setup>
import * as bcbp from 'bcbp'
import lodash from 'lodash'
import { computed } from 'vue'

const content = defineModel({
  default: 'M1DESMARAIS/LUC       EABC123 YULFRAAC 0834 226F001A0025100', // Taken from BCBP Standard (Resolution 792) example
})

const result = computed(() => {
  return bcbp.decode(content.value)
})

const fields = computed(() => {
  const data = result.value.data
  let lines = []
  for (let key in data) {
    let value = data[key]
    if (key == 'legs') {
      continue
    } else if (value === undefined) {
      continue
    }
    lines.push(lodash.startCase(key) + ': ' + value)
  }
  return lines
})

const entries = computed(() => {
  return result.value.data.legs.map((leg) => {
    let result = []
    for (let key in leg) {
      let value = leg[key]
      result.push([lodash.startCase(key), value])
    }
    return result
  })
})
</script>

<template>
  <div>
    <h1>Input BCBP here</h1>
    <textarea v-model="content"></textarea>
    <h2>Result</h2>
    <p v-for="field in fields" :key="field">{{ field }}</p>
    <div v-for="(entry, i) in entries" :key="i">
      <p>Entry #{{ i + 1 }}</p>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="v in entry" :key="v[0]">
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

<style>
.example {
  color: red;
}
</style>
