<template>
  <div class="edit-model-center">
    <div class="del" @click.capture="del">
      删除
      <span class="symbol" v-if="index"></span>
    </div>
    <div class="edit-model-line" v-if="index"></div>
    <div class="goTop" @click.capture="goTop" v-if="index">置顶</div>
  </div>
</template>
<script>
export default {
  props: ["index"],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    del() {
      this.$emit("del");
    },
    goTop() {
      this.$emit("goTop");
    },
  },
};
</script>
<style lang="scss">
.edit-model-center {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #000000;
  border-radius: 4px;
  height: 32px;
  user-select: none;
  .edit-model-line {
    width: 0.5px;
    background: #ffffff;
    height: 100%;
  }
  &.hide {
    opacity: 0;
  }
  &.show {
    opacity: 1;
  }
  .del,
  .goTop {
    padding: 4px 9.5px 4px 8.5px;
    font-size: 17px;
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
  }
  .del {
    position: relative;
    .symbol {
      position: absolute;
      bottom: -15px;
      left: 18.5px;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-top-color: #000;
    }
  }
}
</style>
