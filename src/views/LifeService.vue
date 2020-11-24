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
  name: 'LifeService',
  components: {
    DataList,
  },
  setup() {
    const columns = [
      {
        name: 'publisher',
        cn_name: '发布者',
        tip: '生活服务的发布者',
      },
      {
        name: 'describe',
        cn_name: '服务描述',
        tip: '描述提供的生活服务内容',
      },
      {
        name: 'serviceType',
        cn_name: '服务类型',
        tip: '生活服务的类型(例如: 上门服务, 到店服务, 通讯服务, 线上服务)',
      },
      {
        name: 'address',
        cn_name: '服务地址',
        tip: '如果是到店服务, 需要留下地址',
      },
      {
        name: 'contacter',
        cn_name: '联系人',
        tip: '有问题可询问的相关负责人(例如: 梁先生)',
      },
      {
        name: 'contact',
        cn_name: '联系方式',
        tip: '有问题可询问的联系方式(例如: 电话号码, 邮箱地址等)',
      },
    ];

    const listName = 'lifeService'

    return { columns, listName };
  },
};
// TODO: 修改生活服务视图页面, 弹出提示, 侧边提示,
</script>
