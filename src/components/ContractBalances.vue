<template>
  <div v-if="balances" class="q-ma-sm shadow-3">
    <q-toolbar class="bg-primary text-white q-ma-none" >
      <q-toolbar-title>Contract balances</q-toolbar-title>
    </q-toolbar>
    <q-markup-table flat bordered separator="cell" dense>
      <thead>
      <tr><th colspan="2">Contract address: {{ address }}</th></tr>
      <tr>
        <th>Address</th>
        <th>Tokens count</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="balance in balances" :key="balance[0]">
        <td>{{ balance[0] }}</td>
        <td>{{ balance[1] }}</td>
      </tr>
      </tbody>
    </q-markup-table>
  </div>


</template>

<script>
import {toRefs} from "vue";
import {aeContract} from "../utils/aeternity"
export default {
  name: "ContractBalances",
  setup () {
    const {
      balances,
      address
    } = toRefs(aeContract);

    return {
      balances,
      address
    };
  },
  methods:{

  }
}

</script>

<style scoped>
th{
  text-align: left;
}
</style>
