<template>
  <div class="home">
    <parent
      @del="del"
      @goTop="goTop"
      @longPressSuccess="longPressSuccess"
      ref="longPressParent"
      :customPopup="false"
    >
      <template v-slot:longPressPopup>
        <div @click="customClick" class="Popup">
          <div v-if="show">1</div>
          <div>2</div>
        </div>
      </template>
      <div class="body">
        <longPress
          v-for="(item, index) in arr"
          :key="index"
          :data="item"
          :index="index"
          @click="open"
        >
          <div class="box">
            {{ item }}
          </div>
        </longPress>
      </div>
    </parent>
  </div>
</template>

<script>
import longPress from "@/components/longPress/longPress.vue";
import parent from "@/components/longPress/parent.vue";
export default {
  data() {
    return {
      arr: [
        "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
        "这何赛飞奇函数发空间里撒个谎反抗就是的规范化sad刚卡死的哈卡仕达会撒娇逗号隔开了撒娇打滚哈萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果",
        "这何赛飞奇函数发空间里撒个谎反抗就是的规范化sad刚卡死的哈卡仕达会撒娇逗号隔开了撒娇打滚哈萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果",
        "这何赛飞奇函数发空间里撒个谎反抗就是的规范化sad刚卡死的哈卡仕达会撒娇逗号隔开了撒娇打滚哈萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果",
        "这何赛飞奇函数发空间里撒个谎反抗就是的规范化sad刚卡死的哈卡仕达会撒娇逗号隔开了撒娇打滚哈萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果",
        "这何赛飞奇函数发空间里撒个谎反抗就是的规范化sad刚卡死的哈卡仕达会撒娇逗号隔开了撒娇打滚哈萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果",
        "这何赛飞奇函数发空间里撒个谎反抗就是的规范化sad刚卡死的哈卡仕达会撒娇逗号隔开了撒娇打滚哈萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果",
        "这何赛飞奇函数发空间里撒个谎反抗就是的规范化sad刚卡死的哈卡仕达会撒娇逗号隔开了撒娇打滚哈萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果",
        "这何赛飞奇函数发空间里撒个谎反抗就是的规范化sad刚卡死的哈卡仕达会撒娇逗号隔开了撒娇打滚哈萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果",
        "这何赛飞奇函数发空间里撒个谎反抗就是的规范化sad刚卡死的哈卡仕达会撒娇逗号隔开了撒娇打滚哈萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果",
        "这何赛飞奇函数发空间里撒个谎反抗就是的规范化sad刚卡死的哈卡仕达会撒娇逗号隔开了撒娇打滚哈萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果",
        "这何赛飞奇函数发空间里撒个谎反抗就是的规范化sad刚卡死的哈卡仕达会撒娇逗号隔开了撒娇打滚哈萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果",
        "这何赛飞奇函数发空间里撒个谎反抗就是的规范化sad刚卡死的哈卡仕达会撒娇逗号隔开了撒娇打滚哈萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果",
        "这何赛飞奇函数发空间里撒个谎反抗就是的规范化sad刚卡死的哈卡仕达会撒娇逗号隔开了撒娇打滚哈萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果",
        "这何赛飞奇函数发空间里撒个谎反抗就是的规范化sad刚卡死的哈卡仕达会撒娇逗号隔开了撒娇打滚哈萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果萨克来的结果",
      ],
      show: true,
      data: null,
    };
  },
  components: {
    longPress,
    parent,
  },
  methods: {
    del(data) {
      let a;
      console.log("删除", data);
      this.$nextTick(() => {
        alert("点击删除,下标" + this.data.index);
      });
    },
    goTop(data) {
      console.log("置顶", data);
      this.$nextTick(() => {
        alert("点击置顶,下标" + this.data.index);
      });
    },
    open() {
      console.log("open");
    },
    longPressSuccess(data) {
      console.log("长按成功", data);
      this.data = data;
      if (data.index > 0) {
        this.show = true;
      } else {
        this.show = false;
        console.log(false);
      }
    },
    customClick() {
      console.log("点击1或者2");
      this.$refs.longPressParent.hideEditModel();
    },
  },
};
</script>

<style  lang="scss">
.home {
  .body {
    display: flex;
    flex-direction: column;
    .box {
      margin-bottom: 10px;
      line-height: 20px;
      display: -webkit-box;
      /* autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
      -webkit-line-clamp: 2;
      overflow: hidden;
      user-select: none;
    }
  }
  .Popup {
    background: yellow;
    border: solid 1px red;
    display: flex;
    // height: 50px;
    div {
      width: 20px;
    }
  }
}
</style>
