<template>
    <div>
            <HeaDer></HeaDer>
                <br/>
                <p style="text-align:right;padding-right:10vw;font-size:3.7vw;">*每位大使最多选择两件哟</p>
                <br/>
                <div style="display:flex;flex-wrap:wrap;padding:0 1vw;">
                    <div :key="index" v-for="(item,index) in goodList" style="width:45%;margin:2.5%;height:55vw;">
                        <div @click="selectGood(item)" style="border-radius:1vw;background:#F5F7F6;height:100%;text-align:center;position:relative;">
                            <img :src="http + item.url" style="width:75%;position:absolute;left:0;right:0;top:0;bottom:0;margin:auto;"/>
                        </div>
                    </div>
                </div>
                <div style="height:15vw;" />
                <!-- <div style="position:fixed;bottom:0;width:100vw;height:13vw;background:#fff;line-height:13vw;" class="van-hairline--top">
                    <div    style="padding:0 5vw;height:100%;position:relative;font-size:3.7vw;">
                        <span style="font-weight:600;color:#CF0A2C;">BE A KING</span>
                        <div style="position:absolute;right:5vw;height:13vw;bottom:0;">
                            <span style="padding:7px 17px;background:#333333;color:#fff;">选择完毕</span>
                        </div>
                    </div>
                </div>  -->
                <ImgFooter></ImgFooter>
            </div>
</template>


<script>
import Api from '@/api/index'
import HeaDer from '@/components/header.vue';
import ImgFooter from '@/components/ImgFooter.vue';
import imgS from '@/assets/v2_pnxlcv.png'
import { Toast } from 'vant'

export default {
    components:{
        HeaDer,
        ImgFooter
    },
    name: 'chooseGood-',
    data(){
        return {
            url_header:Api.url,
            imgSRC:imgS,
            goodList:[],
            http:''
        }
    },
    methods:{
        selectGood(item){
            console.log(item)
            this.$router.push({name:'chooseSize',query:{id:item.id}})
            // if(item.goodActive){
            //     item.goodActive = false
            // }else{
            //     let num = 0;
            //     this.goodList.forEach(element=>{
            //         if(element.goodActive){
            //             num++
            //         }
            //     })
            //     if(num<2){
            //         item.goodActive = true
            //     }else{
            //         Toast("您已选择两个商品！")
            //     }
            // }
        }
    },
    mounted(){
        this.$Spin.show();
        Api.getGoods().then(data => {
            console.log('接口成功',data)
            this.$Spin.hide();
            if(data.code != 200){
                this.$Message.error('请求失败,请重试');
                return
            }
            this.http = data.http
            this.goodList = data.goods;
            console.log(this.goodList)
        }).catch(err => {
            this.$Spin.hide();
            console.log('接口失败',err)
        })
    }
}
</script>
<style scoped>
.active{
    border:1px solid red;
}
</style>
