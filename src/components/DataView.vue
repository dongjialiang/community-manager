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
    const route = useRoute()
    const columns = ref([])
    const listName = computed(() => route.path.slice(1))
    const viewFnList = async () => {
      const result = await ViewFn.getViewFnList(listName.value)
      if (result.data.data) {
        columns.value = result.data.data.columns
      }
    }
    watchEffect(() => {
      listName.value
      viewFnList()
    })

    return { columns, listName }
  },
};
</script>