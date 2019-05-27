<template>
    <div>
        <HeaDer></HeaDer>
        <div style="padding:3vw;">
            <!-- 类似购物车的商品预览 -->
            <ShoppIng></ShoppIng>
            <div class="clearfix">
                <div class="fl goodImage">
                    <div style="height:100%;position:relative;background:#ECEBE9;">
                        <img :src="imgS" alt="" style="width:75%;position:absolute;left:0;right:0;top:0;bottom:0;margin:auto;">
                    </div>
                </div>
                <div class="fr goodSize">
                    <h4 style="text-align:center;height:10%;margin-top:5%;"> {{name}} </h4>
                    <div style="padding-left:3vw;position:relative;font-size:2.5vw;height:55%;display: flex;
                                justify-content: center;
                                align-items: center;">
                        <div  style="">
                            <p>颜色</p>
                            <span v-for="(item,index) in colorData" :key="index" :class='["selectBtn",index == colorIndex ? "color_show":""]' @click="choose_color(index)">{{item}}</span>
                            <br>
                            <p style="margin-top:10px;">尺寸</p>
                            <span v-for="(item,index) in siezeData" :key="item" :class='["selectBtn",index == sizeIndex ? "color_show":""]' @click="choose_size(index)">{{item}}</span>
                        </div>
                    </div>
                    <div class="go_choose"> 
                        <section @click="choose_success()"> 添加该商品 </section>
                        <section @click="choose_end()"> 挑选结束 </section>
                        <span> *最多挑选两件 </span>
                    </div>
                </div>
            </div>
        </div>
        <ImgFooter></ImgFooter>
    </div>
</template>
<script>
import Api from '@/api/index';
import xx from '@/assets/v2_pnxlcv.png'
import HeaDer from '@/components/header.vue';
import ImgFooter from '@/components/ImgFooter.vue';
import ShoppIng from '@/components/Shopping.vue';
export default {
    name:'size',
    components:{
        HeaDer,
        ShoppIng,
        ImgFooter
    },
    data(){
        return {
            imgS:'',
            id:false,
            colorData:'',    //颜色数据
            siezeData:'',   //尺寸数据
            name:'',    //商品名字
            colorIndex:0,//颜色的下标
            sizeIndex:0,//商品大小的下标
        }
    },
    methods:{
        choose_success(){
            let goods = this.$store.getters.getGoods;
            console.log('输出',goods)
            if(goods.length == 2){
                this.$Message.success('商品最多只能选择两件哟');
                return
            }
            if(!this.name) return
            let data = {
                name:this.name, //商品名字
                colorName:this.colorData[this.colorIndex] || '',  //颜色名字
                colorIndex:this.colorIndex, //颜色下标
                sizeName:this.siezeData[this.sizeIndex] || '',  //大小的名字
                sizeIndex:this.sizeIndex    //大小下标
            }
            this.$store.commit('addShop',data);
        },
        choose_end(){
            let goods = this.$store.getters.getGoods;
            if(goods.length == 0){
                this.$Message.success('请先添加商品哟.');
                return
            }
            let is = this.$store.getters.getIsRegister; 
            if(is == 0){
                this.$router.push({name:'verification'})
            } else {
                this.$router.push({name:'address'})
            }
                
        },
        choose_color(index){
            console.log('选择颜色',index)
            this.colorIndex = index;
            let colorName = this.colorData[index];
            this.$Spin.show();
            Api.getUrlByTypeAndColour(
                {
                    "id":this.id - 0,
                    "colour":colorName
                }
            ).then(data => {
                this.$Spin.hide();
                if(data.code !== 200) {
                    this.$Message.error('请求失败,请重试');
                    return
                } 
                this.imgS = data.http + data.url;
            }).catch(err => {
            this.$Spin.hide();
                console.log('获取详细颜色失败',err)
            })
        },
        choose_size(index){
            console.log('选择大小',index)
            this.sizeIndex = index;
        }
    },
    mounted(){
        this.$Spin.show();
        this.id = this.$route.query['id'] || false;
        if(!this.id) return
        Api.getGoodsDetails({"id":this.id - 0}).then(data => {
            this.$Spin.hide();
            if(data.code !== 200) {
                this.$Message.error('请求失败,请重试');
                return
            } 
            this.name = data.good.name;
            this.colorData = data.good.colour;
            this.siezeData = data.good.size;
            this.imgS = data.http + data.good.url;
        }).catch(err => {
            this.$Spin.hide();
            console.log('接口失败',err)
        })
    }
}
</script>
<style scoped>
.color_show{
    background: #333;
    color: #fff;
}
.go_choose{
    font-size: 12px;
    text-align: center;
}
.go_choose span{
    display: block;
    margin-top: 10px;
    font-size: 10px;
}
.go_choose section{
    background: #292929;
    color: #fff;
    width: 65%;
    margin: 0 auto;
    padding: 4px 3px;
    border-radius: 3px;
    margin-top: 10px;
}
.go_choose section:first-child{
    margin-top: 0;
}
.clearfix:after{
    content:"";
    display:block;
    visibility:hidden;
    clear:both;
    height:0;
}
.clearfix{
    zoom: 1;
}
.fl{
    float: left;
}
.fr{
    float: right;
}
.goodImage{
    width: 50%;
    height: 80vw;
}
.goodSize{
    width: 50%;
    height: 80vw;
}

.selectBtn{
    padding: 0.7vw 3vw;
    /* background: #a3a3a3; */
    border-radius: 1vw;
    white-space:nowrap;
    margin:1vw 1vw 1vw 0;
    display: inline-block;
}
</style>
