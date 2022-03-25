<template>
  <div v-if="address && !walletStatus">
    <div><b>Address:</b> {{ address }}</div>
    <div>
      <span v-if="balance">
        <b>Balances:</b> {{ balance }} AE
      </span>
      <span v-if="tokenBalance && symbol">
        , {{ tokenBalance }} {{ symbol }}
      </span>
    </div>
  </div>

</template>

<script>
import {defineComponent, toRef, toRefs} from 'vue'
import {aeContract, aeWallet} from '../utils/aeternity'

export default defineComponent({
  name: 'WalletInfo',
  setup () {
    const { address, balance, walletStatus, activeWallet } = toRefs(aeWallet);

    const {
      symbol,
      balances
    } = toRefs(aeContract);

    const tokenBalance = toRef(aeContract,"balance");

    return { activeWallet, address, balance, walletStatus, symbol,balances,tokenBalance };
  },
  watch:{

  }
})
</script>

<style scoped>
</style>
