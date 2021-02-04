<template>
  <div
    class="product-long-press-center"
    ref="productLongPressCenter"
    @touchmove="touchMove($event)"
    @touchstart="touchStart($event)"
    @touchend="touchEnd()"
  >
    <slot> </slot>
  </div>
</template>
<script>
import bus from "./bus";
export default {
  props: ["data", "index"],
  data() {
    return {
      timer: null,
      startX: 0, //手指按下时x轴的位置
      startY: 0, //手指按下时y轴的位置
      isClick: false,
    };
  },
  destroyed() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
  mounted() {},
  methods: {
    touchStart(e) {
      // e.preventDefault();
      this.startX = e.changedTouches[0].pageX;
      this.startY = e.changedTouches[0].pageY;
      clearTimeout(this.timer);
      this.isClick = true;
      this.timer = setTimeout(() => {
        // 向子组件发送事件
        let query = {
          data: this.data,
          index: this.index,
          x: this.startX,
          y: this.$refs.productLongPressCenter.getBoundingClientRect().top || 0,
        };
        this.isClick = false;
        bus.$emit("val", query);
      }, 1000);
    },
    touchMove(e) {
      // e.preventDefault();
      let moveEndX = e.changedTouches[0].pageX;
      let moveEndY = e.changedTouches[0].pageY;
      let X = moveEndX - this.startX;
      let Y = moveEndY - this.startY;
      if (Math.abs(X) > 20 || Math.abs(Y) > 20) {
        // 是滑动,取消长按事件
        clearTimeout(this.timer);
        this.isClick = false;
      }
    },
    touchEnd() {
      // 通过touchStart判断是否是点击和长按
      if (this.isClick) {
        // 向parent组件发送checkExistence方法,检测长按是否存在
        bus.$emit("checkExistence", () => {
          this.$emit("click");
        });
      }
      clearTimeout(this.timer);
    },
  },
};
</script>
<style lang="scss">
.product-long-press-center {
  display: flex;
}
</style>
