<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6">Transfer result</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-list bordered >
          <q-item>
            <q-item-section>
              <q-item-label overline>Result:</q-item-label>
              <q-item-label>{{ result }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="errorMessage">
            <q-item-section>
              <q-item-label overline>Error:</q-item-label>
              <q-item-label>{{ errorMessage }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="!errorMessage">
            <q-item-section>
              <q-item-label overline>Gas price:</q-item-label>
              <q-item-label>{{ gasPrice }} AE</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="!errorMessage">
            <q-item-section>
              <q-item-label overline>Gas used:</q-item-label>
              <q-item-label>{{ gasUsed }} {{ symbol }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "QTransferResultDialog",
  props: {
    result: String,
    errorMessage : String,
    gasPrice : Number,
    gasUsed: Number
  },

  emits: [
    'ok', 'hide'
  ],

  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      this.$emit('hide')
    },

    onOKClick () {
      this.$emit('ok')
      this.hide()
    }
  }
}
</script>

<style scoped>

</style>
