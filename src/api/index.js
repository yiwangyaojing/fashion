import fetch from '@/http/fetch';
import url from '@/api/http';

// let url = "http://sme.ipengtai.com/ABIDashboard/";
const Api = {
    url,
    // 第一次进入首页验证手机号
    check(data){
        return fetch({
            url:url+'validateId',
            method:'post',
            data:data
        })
    },
    // 用户注册
    register(data){
        data['phone'] = localStorage.getItem('link_phone');
        return fetch({
            url:url+'registerUser',
            method:'post',
            data:data
        })
    },
    // 获取所有商品
    getGoods(){
        return fetch({
            url:url+'getAllGoods',
            method:'post',
            data:{}
        })
    },
    // 获取某个商品详情
    getGoodsDetails(data){
        return fetch({
            url:url+'getGoodById',
            method:'post',
            data:data
        })
    },
    // 查询某个商品的颜色
    getUrlByTypeAndColour(data){
        return fetch({
            url:url+'getUrlByTypeAndColour',
            method:'post',
            data:data
        })
    },
    // 查询省份
    getProvince(){
        return fetch({
            url:url+'getProvince',
            method:'post',
            data:{}
        })
    },
    // 查询市
    getCityByProvince(data){
        return fetch({
            url:url+'getCityByProvince',
            method:'post',
            data:data
        })
    },
    // 提交
    commitStorm(data){
        return fetch({
            url:url+'commitStorm',
            method:'post',
            data:data
        })
    },
    // 获取验证码
    validatePhone(data){
        data['phone'] = localStorage.getItem('link_phone');
        return fetch({
            url:url+'validatePhone',
            method:'post',
            data:data
        })
    }
}
export default Api