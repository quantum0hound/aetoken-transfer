<template>
  <div v-if="instance" class="q-ma-sm shadow-3">
    <q-toolbar class="bg-primary text-white q-ma-none">
      <q-toolbar-title>
        Transfer tokens
      </q-toolbar-title>
    </q-toolbar>
    <div class="q-pa-sm ">
      <q-input
        class="q-pt-xs"
        dense
        filled
        v-model="transferTo"
        label="Recipient address (ak_...)"
        lazy-rules
        :rules="[
          val => val && val.length > 3 || 'Please enter recipient address',
          val => val.startsWith('ak_') || 'Incorrect recipient address format'
        ]"
      />
      <q-input
        dense
        filled
        type="number"
        v-model="transferAmount"
        label="Tokens amount"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please enter amount tokens to send',
          val => val > 1                    || 'Please enter a valid amount of tokens'
        ]"
      />
      <q-btn label="Transfer" type="submit" color="primary" @click="transfer(transferTo,transferAmount)"/>
      <div v-if="transferResult">
        <h4 style="text-align: center">Transfer result:</h4>
        <ul class="list-group mb-3">
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <h6>Status</h6>
            <div>{{ transferResult.result }}</div>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm"
              v-if="transferResult && transferResult.result==='ok'">
            <h6>Gas price</h6>
            <div>{{ transferResult.gasPrice }}</div>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm"
              v-if="transferResult && transferResult.result==='ok'">
            <h6>Gas used:</h6>
            <div>{{ transferResult.gasUsed }}</div>
          </li>

        </ul>
      </div>

    </div>
  </div>


</template>

<script>
import {toRefs} from "vue";
import {aeContract, aeWallet, transferTokens, getBalances, getBalance} from "../utils/aeternity";

export default {
  name: "TokensTransfer",
  data: () => ({
    transferTo: '',
    transferAmount: '1000000',
    transferResult: null
  }),

  setup() {
    const {
      instance,
      balance,
      owner
    } = toRefs(aeContract);

    const {
      address,
    } = toRefs(aeWallet);

    return {
      instance,
      balance,
      owner,
      address
    };
  },

  mounted() {
    setInterval(() => {
      if (this.instance) {
        getBalances();
        getBalance(this.address).then(b => this.balance = b);
      }
    }, 5000);
  },
  methods: {
    async transfer(to, amount) {
      this.transferResult = null;
      let err = "";
      if (!to) {
        err = "Recepient address is not specified";
      }
      if (Number(amount) < 1 || Number(amount) > this.balance) {
        err = "Incorrect amount";
      }
      if (
        to === this.address
      ) {
        err = "Cannot send to yourself";
      }
      if (err) {
        alert("Unable to transfer tokens : " + err);
        return null;
      }
      let response = await transferTokens(to, amount);
      if (response.result) {
        this.transferResult = {
          result: response.result.returnType,
          gasPrice: response.result.gasPrice,
          gasUsed: response.result.gasUsed
        };
        this.balance = await getBalance(this.address);
        await getBalances();
      } else {
        this.transferResult = {
          result: "error",
          errorMessage: "Failed to perform transaction"
        };
      }
    }
  }
}

</script>

<style scoped>

</style>
