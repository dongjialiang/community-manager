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
  name: 'BusinessActivity',
  components: {
    DataList,
  },
  setup() {
    const columns = [
      {
        name: 'shopName',
        cn_name: '商铺名字',
        tip: '商店, 摊位, 流动商车的招牌',
      },
      {
        name: 'describe',
        cn_name: '商铺活动描述',
        tip: '描述商铺活动的大概内容',
      },
      {
        name: 'banner',
        cn_name: '海报',
        tip: '商铺活动的海报(非必需)',
        type: 'file'
      },
      {
        name: 'startTime',
        cn_name: '活动开始时间',
        tip: '活动最早可以开始的时间',
      },
      {
        name: 'endTime',
        cn_name: '活动结束时间',
        tip: '活动到期时间, 超过活动自动结束',
      },
    ];

    const listName = 'businessActivity'

    return { columns, listName };
  },
};
</script>
