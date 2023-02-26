<template>
  <div class="a-scale">
    <div class="body">
      <div
        class="box"
        :style="{ width: boxW + 'px' }"
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
            <div class="number" v-if="is10Multiple(item)">{{ item }}</div>
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
        <!-- <div class="rule-core" :style="{ left: middleScale + 'px' }"></div> -->
      </div>
      <!-- <div class="rule-middle"></div> -->
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
      default: 30
    },
    // 右侧最大的刻度值
    maxNumber: {
      type: Number,
      default: 30
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
      nodeW: 5, //每个刻度的宽度
      nodeDeviationW: 1, //每个刻度的偏移距离
      test: [],

      adsorbent: false,
      timer: null,
      middleScale: 0, //中间的刻度
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
      let middleScale = scrollLeft + this.boxW / 2;
      //中间的刻度
      this.middleScale = middleScale;
      // 通过中心点距离左侧的距离除以每个刻度的宽度,就可以知道当前的刻度是多少
      this.scaleIndex = (middleScale / this.nodeW).toFixed(0);
      this.scaleVal = this.getVal({ index: this.scaleIndex });
      // 如果值大于最右侧的值,则固定为最大值
      if (this.scaleVal > this.maxNumber) {
        this.scaleVal = this.maxNumber;
        this.scaleIndex--;
      }
      console.log("刻度", this.scaleIndex, "当前值:" + this.scaleVal);
      this.$emit("changeVal", {
        scaleIndex: this.scaleIndex,
        scaleVal: this.scaleVal
      });
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
  }
};
</script>
<style scoped lang="scss">
.a-scale {
  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  // .rule-middle {
  //   position: absolute;
  //   left: 50%;
  //   top: 50%;
  //   transform: translate(-50%, -50%);
  //   height: 2px;
  //   width: 1px;
  //   background-color: #38f;
  // }
  .box {
    // border: solid 1px red;
    box-sizing: border-box;
    overflow-x: auto;
    white-space: nowrap;
    position: relative;
    // .rule-core {
    //   position: absolute;
    //   left: 0;
    //   top: 0;
    //   height: 2px;
    //   width: 1px;
    //   background-color: red;
    // }
    &::-webkit-scrollbar {
      display: none;
    }                                        
    .node {
      display: inline-block;
      vertical-align: middle;
      box-sizing: border-box;
      // width: 6px;
      text-align: center;
      // border: solid 1px red;
      .centent {
        box-sizing: border-box;
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        height: 30px;
        position: relative;
        &.prohibitN {
          .number {
            color: #484747;
          }
          .punctuation {
            .line {
              background-color: #484747;
            }
          }
        }
        .number {
          position: absolute;
          top: 0px;
          right: 0px;
          font-size: 12px;
          color: #fff;
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
            background-color: rgba($color: #fff, $alpha: 0.8);
            &.higher {
              height: 6px;
            }
            &.veryHigh {
              height: 8px;
            }
          }
          &.active {
            .line {
              width: 2px;
              background-color: rgba($color: #fff, $alpha: 1);
              border-radius: 2px;
              height: 15px !important;
            }
          }
        }
      }
      &:first-of-type {
        width: 2.5px !important;
        .centent {
          align-items: flex-end;
        }
      }
      &:last-of-type {
        width: 2.5px !important;
        .centent {
          align-items: flex-start;
        }
      }
    }
  }
}
</style>
