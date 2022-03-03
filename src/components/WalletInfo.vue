<template>
  <div v-if="address && !walletStatus" class="q-ma-sm shadow-3">
    <q-toolbar class="bg-primary text-white q-ma-none" >
      <q-toolbar-title>Wallet information</q-toolbar-title>
    </q-toolbar>
      <div class="wallet" >
        <q-list bordered >
          <q-item>
            <q-item-section>
              <q-item-label overline>Address:</q-item-label>
              <q-item-label>{{ address }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>Balance:</q-item-label>
              <q-item-label>{{ balance }} AE</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>Tokens balance:</q-item-label>
              <q-item-label>{{ tokenBalance }} {{ symbol }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div v-if="walletStatus"><strong>Wallet Status: </strong> {{ walletStatus }}</div>

  </div>
  <img
    v-else
    src="../assets/loading_logo.svg"
    style="width: 50px"
  />

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
