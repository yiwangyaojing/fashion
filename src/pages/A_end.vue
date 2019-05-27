<template>
<div>
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
            
            <div style="padding:0 10%margin:10px auto;font-size:4vw;line-height:1.6; margin-top:20px;text-align: left">
                <p style="padding:5px 25px;"> &nbsp; &nbsp;&nbsp; &nbsp;您挑选的BUD X JOYRICH联名服饰 
                    <span v-if="ticket"> 将与上海时装周的门票一起 </span> 
                    于X天内寄出。3月31日上海时装周，我们不见不散。
                    </p>
            </div>
            <div style="margin-top:4vh;text-align:right;padding:0 10%;">
            </div>
            <br/>
            <div style="color:#CF0C2D;text-align:center;position:absolute;bottom:5vh;width:80vw;">
                <img :src="footer" style="width:70%;"/>
            </div>
        </div>
        <div style="height:5vw;"></div>
    </div>
</div>
</template>

<script>

import logoB from '@/assets/logo_w.png'
import footer from '@/assets/footer.png'
import BUDX from '@/assets/budx_logo.png' 
export default {
    data(){
        return {
            logoB,
            footer,
            BUDX,
            IsCreate:true,
        }
    },
    computed:{
        ticket(){
            let type = localStorage.getItem('register_type')
            if(!type){
                this.$router.push({name:'Ahome'})
                return false
            }
            if(type == 1){
                return true
            }
            if(type == 2){
                return false
            }
        }
    },
    methods:{
    }
}
</script>
<style scoped>
.homeContainer{
    position: relative;
}
.homeBg{
    position: fixed;z-index: -1;
    width: 100vw;height:100vh;
    background: url('../assets/home_BG.png') no-repeat center center/cover;
}
</style>
