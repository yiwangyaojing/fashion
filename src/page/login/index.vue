<template>
  <div class="a-scale">
    当前刻度{{ scaleIndex }}当前值{{ scaleVal }}
    <div class="body">
      <div
        class="box"
        :style="{ width: boxW + boxDeviationW + 'px' }"
        ref="box"
        @scroll="orderScroll"
      >
        <div
          class="node"
          v-for="(item, index) in test"
          :key="index"
          :style="{ width: nodeW + 'px' }"
        >
          <div
            class="centent"
            :class="{
              prohibitN:
                index < prohibitN ||
                index > useMinNumber + useMaxNumber - prohibitN
            }"
          >
            <div
              class="number"
              :style="{ opacity: is10Multiple(item) ? 1 : 0 }"
            >
              {{ item }}
            </div>
            <div
              class="punctuation"
              :class="{
                active: scaleVal == item
              }"
            >
              <div
                class="line"
                :class="{
                  veryHigh: is10Multiple(item),
                  higher: is5Multiple(item),
                  active: scaleVal == item
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="rule-core"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    // 左侧最小的刻度值
    minNumber: {
      type: Number,
      default: 30,
      validator: function(value) {
        return value >= 20;
      }
    },
    // 右侧最大的刻度值
    maxNumber: {
      type: Number,
      default: 30,
      validator: function(value) {
        return value >= 20;
      }
    },
    // 默认值
    defaultV: {
      type: Number,
      default: 0
    },
    // 刻度尺宽度
    boxW: {
      type: Number,
      default: 260,
      validator: function(value) {
        return value % 10 === 0;
      }
    }
  },
  data() {
    return {
      leftData: [],
      rightData: [],
      boxDeviationW: 1, //刻度尺偏移距离
      nodeW: 5, //每个刻度的宽度
      nodeDeviationW: 1, //每个刻度的偏移距离
      test: [],

      adsorbent: false,
      timer: null,
      scaleIndex: 0, //当前刻度
      scaleVal: 0, //当前刻度对应的值
      prohibitN: 0, //禁止点击的刻度数量

      useMinNumber: 0,
      useMaxNumber: 0
    };
  },
  methods: {
    // 是否是10的倍数,包含0
    is10Multiple(val) {
      val = Math.abs(val);
      if (val % 10 === 0 || val === 0) return true;
      return false;
    },
    // 是否是5的倍数,包含0,但不能是10的倍数
    is5Multiple(val) {
      val = Math.abs(val);
      if (val % 5 === 0 || (val === 0 && val % 10 != 0)) return true;
      return false;
    },
    orderScroll(e) {
      let scrollLeft = e.target.scrollLeft; //距离左侧的偏移量
      // 计算出当前刻度尺距离左侧的距离
      let middleScale = scrollLeft + this.boxW / 2; //中间的刻度
      // 通过中心点距离左侧的距离除以每个刻度的宽度,就可以知道当前的刻度是多少
      this.scaleIndex = (middleScale / this.nodeW).toFixed(0);
      this.scaleVal = this.getVal({ index: this.scaleIndex });
      // console.log(
      //   "距离左侧的距离:" + middleScale,
      //   "大概刻度:" + this.getIndex({ val: this.scaleVal }),
      //   "大概值:" + this.getVal({ index: this.scaleIndex })
      // );
      // 计算出刻度后,如果位置不准,需要自动吸附,并且吸附结束后,不能再次滚动
      // 获取当前刻度的位置
      // if (!this.adsorbent || ) {
      //   console.log("自动吸附中:", (scaleN - 0) * this.nodeW - 2.5);
      //   this.adsorbent = true;
      //   let scrollElem = this.$refs.box;
      //   scrollElem.scrollTo({ left: (scaleN - 0) * this.nodeW - 2.5 });
      //   // 自动吸附中,需要禁止滚动条滚动,结束后才可以滚动
      //   this.$refs.box.style.overflow = "hidden";
      //   console.log(this.$refs.box.style);
      //   this.timer = setTimeout(() => {
      //     console.log("自动吸附结束");
      //     this.$refs.box.style.overflow = "auto";
      //     this.adsorbent = false;
      //     clearTimeout(this.timer);
      //     this.timer = null;
      //   }, 500);
      // }
    },
    // 跳转至某个刻度,某个值,或者下标
    goOrder({ val, index }) {
      let scrollElem = this.$refs.box;
      scrollElem.scrollTo({
        left: (index - 0) * this.nodeW - this.boxW / 2
      });
    },
    // 通过某个值获取下标
    getIndex({ val }) {
      return val + this.useMinNumber;
    },
    // 通过某个下标获取值
    getVal({ index }) {
      return index - this.useMinNumber;
    }
  },
  mounted() {
    // this.test = new Array(100 + 1);
    let minArr = [];
    let maxArr = [];

    let prohibitN = this.boxW / this.nodeW / 2; //禁止点击的刻度数量
    console.log(prohibitN);
    this.prohibitN = prohibitN;
    // 判断禁止点击的刻度数是否无法被10整除,如果无法,需要增加刻度
    this.useMinNumber = this.minNumber + this.prohibitN;
    this.useMaxNumber = this.maxNumber + this.prohibitN;

    let useMinNumber = this.useMinNumber;
    let useMaxNumber = this.useMaxNumber;

    this.scaleIndex = this.useMinNumber;
    setTimeout(() => {
      this.goOrder({ index: this.scaleIndex });
    }, 10);
    for (let i = 1; i <= new Array(useMinNumber).length; i++) {
      minArr.push("-" + i);
    }
    for (let i = 1; i <= new Array(useMaxNumber).length; i++) {
      maxArr.push(i);
    }
    minArr.reverse();
    this.test = [...minArr, 0, ...maxArr];

    // boxW / nodeW
  }
};
</script>
<style scoped lang="scss">
.a-scale {
  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .rule-core {
    // position: absolute;
    // transform: translate(-50%);
    // left: 50%;
    // bottom: 0px;
    // width: 0;
    // height: 0;
    // border-bottom: 5px solid var(--font-color-tips);
    // border-right: 3.5px solid transparent;
    // border-left: 3.5px solid transparent;
    // border-radius: 4px;
  }
  .box {
    // border: solid 1px red;
    overflow-x: auto;
    white-space: nowrap;
    margin-top: 10px;
    &::-webkit-scrollbar {
      display: none;
    }
    .node {
      display: inline-block;
      // width: 6px;
      text-align: center;
      .centent {
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 30px;
        justify-content: space-between;
        position: relative;
        &.prohibitN {
          .number {
            color: #f2f2f2;
          }
          .punctuation {
            .line {
              background-color: #f2f2f2;
            }
          }
        }
        .number {
          // position: absolute;
          top: 0px;
          font-size: 12px;
        }
        .punctuation {
          width: 3px;
          height: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          .line {
            width: 1px;
            height: 4px;
            background-color: #000;
            &.higher {
              height: 6px;
            }
            &.veryHigh {
              height: 8px;
            }
          }
          &.active {
            .line {
              width: 3px;
              background-color: red;
              border-radius: 2px;
              height: 10px !important;
            }
          }
        }
      }
      &:first-of-type {
        width: 2.5px !important;
        .centent {
          align-items: flex-start;
        }
      }
      &:last-of-type {
        width: 2.5px !important;
        .centent {
          align-items: flex-end;
        }
      }
    }
  }
}
</style>
