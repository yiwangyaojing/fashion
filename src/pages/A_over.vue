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
        <div style="margin-top:12vw;padding:0 9%;line-height:2; font-size:3.2vw;text-align: center;">
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;非常遗憾没法现场相见，但是我们同样</p>
            <p>为您准备了上海时装周BUDX JOYRICH联名</p>
            <p style="text-align:left">&nbsp;&nbsp;服饰,即刻挑选。</p>
        </div>

        <div class="nowChoose" @click="nowChoose()">
            立刻挑选
        </div>
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
import fontB from '@/assets/font_B.png'
import BUDX from '@/assets/budx_logo.png' 

export default {
    data(){
        return{
            logoB,
            footer,fontB,BUDX
        }
    },
    methods:{
        nowChoose(){
            this.$router.push({name:'chooseGood'})
        }
    }
}
</script>
<style scoped>
.choose_input{
    font-weight:normal;
    padding:7px 17px;
    background:#333333;
    color:#fff;
    border-radius:1vw;
    margin:0 3vw;
    font-size:12px;
    cursor: pointer;
}
.nowChoose{
    margin: 14vh auto;
    width: 30vw;
    font-size: 1.5vh;
    text-align: center;
    border-radius: 5px;
    background: #333333;
    padding: 5px 10px;
    cursor: pointer;
    box-sizing: content-box;
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
