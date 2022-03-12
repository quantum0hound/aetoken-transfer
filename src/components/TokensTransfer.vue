<template>
  <div v-if="instance">
    <q-form @submit="transfer(transferTo,transferAmount)" class="q-pa-sm" >
        <q-input
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
        <q-btn label="Transfer" type="submit" color="primary"/>
    </q-form>

  </div>


</template>

<script>
import {toRefs,ref} from "vue";
import QTransferResultDialog from "components/QTransferResultDialog";
import {aeContract, aeWallet, transferTokens, getBalances, getBalance, getCalls} from "../utils/aeternity";

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

    let alert =ref(false);
    return {
      alert,
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
        getCalls()
      }
    }, 5000);
  },
  methods: {
    async transfer(to, amount) {
      let dialogProps = {
      };
      try{
        let response = await transferTokens(to, amount);
        dialogProps = {
          result: response.result.returnType,
          errorMessage: response.result.errorMessage,
          gasPrice: response.result.gasPrice,
          gasUsed: response.result.gasUsed
        };
        if (response.result) {
          this.balance = await getBalance(this.address);
          await getBalances();
        }
        else {
          dialogProps.result= "error";
          dialogProps.errorMessage= "Failed to perform transaction";
        }
      }
      catch (err){
        dialogProps.result= "error";
        dialogProps.errorMessage= err;
      }


      this.$q.dialog({
        component : QTransferResultDialog,
        componentProps:dialogProps
      });
    }
  }
}

</script>

<style scoped>

</style>
