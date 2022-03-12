<template>
  <div class="q-pa-md">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-tabs v-model="tab" shrink indicator-color="black">
        <q-tab name="contract-balances" icon="account_balance_wallet" label="Contract balances" />
        <q-tab name="contract-operations" icon="view_list" label="Contract operations" />
        <q-tab name="transfer-tokens" icon="sync_alt" label="Transfer tokens" />
      </q-tabs>
      <q-space />
      <q-btn flat label="Homepage" />
    </q-toolbar>
    <div class="row">
      <div class="col-6">
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="contract-balances">
            <ContractBalances/>
          </q-tab-panel>

          <q-tab-panel name="transfer-tokens">
            <TokensTransfer/>
          </q-tab-panel>

          <q-tab-panel name="contract-operations">
            <WalletInfo/>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>

  </div>


<!--  <div class="container main">-->
<!--    <div class="row">-->
<!--      <div class="col">-->
<!--        <q-splitter-->
<!--          v-model="splitterModel"-->
<!--        >-->

<!--          <template v-slot:before>-->
<!--            <q-tabs-->
<!--              v-model="tab"-->
<!--              vertical-->
<!--              class="text-blue"-->
<!--            >-->
<!--              <q-tab name="contract-balances" icon="account_balance_wallet" label="Contract balances" />-->
<!--              <q-tab name="contract-operations" icon="view_list" label="Contract operations" />-->
<!--              <q-tab name="transfer-tokens" icon="sync_alt" label="Transfer tokens" />-->

<!--            </q-tabs>-->
<!--          </template>-->

<!--          <template v-slot:after>-->
<!--            <q-tab-panels-->
<!--              v-model="tab"-->
<!--              animated-->
<!--              swipeable-->
<!--              vertical-->
<!--              transition-prev="jump-up"-->
<!--              transition-next="jump-up"-->
<!--            >-->
<!--              <q-tab-panel name="contract-balances">-->
<!--                <ContractBalances/>-->
<!--              </q-tab-panel>-->

<!--              <q-tab-panel name="transfer-tokens">-->
<!--                <TokensTransfer/>-->
<!--              </q-tab-panel>-->

<!--              <q-tab-panel name="contract-operations">-->
<!--                <WalletInfo/>-->
<!--              </q-tab-panel>-->
<!--            </q-tab-panels>-->
<!--          </template>-->

<!--        </q-splitter>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
import { defineComponent, onMounted ,ref} from 'vue'
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

    return{
      tab: ref('contract-balances'),
    }
  }
})
</script>

<style>
</style>
