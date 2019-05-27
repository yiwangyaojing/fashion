<template>
    <div>
        <div>
            <HeaDer></HeaDer>
            <div style="margin:15vw 0 0;padding:5vw;">
                <Field label="姓名" v-model="username" maxlength="6" placeholder="请输入姓名"/>
                <Field v-model="phone" maxlength="11" label="+86" placeholder="请输入手机号"/>
                <Field v-model="registerCode" placeholder="请输入验证码">
                    <Button v-if="!time_start" round slot="button" size="small" @click="GetSend()">获取验证码</Button>
                    <Button disabled round slot="button" size="small" v-else>{{time}}</Button>
                </Field>
                <section v-if="!success" @click="register" class="Submission">
                    注册
                </section>
                <section v-else class="Submission">
                    注册成功,倒计时 {{success_time}}
                </section>
            </div> 
            
                <ImgFooter></ImgFooter>               
        </div>
    </div>
</template>

<script>
import Api from '@/api/index';
import { Field,Button } from 'vant';
import HeaDer from '@/components/header.vue';
import ImgFooter from '@/components/ImgFooter.vue';

export default {
    name: 'register',
    components:{
        HeaDer,
        Field,
        Button,
        ImgFooter
    },
    data(){
        return {
            username:'',
            phone:'',
            registerCode:'',
            time:60,
            time_start:false,
            success_time:3, //注册成功3秒跳转
            success:false
        }
    },
    methods:{
        // 三秒倒计时
        ThreeTime(){
            let time = setInterval(() => {
                this.success_time = this.success_time - 1;
                if(this.success_time == 0){
                    clearInterval(time)
                    this.success = false
                    this.success_time = 3
                    this.$router.push({name:'chooseGood'})
                    this.$store.commit('updateisRegister',1) //改状态为已经注册
                }
            },1000)
        },
        // 验证码倒计时
        downTime(){
            let time = setInterval(() => {
                this.time = this.time - 1;
                if(this.time == 0){
                    clearInterval(time)
                    this.time_start = false;
                    this.time = 60
                }
            },1000)
        },
        register(){
            if(this.username.length < 1){
                this.$Message.error('请填写正确的名字');
                return
            }
            if(!(/^1[34578]\d{9}$/.test(this.phone))){ 
                this.$Message.error('手机号码有误，请重填');
                return;
            }
            if(!this.registerCode){
                this.$Message.error('请输入验证码');
                return;
            }

            let data = {
                "registerPhone":this.phone,
                "userName":this.username,
                "registerCode":this.registerCode
            }
            Api.register(data).then(data => {
                if(data.code !== 200){
                    this.$Message.error('参数错误,或者网络错误,请重试');
                    return
                } 
                if(data.status == 1){
                    this.$Message.error('您已经注册过了');
                    return
                }
                if(data.status == 2){
                    this.$Message.error('验证码错误');
                    return
                }
                if(data.status == 0){
                    this.$Message.success('注册成功,请稍后');
                    localStorage.setItem("register_type",1);    //注册状态为1,会赠送门票
                    this.success = true;
                    this.ThreeTime();
                }
                console.log('接口成功',data)
            }).catch(err => {
                console.log('接口失败',err)
            })
        },
        GetSend(){
            let registerPhone = this.phone;
            if(!(/^1[34578]\d{9}$/.test(registerPhone))){ 
                this.$Message.error('手机号码有误，请重填');
                console.log("手机号码有误，请重填");  
                return;
            }
            Api.validatePhone({registerPhone}).then(data => {
                console.log('验证码接口成功',data)
                if(data.code !== 200){
                    this.$Message.error('参数错误,或者网络错误,请重试');
                    return
                } else {
                    this.$Message.success('验证码获取成功,请稍后');
                    this.time_start = true;
                    this.downTime();
                }

            }).catch(err => {
                console.log('验证码接口失败',err)
            })
        }
    },
    mounted(){
        let is = this.$store.getters.getIsRegister - 0; 
        // 如果用户已经注册过了,则跳到选择商品页面
        if(is == 1){
            this.$router.push({name:'chooseGood'})
        } 
    }
}
</script>
<style scoped>
div >>> .van-cell::after{
    content: ' ';
    position: absolute;
    pointer-events: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    left: 15px;
    right: 0;
    bottom: 0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    border-bottom: 1px solid #ebedf0;
}
</style>
