<template>
  <div class="but-spread">
    <butSpread class="button" @click="click" bgColor="#38f">
      123
      <div @click="divClick">
        测试div点击
      </div>
    </butSpread>
    <butSpread class="button1" bgColor="#000000">
      456
    </butSpread>
    <butSpread></butSpread>
    <butSpread></butSpread>
  </div>
</template>

<script>
import butSpread from "@/components/butSpread/index.vue";
export default {
  data() {
    return {
    };
  },
  components: {
    butSpread
  },
  methods: {
    click(){
      console.log('点击')
    },
    divClick(){
      console.log('div点击')
    },
  },
};
</script>

<style scoped lang="scss">
.but-spread {
  width: 100vw;
  height: 100vh;
  background: #000000;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .button {
    width: 200px;
    // height: 30px;
    line-height: 30px;
    background: #ffffff;
    color: #38f;
    margin: 20px auto;
  }
  .button1 {
    width: 300px;
    height: 40px;
    line-height: 40px;
    background: #ffffff;
    color: #38f;
    margin: 20px auto;
  }
}
</style>
