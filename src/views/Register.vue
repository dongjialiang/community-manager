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
  name: 'Register',
  components: {
    DataList,
  },
  setup() {
    const columns = [
      {
        name: 'nickName',
        cn_name: '昵称',
        tip: '用户名',
      },
      {
        name: 'realName',
        cn_name: '真名',
        tip: '用户的真实姓名',
      },
      {
        name: 'registerType',
        cn_name: '出入类型',
        tip: '登记外出, 登记进入',
        type: 'radio',
        options: ['外出', '进入']
      },
      {
        name: 'mode',
        cn_name: '出入方式',
        tip: '可选的出入方式(非必填)',
        type: 'select',
        options: ['步行', '骑车', '驾车']
      },
    ];

    const listName = 'register'

    return { columns, listName };
  },
};
</script>
