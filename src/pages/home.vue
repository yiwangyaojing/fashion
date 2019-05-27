<template>
<div>
      <div v-if="IsCreate" class="homeContainer">
        <div class="homeBg" />
        <div style="height:15vw;"/>
        <div style="width:80vw;margin:0px auto 0px;background:#fff;font-size:20px;text-align:center;color:rgb(16, 16, 16) 100%;font-weight:600;">
            <div style="padding-top:10vw;text-align:center;">
                <img :src="logoB" style="width:60vw;" />
            </div>
            <br />
            <div style="line-height:30px;">
                <span>欢迎您进入时装周</span>
            </div>
            <div style="line-height:30px;">
                <span>百威大使计划</span>
            </div>
            <div style="line-height:30px;">
                <span>为此我们特地为您准备了</span>
            </div>
            <div style="line-height:30px;">
                <span>百威联名设计商品</span>
            </div>
            <div style="margin-top:10vw;">
                <span style="font-weight:normal;padding:7px 17px;background:#333333;color:#fff;border-radius:1vw;">
                开始挑选
                </span>
            </div>
            <br />
            <div style="color:#CF0C2D;padding-bottom:8vw;">
                <span>BE A KING</span>
            </div>
        </div>
        <div style="height:10vw;"/>
      </div>
      <div v-else>
          此账号已经注册，感谢您的关注
      </div>
</div>
</template>

<script>
import logoB from "@/assets/logo_b.png";

export default {
  name: "home",
  data(){
      return {
          IsCreate:true,
          logoB:logoB
      }
  },
  mounted(){
      console.log('home')
  }
};
</script>
<style scoped>
.homeContainer {
  position: relative;
}
.homeBg {
  position: fixed;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background: url("../assets/homeBg.png") no-repeat center center/cover;
}
</style>
