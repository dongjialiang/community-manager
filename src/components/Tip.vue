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
  background-color: #fff;
  box-shadow: .1rem .1rem .1rem #ccc;
  border: 1px solid #ccc;
  color: #000;
  font-weight: bold;
  border-radius: .5em;
  padding: .3em .6em;
  z-index: 3;
  display: block;
  min-width: 12em;
  font-size: .6em;
  visibility: hidden;
  opacity: 0;
  transition: opacity 2s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.tip::after {
  position: absolute;
  content: '';
  top: -1em;
  left: calc((100% - 1em) / 2);
  border-width: .5em;
  border-style: solid;
  border-color: transparent transparent #fff transparent;
}
.list-head:hover .tip,
.function-button:hover .tip
{
  visibility: visible;
  opacity: 1;
}
.list-head:hover .tip {
  transform: translate(calc(-50% + 4.5em));
}
.function-button:hover .tip {
  transform: translate(calc(-50% + .5em));
}
</style>