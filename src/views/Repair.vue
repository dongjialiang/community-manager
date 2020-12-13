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
  name: 'Repair',
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
        name: 'describe',
        cn_name: '报修描述',
        tip: '描述需要修理的地方',
      },
      {
        name: 'accept',
        cn_name: '报修受理情况',
        tip: '选中为报修已受理, 否则为未受理',
        type: 'bool',
      },
      {
        name: 'finish',
        cn_name: '报修处理情况',
        tip: '选中为报修问题已解决, 否则为未解决',
        type: 'bool',
      },
      {
        name: 'room',
        cn_name: '楼, 单元, 室',
        tip: '需要维修的位置, 位置越具体越好(非必填)',
      },
      {
        name: 'phone',
        cn_name: '电话',
        tip: '留下联系电话方便维修员确认',
      },
    ];

    const listName = 'repair'

    return { columns, listName };
  },
};
</script>
