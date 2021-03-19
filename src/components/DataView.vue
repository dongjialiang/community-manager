<template>
  <DataList
    :columns="columns"
    :list-name="listName"
  />
</template>
<script>
import { computed, ref, watchEffect } from 'vue'
import ViewFn from '../services/getViewFnList'
import DataList from './DataList.vue'
import { useRoute } from 'vue-router'

export default {
  name: 'DataView',
  components: { DataList },
  setup() {
    const path = useRoute().path
    const columns = ref([])
    const listName = computed(() => path !== 'home' && path.slice(1))
    const viewFnList = async (viewFn) => {
      const result = (await ViewFn.getViewFnList(viewFn)).data.data
      if (result) {
        columns.value = result.columns
      }
    }
    watchEffect(() => { viewFnList(listName.value) })

    return { columns, listName }
  },
};
</script>