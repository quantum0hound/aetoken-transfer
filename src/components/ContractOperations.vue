<template>
  <div class="q-pa-md">
    <q-table
      :rows="calls"
      :columns="columns"
      row-key="name"
      separator="cell"
    />
  </div>
</template>

<script>
import {toRefs} from "vue";
import {aeContract} from "src/utils/aeternity";

const columns = [
  { name: 'datetime', align: 'center', label: 'Date and time', field: 'datetime', sortable: true },
  { name: 'sender', align: 'center', label: 'Sender', field: 'sender', sortable: true },
  { name: 'recipient',align: 'center', label: 'Recipient', field: 'recipient' },
  { name: 'amount', align: 'center',label: 'Amount', field: 'amount'},
]
const rows = [
  {
    datetime: "19.06.89",
    sender : "Max",
    recipient : "John",
    amount :"300"
  },
];

export default {
  name: "ContractOperations",
  setup(){
    const {
      calls
    } = toRefs(aeContract);

    return {
      columns,
      calls
    };
  }

}
</script>

<style scoped>

</style>
