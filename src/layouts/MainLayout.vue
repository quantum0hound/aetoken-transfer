<template>
  <div class="container main">
    <div class="row">
      <div class="col-6">
        <WalletInfo/>
        <TokensTransfer/>
      </div>
      <div class="col-6">

      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import {aeInitWallet, initContract} from '../utils/aeternity'
import WalletInfo from "../components/WalletInfo";
import TokensTransfer from "../components/TokensTransfer";

export default defineComponent({
  name: 'MainLayout',
  components: {TokensTransfer, WalletInfo},
  setup () {
    onMounted(async () => {
      await aeInitWallet();
      await initContract();
    })
  }
})
</script>

<style>
</style>
