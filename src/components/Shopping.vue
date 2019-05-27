<template>
    <div v-if="getGoods.length > 0" class="Shopping"> 
        <section style="overflow:hidden;font-size:1.5vh;" v-for="(item,index) in getGoods" :key="index"> 
            <span style="width:22%;display:inline-block;"><span v-if="index == 0">您已挑选：</span></span> 
            <p> {{item.name}} {{item.colorName ? '|' : ''}} {{item.colorName}} {{item.sizeName ? '|' : ''}} {{item.sizeName}} </p>
            <span class="delete" @click="deGoods(index)"> 删除 </span>
        </section>
        <i></i>
        <section v-if="getGoods.length == 1" style="overflow:hidden;font-size:1.5vh;"> 
            <span style="width:22%;display:inline-block;"></span> 
            <p></p>
            <span >  </span>
        </section>
    </div> 
    <div v-else class="Shopping">
        <section style="overflow:hidden;font-size:1.5vh;"> 
            <span>您的购物车还未有商品.</span> 
            <p></p>
            <span @click="go_click()" style="color:#3388ff;text-decoration:underline;"> 去选择 </span>
        </section>
        <i></i>
        <section style="overflow:hidden;font-size:1.5vh;"> 
            <span style="width:22%;display:inline-block;"></span> 
            <p></p>
            <span >  </span>
        </section>
    </div>  
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    computed:{
        getGoods(){
            return this.$store.getters.getGoods;
        }
    },
    mounted(){
        console.log('输出getGoods',this.getGoods)
    },
    methods:{
        deGoods(index){
            this.$store.commit('deShop',index);
        },
        go_click(){
            this.$router.push({name:'chooseGood'})
        }
    }
}
</script>
<style>
.delete{
    width: 22vw;
    background: #292929;
    height: 4vh;
    text-align: center;
    color: #fff;
    line-height: 4vh;
    border-radius: 7vw;
    float: right;
    margin-top: 2vh;
    margin-right: 10px;
    cursor: pointer;
}
.Shopping{
    height: 16vh;
    width: 95%;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 5px;
    margin-bottom: 10px;
    position: relative;
}
.Shopping i{
    position: absolute;
    top: 52%;
    left: 7%;
    width: 86%;
    height: 1px;
    background: #DEDEDE;
}
.Shopping section{
    height: 8vh;
    line-height: 8vh;
    background: #f5f5f5;
    padding: 2px 15px;
    font-size: 12px;
    box-sizing: border-box;
}
.Shopping section p{
    display: inline-block;
}
</style>

