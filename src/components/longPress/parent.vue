<template>
  <div class="product-long-press" ref="productLongPress">
    <editModel
      v-if="!customPopup"
      class="product-long-press-edit-model"
      ref="editModelRef"
      @del="del"
      :index="data.index || null"
      @goTop="goTop"
      :class="sysModelClass"
      :style="{ left, top }"
    />
    <div
      v-else
      class="product-long-press-edit-model"
      ref="editModelRef"
      @del="del"
      :index="data.index || null"
      @goTop="goTop"
      :class="sysModelClass"
      :style="{ left, top }"
    >
      <slot name="longPressPopup"></slot>
    </div>
    <slot> </slot>
  </div>
</template>
<script>
import bus from "./bus";
import editModel from "./editModel";
export default {
  components: {
    editModel,
  },
  props: {
    // 是否使用自定义弹窗
    customPopup: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      left: 0,
      top: 0,
      sysModelClass: "hide",
      fromTheTop: 0,
      data: {},
    };
  },
  beforeDestroy() {
    console.log("组件销毁");
    document.removeEventListener("touchstart", this.fn.bind(this), false);
  },
  mounted() {
    document.addEventListener("touchstart", this.fn.bind(this), false);
    bus.$on("val", (data) => {
      this.data = data;
      this.showEditModel(data.x, data.y);
      // 长按成功之后向引用的页面,吐出长按的数据(包含index);
      this.$emit("longPressSuccess", this.data);
    });
    // 接收检测长按是否存在
    bus.$on("checkExistence", (fn) => {
      // 长按事件不存在,也就是弹窗不存在,那么执行回调(点击事件)
      if (this.sysModelClass == "hide") {
        fn();
      } else {
        // 长按事件存在,弹窗存在,隐藏弹窗
        this.hideEditModel();
      }
    });
    bus.$on("hideEditModel", (fn) => {
      this.hideEditModel();
    });
  },
  methods: {
    fn(e) {
      // 父组件是否包含被点击的组件,如果不包含,说明是点击其他区域
      if (!this.$refs.productLongPress) return;
      let is = this.$refs.productLongPress.contains(e.target);
      if (!is) {
        this.hideEditModel();
      }
    },
    del() {
      this.$emit("del", this.data);
      this.hideEditModel();
    },
    goTop() {
      this.$emit("goTop", this.data);
      this.hideEditModel();
    },
    hideEditModel() {
      this.sysModelClass = "hide";
      this.left = 0;
    },
    showEditModel(startX, startY) {
      // this.sysModelClass = "show";
      // this.hideEditModel();
      this.$nextTick(() => {
        if (
          !this.$refs ||
          !this.$refs.productLongPress ||
          !this.$refs.editModelRef
        )
          return;
        this.fromTheTop =
          this.$refs.productLongPress.getBoundingClientRect().top || 0;
        let equipmentWidth = document.body.clientWidth;
        let boxWidth = 0;
        let boxHeight = 0;
        if (this.customPopup) {
          boxWidth = this.$refs.editModelRef.offsetWidth;
          boxHeight = this.$refs.editModelRef.offsetHeight;
        } else {
          boxWidth = this.$refs.editModelRef.$el.offsetWidth;
          boxHeight = this.$refs.editModelRef.$el.offsetHeight;
        }
        //设置x轴的位置 如果屏幕的宽度减去手指到左侧的宽度 小于 弹窗的宽度,那么就要重置弹窗出现时left的距离
        if (equipmentWidth - Math.ceil(startX) <= boxWidth) {
          this.left = equipmentWidth - boxWidth - 5 + "px";
        } else {
          this.left = Math.ceil(startX) + "px";
        }
        this.top = Math.ceil(startY) - this.fromTheTop - 1 - boxHeight + "px";
        this.$nextTick(() => {
          let model = document.getElementsByClassName(
            "product-long-press-edit-model"
          )[0];
          console.log(model.getBoundingClientRect().top);
          if (model.getBoundingClientRect().top < 0) {
            this.top = this.fromTheTop + "px";
            console.log(this.top);
          }
          this.sysModelClass = "show";
        });
      });
    },
  },
};
</script>
<style lang="scss">
.product-long-press {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex: 1;
  .product-long-press-edit-model {
    z-index: -1;
    position: absolute;
    top: -32px;
    &.hide {
      opacity: 0;
    }
    &.show {
      opacity: 1;
      z-index: 100;
    }
  }
}
</style>
