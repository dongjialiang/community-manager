<template>
  <DataList
    :columns="columns"
    :list-name="listName"
  />
</template>
<script>
import { computed, onMounted, ref } from 'vue';
import DataList from '../components/DataList.vue';

export default {
  name: 'Park',
  components: {
    DataList,
  },
  setup() {
    const columns = [
      {
        name: 'parkCode',
        cn_name: '停车位置码',
        tip: '停车位的标号',
      },
      {
        name: 'nickName',
        cn_name: '昵称',
        tip: '车主的用户名',
      },
      {
        name: 'realName',
        cn_name: '真实名称',
        tip: '车主的真名',
      },
      {
        name: 'isParkStatus',
        type: 'bool',
        cn_name: '停车状态',
        tip: '当前车位可停状态',
      },
      {
        name: 'carCode',
        cn_name: '车牌',
        tip: '车牌号码',
      },
      {
        name: 'area',
        cn_name: '区域',
        tip: '停车的区域位置',
      },
    ];

    const listName = 'park'

    return { columns, listName };
  },
};
</script>
