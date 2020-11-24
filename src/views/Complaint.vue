<template>
  <div>
    <DataList
      :columns="columns"
      :list-name="listName"
    />
  </div>
</template>
<script>
import { computed, onMounted, ref } from 'vue';
import DataList from '../components/DataList.vue';

export default {
  name: 'Complaint',
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
        cn_name: '真实名称',
        tip: '用户真名',
      },
      {
        name: 'describe',
        cn_name: '描述',
        tip: '描述投诉的内容',
      },
      {
        name: 'accept',
        cn_name: '投诉受理情况',
        tip: '选中表示投诉已受理, 否则为未受理',
        type: 'bool',
      },
      {
        name: 'finish',
        cn_name: '投诉处理情况',
        tip: '选中为投诉问题已解决, 否则为未解决',
        type: 'bool',
      },
    ];

    const listName = 'complaint'

    return { columns, listName };
  },
};
</script>
