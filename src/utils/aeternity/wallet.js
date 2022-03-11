import {
  RpcAepp,
  Node,
  BrowserWindowMessageConnection,
  WalletDetector,
  AmountFormatter,
  Universal,
  MemoryAccount
} from '@aeternity/aepp-sdk'

import { reactive, toRefs } from 'vue'
import { COMPILER_URL, NETWORKS } from './configs'

export const aeWallet = reactive({
  sdk: null,
  activeWallet: null,
  address: null,
  balance: null,
  walletStatus: null,
  isStatic: false
})

export const aeInitWallet = async () => {
  console.log("Initializing wallet...");
  const { sdk, walletStatus } = toRefs(aeWallet)

  const nodes = []

  for (const { type, url } of NETWORKS) {
    nodes.push({
      name: type,
      instance: await Node({ url })
    })
  }

  walletStatus.value = 'connecting'

  try {
      // connect to Superhero Wallet
      sdk.value = await RpcAepp({
        name: 'AEPP',
        nodes,
        compilerUrl: COMPILER_URL,
        onNetworkChange (params) {
          console.log("Changing network");
          this.selectNode(params.networkId)
          aeFetchWalletInfo(sdk.value)
        },
        onAddressChange (addresses) {
          console.log("Changing address");
          console.info('onAddressChange :: ', addresses)
          aeFetchWalletInfo(sdk.value)
        }
      })
      walletStatus.value = 'connected';
      await aeScanForWallets();

  } catch (error) {
    console.info('aeInitWallet . error: ', error)
    return false
  }
  console.log("aeInitWallet finished");
  return true
}

export const aeScanForWallets = async () => {
  const { sdk, walletStatus, activeWallet } = toRefs(aeWallet)

  walletStatus.value = 'scanning'

  const scannerConnection = await BrowserWindowMessageConnection({
    connectionInfo: { id: 'spy' }
  })
  const detector = await WalletDetector({ connection: scannerConnection })

  const handleWallets = async function ({ newWallet }) {
    detector.stopScan();
    if (!sdk.value){
      return;
    }

    activeWallet.value = newWallet

    const connected = await sdk.value.connectToWallet(
      await newWallet.getConnection()
    )
    sdk.value.selectNode(connected.networkId) // connected.networkId needs to be defined as node in RpcAepp
    await sdk.value.subscribeAddress('subscribe', 'current');

    await aeFetchWalletInfo(sdk.value)
  }

  await detector.scan(handleWallets)

  return Object.values(detector.wallets).length
}

export const aeFetchWalletInfo = async (sdk)  => {
  const { address, balance, walletStatus } = toRefs(aeWallet)

  walletStatus.value = 'fetching_info'

  try {
    address.value = await sdk.address()

    balance.value = await sdk.getBalance(address.value, {
      format: AmountFormatter.AE_AMOUNT_FORMATS.AE
    })

    walletStatus.value = null
    return true
  } catch (error) {
    walletStatus.value = 'fetching_failed'
    console.info('aeFetchWalletInfo error::', error)
    return false
  }
}
