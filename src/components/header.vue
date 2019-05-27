<template>
    <div class="top">
        <div class="icon" @click="go()" v-if="!end"> <img :src="rightIcon" alt=""> </div>
        <div class="icon" v-if="end"> </div>
        <div class="pagename" style="font-size:1.5vh;"> {{PageName}} </div>
    </div>
</template>

<script>
import rightIcon from "@/assets/rightIcon.jpg";
export default {
    data(){
        return{
            PageName:'主页',
            rightIcon,
            end:false
        }
    },
    methods:{
        go(){
            this.$router.go(-1);
        }
    },
    mounted(){
        let name = this.$route.name;
        if(name == 'chooseGood'){
            this.PageName = '挑选商品'
        }else if (name == 'chooseSize'){
            this.PageName = '选择尺寸'
        }else if (name == 'register'){
            this.PageName = '注册'
        }else if (name == 'address'){
            this.end = true;
            this.PageName = '填写地址'
        }else if(name == 'verification'){
            this.PageName = '验证手机号'
        }
    }
}
</script>

<style>
.top{
    padding: 10px;
}
.top div{
    display: inline-block;
}
.icon{
    width: 10px;
    cursor: pointer;
    height: 8%;
}
.icon img{
    width: 100%;
    height: 100%;
}
.pagename{
    width: 92%;
    text-align: center;
}
</style>
