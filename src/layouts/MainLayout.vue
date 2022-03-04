<template>
  <div class="container main">
    <div class="row">
      <div class="col-6">
        <WalletInfo/>
        <TokensTransfer/>
      </div>
      <div class="col-6">
        <ContractBalances/>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import {aeInitWallet, initContract} from '../utils/aeternity'
import WalletInfo from "../components/WalletInfo";
import TokensTransfer from "../components/TokensTransfer";
import ContractBalances from "components/ContractBalances";

export default defineComponent({
  name: 'MainLayout',
  components: {ContractBalances, TokensTransfer, WalletInfo},
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
