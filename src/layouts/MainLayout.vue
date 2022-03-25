<template>
  <div class="q-pa-md">

    <q-toolbar class="bg-primary text-white shadow-2">
      <q-tabs v-model="tab" shrink indicator-color="black">
        <q-tab name="transfer-tokens" icon="sync_alt" label="Transfer tokens" />
        <q-tab name="contract-balances" icon="account_balance_wallet" label="Contract balances" />
        <q-tab name="contract-operations" icon="view_list" label="Contract operations" />

      </q-tabs>
      <q-space />
      <WalletInfo/>

    </q-toolbar>

    <div class="row q-mt-md">
      <div class="col">
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="contract-balances">
            <div class="row">
              <div class="col"></div>
              <div class="col-6">
                <ContractBalances/>
              </div>
              <div class="col"></div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="transfer-tokens">
            <div class="row">
              <div class="col"></div>
              <div class="col-6">
                <TokensTransfer/>
              </div>
              <div class="col"></div>
            </div>

          </q-tab-panel>

          <q-tab-panel name="contract-operations">
            <div class="row">
              <div class="col">
                <ContractOperations/>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>

    </div>

  </div>
</template>

<script>
import {defineComponent, onMounted, ref, toRefs,toRef} from 'vue'
import {aeContract,aeWallet, aeInitWallet, getBalance, getBalances, getCalls, initContract} from '../utils/aeternity'
import WalletInfo from "../components/WalletInfo";
import TokensTransfer from "../components/TokensTransfer";
import ContractBalances from "components/ContractBalances";
import ContractOperations from "components/ContractOperations";

export default defineComponent({
  name: 'MainLayout',
  components: {ContractOperations, ContractBalances, TokensTransfer, WalletInfo},

  async mounted(){
    this.$q.loading.show();

    await aeInitWallet();
    await initContract();
    await getBalances();
    await getCalls();
    this.balance = await getBalance(this.address);
    this.$q.loading.hide();


    setInterval(async () => {
      if (this.instance) {

        this.balance = await getBalance(this.address);

        if(this.tab==="contract-balances"){
          await getBalances();
        }

        if(this.tab==="contract-operations"){
          await getCalls();
        }

      }
    }, 5000);
  },

  setup () {
    const {
      instance,
      balance,
    } = toRefs(aeContract);

    return{
      tab: ref('transfer-tokens'),
      address : toRef(aeWallet,"address"),
      instance,
      balance
    }
  }
})
</script>

<style>
</style>
