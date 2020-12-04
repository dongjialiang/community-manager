<template>
  <div class="box">
    <div
      v-for="item in manager_list"
      :key="item.name"
      class="function"
    >
      <h3>{{ item.subject }}</h3>
      <p><b>{{ item.subject }}</b> {{ item.text }}</p>
      <router-link :to="item.link">
        {{ item.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'Home',
  setup() {
    const manager_list = [
      {
        name: '管理用户信息',
        link: 'user',
        subject: '用户信息',
        text: '是小区住户及访客信息管理的模块, 可以预先导入相应的住户信息.',
      },
      {
        name: '管理商铺活动信息',
        link: 'businessActivity',
        subject: '商铺活动',
        text: '是小区周边店铺, 地摊以及流动商铺发出的优惠, 抽奖, ' +
        '知识竞赛, 收集等可能的活动, 商铺活动最好有海报和开始结束时' +
        '间, 以及活动的说明事宜.',
      },
      {
        name: '管理物业通知',
        link: 'propertyNotice',
        subject: '物业通知',
        text: '包括维护通知, 业务办理通知, 紧急通知, 宣传通知, ' +
        '管理人员在此发布的通知可被小区普通用户查看到, 请谨慎发布. ' +
        '如果通知有误, 应发布新通知, 以免看过旧通知的用户不知道通知的错误.',
      },
      {
        name: '管理生活服务',
        link: 'lifeService',
        subject: '生活服务',
        text: '小区住户或管理员都可以发布生活服务, 可以是修电脑, 修车, ' +
        '废品回收, 遛狗, 心理辅导等由发布者或专人提供的生活服务.',
      },
      {
        name: '管理出入登记信息',
        link: 'register',
        subject: '出入登记信息',
        text: '是备份用户出入记录信息的管理模块, 主要用于特殊时期人员管控' +
        ', 登记外来访客出入记录等用途.',
      },
      {
        name: '管理投诉',
        link: 'complaint',
        subject: '投诉',
        text: '是小区住户生活中最为重要的模块, 管理员通过该模块收集用户的' +
        '意见, 帮助调节住户间的关系, 改善住户生活环境.',
      },
      {
        name: '管理报修',
        link: 'repair',
        subject: '报修',
        text: '是在公共区域或者私人区域有设施损坏时用户提交的报修申请, 由' +
        '管理员进行审核.',
      },
      {
        name: '管理停车信息',
        link: 'park',
        subject: '停车信息',
        text: '是小区停车位管理模块, 只有在小区有车库, 停车场, 露天停车位等' +
        '情况下才有管理的需要.',
      },
    ];
    return { manager_list };
  },
};
</script>

<style scoped>
.box {
  display: grid;
  position: relative;
}
.function {
  position: absolute;
  margin: 0 auto;
  text-align: center;
  width: 25vw;
  transition: width 0.7s ease-out;
}
.function > p {
  font-size: .9rem;
  text-align: left;
}
.function > a {
  display: inline-block;
  height: 1.4em;
  padding: .4em .6em;
  border-radius: .3em;
  font-size: .9em;
  color: #fff;
  background-color: #7fffd4;
  line-height: 1.4em;
  text-decoration: none;
  box-shadow: inset 0 -.2em 0 rgba(0, 0, 0, .15);
}
.function > a:hover {
  background-color: #7fdfd4;
}
.function:nth-child(1),
.function:nth-child(4),
.function:nth-child(7)
{
  left: 1em;
}
.function:nth-child(2),
.function:nth-child(5),
.function:nth-child(8)
{
  left: calc((100% - 25vw) / 2);
}
.function:nth-child(3),
.function:nth-child(6),
.function:nth-child(9)
{
  right: 1em;
}
.function:nth-child(1),
.function:nth-child(3)
{
  top: 6em;
}
.function:nth-child(5) {
  top: 16em;
}
.function:nth-child(4),
.function:nth-child(6)
{
  top: 22em;
}
.function:nth-child(8) {
  top: 32em;
}
.function:nth-child(7),
.function:nth-child(9)
{
  top: 38em;
}

@media (max-width: 640px) {
  .box {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(8, 12em);
  }
  .function {
    position: initial;
    width: 100%;
    text-align: center;
  }
  .function > p {
    margin: 0 auto;
    width: 80vw;
    font-size: 1em;
  }
}
</style>
