<template>
    
    <div class="Address">
        <HeaDer></HeaDer>
        <div v-if="ticket" class="ticket">
            上海时装周的门票将在X天内寄出
        </div>
        <ShoppIng></ShoppIng>
        <div class="loction">
            <div style="font-size:12px;margin-bottom:15px;"> 收货地址 </div>
            <section class="location_list" @click="choose_location('province')">
                <span> 选择省份: </span>
                <span> {{provinces.name}} </span>
                <span class="triangle_border_down">  </span>
            </section>
            
            <section class="location_list" @click="choose_location('ticy')">
                <span> 选择城市: </span>
                <span> {{citys.name}} </span>
                <span class="triangle_border_down">  </span>
            </section>

            <section class="location_list">
                <span> 详细地址: </span>
                <input v-model="more_location" class="more_location" type="text">
            </section>
        </div>
        <div>
            <section @click="Submission()" class="Submission">
                    提交
            </section>
        </div>
        <Popup title="标题" v-model="show" position="bottom" :overlay="true">
            <Picker show-toolbar title="城市选择" :columns="type == 'province' ? show_PC.map(item=>item.provincial):show_PC.map(item=>item.city)" @cancel="onCancel" @change="onChange" @confirm="onConfirm" />
        </Popup>
        <ImgFooter></ImgFooter>
    </div>
</template>

<script>
import Api from '@/api/index';
import { Popup, Picker } from 'vant';
import ShoppIng from '@/components/Shopping.vue';
import HeaDer from '@/components/header.vue';
import ImgFooter from '@/components/ImgFooter.vue';
export default {
    components:{
        HeaDer,
        ShoppIng,
        ImgFooter,
        Picker,
        Popup
    },
    data(){
        return{
           province: [],    //获取的所有省
           city:[],//获取的所有市
           show_PC:[], //当前页面选择的省市
           show:false,
           provinces:{},
           citys:{},
           type:'', //用户当前选择省或者市的类型判断
           more_location:'' //详细地址
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
    methods: {
        Submission(){
            if(!this.provinces.name || !this.citys.name){
                this.$Message.error('请选择省市.');
                return
            }
            if(!this.more_location || this.more_location == ''){
                this.$Message.error('请填写详细地址.');
                return
            }
            let goods = this.$store.getters.getGoods;
            if(goods.length == 0){
                this.$Message.success('请先选择商品哟.');
                return
            }
            let shop = []
            for(let i in goods) {
                let obj = {
                    "name":goods[i].name,
                    "colour":goods[i].colorName,
                    "size":goods[i].sizeName,
                }; 
                shop.push(obj);
            }
            let data = {
                "phone":localStorage.getItem('link_phone'),
                "province":this.provinces.name,
                "city":this.citys.name,
                "address":this.more_location,
                "goods":shop
            }
            console.log(data)
            Api.commitStorm(data).then(data => {
                if(data.code != 200){
                    this.$Message.error('请求失败,请重试');
                    return
                };
                this.$Message.success('购买成功,请稍后');
                setTimeout(() => {
                    localStorage.setItem("is_end",1);
                    this.$router.push({name:'Aend'})
                },2000)
            }).catch(err => {
                console.log('网络请求失败',err)
            })
        },
        choose_location(type){
            console.log(type)
            this.type = type
            if(type == 'province'){
                this.show_PC = this.province
            }
            if(type == 'ticy'){
                if(!this.provinces.name){
                    this.$Message.error('请先选择省份.');
                    return
                }
                this.show_PC = this.city
            }
            this.show = true;
        },
        onConfirm(picker, values){
            console.log(picker, values)
            values = values + 1;
            this.show = false;
            let type = this.type;
            if(type == 'province'){
                this.provinces = {
                    name:picker,
                    id:values
                }
                Api.getCityByProvince({"province":values - 0}).then(data => {
                    console.log('获取市接口成功',data)
                    if(data.code != 200){
                        this.$Message.error('请求失败,请重试');
                        return
                    }
                    this.city = data.province
                    this.citys = {}
                })
            }
            if(type == 'ticy'){
                this.citys = {
                    name:picker,
                    id:values
                }
            }
        },
        onCancel() {
            console.log('取消')
            this.show = false;
        },
        onChange(picker, value, index) {
            console.log(`当前值：${value}, 当前索引：${index}`);
        }
  },
  mounted(){
      Api.getProvince().then(data => {
        if(data.code != 200){
            this.$Message.error('请求失败,请重试');
            return
        }
        this.province = data.province
      }).catch(err => {
          console.log('接口失败',err)
      })
  }
}
</script>
<style scoped>
.ticket{
    text-align: right;
    padding-right: 10px;
    font-size: 12px;
    margin-bottom: 10px;
}
.triangle_border_down{
    display:block;
    width:0;
    height:0;
    border-width:5px 4px 0;
    border-style:solid;
    border-color:#242424 transparent transparent;/*黑色 透明 透明 */
    position:absolute;
    top:20px;
    right:0px;
}
.loction{
    box-sizing: border-box;
    width: 100%;
    padding: 5px 15px;
}
.more_location{
    width: 60%;
    margin-left: 10px;
    border:none;
}
.location_list{
    font-size: 12px;
    width: 90%;
    margin: 0 auto;
    position: relative;
    border-bottom: solid 1px #f2f2f2;
    padding: 10px 4px;
    margin-bottom:15px;
}
</style>
