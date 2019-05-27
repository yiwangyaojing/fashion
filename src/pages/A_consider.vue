
<template>
    
<div class="homeContainer">
    <div class="homeBg"></div>
    <div style="overflow:hidden;"></div>
    <div class="A_background_img">
        <div style="padding :5vh 0 0 5vw;">
            <img :src="BUDX" style="width:20vw;" />
        </div>
        <div style="padding-top:1vh;text-align:center;">
            <img :src="logoB" style="width:55vw;"/>
        </div>
        <br/>
        
        <div style="margin-top:1vh;padding:0 10%;line-height:1.6;text-align:center; ">
            <img :src="fontA" style="width:65%;" />
        </div>
        <div class="choose_show">
            <span class="choose_input" @click="yes()">再考虑下</span>
            <span class="choose_input" @click="no()">残忍拒绝</span>
        </div>
        <br/>
        <div style="color:#CF0C2D;text-align:center;position:absolute;bottom:5vh;width:80vw;">
            <img :src="footer" style="width:70%;"/>
        </div>
    </div>
    <div style="height:5vw;"></div>
</div>
</template>

<script>

import logoB from '@/assets/logo_w.png'
import footer from '@/assets/footer.png'
import fontA from '@/assets/font_A.png'
import BUDX from '@/assets/budx_logo.png' 

export default {
    data(){
        return {
            logoB,footer,fontA,BUDX
        }
    },
    methods:{
        yes(){
            this.$router.push({name: 'register'})
        },
        no(){
            this.$router.push({name: 'Aover'})
        }
    }
}
</script>
<style scoped>
.choose_show{
    overflow: hidden;
    text-align: center;
    height: 40px;
    padding-top:0px;
    box-sizing: border-box;
    margin-top: 14vh;
    padding-top: 1vh;
}
.choose_input{
    font-weight:normal;
    padding:1vh 7vw;
    width: 20%;
    background:#333333;
    color:#fff;
    border-radius:1vw;
    margin:0 3vw;
    font-size:12px;
    cursor: pointer;
    text-align: center;
}
.homeContainer{
    position: relative;
}
.homeBg{
    position: fixed;z-index: -1;
    width: 100vw;height:100vh;
    background: url('../assets/home_BG.png') no-repeat center center/cover;
}
</style>
