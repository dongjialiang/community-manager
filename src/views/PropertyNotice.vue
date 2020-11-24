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
  name: 'PropertyNotice',
  components: {
    DataList,
  },
  setup() {
    const columns = [
      {
        name: 'subject',
        cn_name: '通知标题',
        tip: '通知名字',
      },
      {
        name: 'publisher',
        cn_name: '发布者',
        tip: '发布通知的管理员昵称',
      },
      {
        name: 'noticeType',
        cn_name: '通知类型',
        tip: '维护通知, 紧急通知, 业务办理通知, 宣传通知',
      },
      {
        name: 'content',
        cn_name: '通知内容',
        tip: '通知的详细内容(例如: 某区域停水, 电动车上牌, 消防演习等)',
      },
      {
        name: 'startTime',
        cn_name: '通知开始时间',
        tip: '通知最早开始的时间',
      },
      {
        name: 'endTime',
        cn_name: '通知结束时间',
        tip: '通知到期时间(非必需)',
      },
    ];

    const listName = 'propertyNotice'

    return { columns, listName };
  },
};
</script>
