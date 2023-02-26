<template>
  <div class="test">
    {{obj.text || '不存在'}}
    <button @click="updateValue">点击改动</button>
  </div>
</template>
<script>
export default {
  props: {
    obj: {
      type: Object,
      default: {text:1},
    //   default: () => {
    //       return {
    //           text:1
    //       }
    //   }
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    updateValue() {
      let time = new Date().getTime();
      this.obj.text = time;
    //   this.$emit("updateValue", time);
    },
  },
};
</script>
<style lang="scss">
</style>
