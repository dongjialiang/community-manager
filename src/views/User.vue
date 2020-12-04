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
  name: 'User',
  components: {
    DataList,
  },
  setup() {
    const columns = [
      {
        name: 'nickName',
        cn_name: '昵称',
        tip: '住户的昵称',
      },
      {
        name: 'realName',
        cn_name: '真名',
        tip: '住户的真实姓名',
      },
      {
        name: 'avatarUrl',
        cn_name: '头像',
        tip: '用户头像',
        type: 'file',
      },
      {
        name: 'address',
        cn_name: '地址',
        tip: '住户的家庭住址',
      },
      {
        name: 'room',
        cn_name: '楼, 单元, 室',
        tip: '住户的具体住址',
      },
      {
        name: 'phone',
        cn_name: '联系方式',
        tip: '住户的电话号码',
      },
      {
        name: 'authorization',
        cn_name: '权限',
        tip: '住户的各功能使用权限',
        type: 'array'
      },
    ];

    const listName = 'usermanager'

    return { columns, listName };
  },
};
</script>
