import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 购物车的增删查，当前用户的注册，
const store = new Vuex.Store({
    state: {
      shop:[],
      isRegister:0,   //用来判断用户是否注册,没有注册无法进入最后的选择地址页,中间也会用户判断用户是否是没有跳过的注册.
    },
    mutations: {
      // 添加购物车信息 state信息,商品信息,id是(商品id + 商品颜色 + 商品大小的字符串)
      addShop(state,value){
        let shop = state.shop;
        if(shop.length == 2){
          return console.log('商品最多选择两件');
        } else {
          state.shop.push(value);
          // Vue.set(state,'shop',shop)
          localStorage.setItem("goods",JSON.stringify(state.shop));
        }
      },
      // 删除购物车里面的某个商品,value是当前下标;
      deShop(state,value){
        let shop = state.shop;
        shop.splice(value,1);
        state.shop = shop;
        // Vue.set(state,'shop',state.shop)
        localStorage.setItem("goods",JSON.stringify(state.shop));
      },
      // 修改用户是否注册，默认没有注册
      updateisRegister(state,value){
        localStorage.setItem("isRegister",value);
        state.isRegister = value
      },
      // 重新给购物车赋值,localStorage单独针对方法;
      NewShop(state,value){
        state.shop = value;
        // Vue.set(state,'shop',value);
      }
    },
    getters:{
      // 获取信息时，如果store中没有当前的信息，需要从localStorage中获取，然后赋值给store，如果localhost中也不存在则都为空；
      // 获取当前用户是否注册
      getIsRegister(state){
        if(!(localStorage.getItem('isRegister') - 0)){
          store.commit('updateisRegister',0)
          return state.isRegister;
        } else {
          store.commit('updateisRegister',1)
          return state.isRegister;
        }
      },
      // 获取购物车信息
      getGoods(state){
        let goods = JSON.parse(localStorage.getItem('goods')) || [];  //本地存储中的购物车信息
        console.log('获取购物车信息',goods)
        if(goods.length > 0){
          store.commit('NewShop',goods);
        }
        return state.shop;
      }
    }
  })
  export default store