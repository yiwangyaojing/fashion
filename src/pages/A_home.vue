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
            
            <div v-if="IsCreate" >
                <div style="padding:0 10%;text-indent:5vw;line-height:1.8; font-size:1.5vh;margin-top:3vh;">
                    <p>今夏，百威啤酒旗下生活方式项目BUDX再度回归，携手洛杉矶潮流品牌JOYRICH推出联名合作系列。</p>
                    <p>全系列将于3月31日晚上20点30分在上海时装周正式发布，特邀您与我们共同见证。点击立刻获得上海时装周门票并抢先拥有BUD X JOYRICH潮流单品。</p>
                </div>
                <div style="margin-top:4vh;text-align:right;padding:0 10%;">
                    <!-- {/*<span style="font-weight:normal;padding:7px 17px;background:#333333;color:#fff;border-radius:1vw;">开始挑选</span>*/} -->
                    <span style="cursor: pointer;font-size:12px;" @click="next()">点击页面到下一页>></span>
                </div>
            </div>
            <div v-else style="text-align:center;font-size:1.7vh;margin-top:10vh">
                此账号已经注册，感谢您的关注.
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
import Api from '@/api/index';
import logoB from '@/assets/logo_w.png'
import footer from '@/assets/footer.png'
import BUDX from '@/assets/budx_logo.png' 
import axios from 'axios';
export default {
    data(){
        return {
            logoB,
            footer,
            BUDX,
            IsCreate:true,
        }
    },
    methods:{
        next(){
            this.$router.push({name: 'Ainvite'})
        }
    },
    mounted(option){
        let _this = this;
        let getPhone = this.$route.query['phone'] || false;
        if(!getPhone) {
            _this.IsCreate = false;
        }
        Api.check({'phone':getPhone}).then(data => {
            if(data.code !== 200){ 
                _this.IsCreate = false
                return
            }
            if(data.isValid){
                localStorage.setItem("link_phone",getPhone);
            } else {
                _this.IsCreate = false
            }
            
        }).catch(err => {
            console.log('接口失败',err)
        })
        
        if(localStorage.getItem('is_end') - 0 == 1){
            this.IsCreate = false
        }
        console.log('输出获取的值',this.$store.getters.getIsRegister);
    }
}
</script>
<style scoped>
.homeContainer{
    position: relative;
}
.homeBg{
    position: fixed;
    z-index: -1;
    width: 100vw;
    height:100vh;
    background: url('../assets/home_BG.png') no-repeat center center/cover;
}
</style>
