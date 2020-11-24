<template>
  <span class="tip">{{ tip }}</span>
</template>

<script>
export default {
  name: 'Tip',
  props: {
    tip: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.tip {
  position: absolute;
  min-width: 8em;
  background-color: #000;
  color: #fff;
  border-radius: .5em;
  padding: .3em .6em;
  top: 1.8em;
  left: -10%;
  z-index: 3;
  display: block;
  font-size: 0;
  opacity: 0;
  transition: opacity 2s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.tip:after {
  position: absolute;
  content: '';
  top: -1em;
  left: 45%;
  border-width: .5em;
  border-style: solid;
  border-color: transparent transparent #000 transparent;
}
.list-head:hover .tip {
  font-size: 1em;
  opacity: 1;
}
</style>