
<script>

import logoB from '@/assets/logo_b.png'

export default {
    name: 'end',
    render(h,c){
        return (
            <div class="endContainer">
                <div class="endBg"></div>
    1           <div style="width:80vw;margin:15vw auto 0;background:#fff;font-size:20px;text-align:center;color:rgb(16, 16, 16) 100%;font-weight:600;">
                    <div style="padding:10vw 0;text-align:center;">
                        <img src={logoB} style="width:60vw;"/>
                    </div>
                    <br/>
                    <div style="line-height:30px;">
                        <span>恭喜</span>
                    </div>
                    <div style="line-height:30px;">
                        <span>挑选商品结束</span>
                    </div>
                    <div style="line-height:30px;">
                        <span>请耐心等待商品抵达</span>
                    </div>
                    
                    
                    <br/>
                    <div style="color:#CF0C2D;padding-bottom:8vw;margin-top:10vw;">
                        <span>BE A KING</span>
                    </div>
                </div>
                <div style="height:10vw;"></div>
            </div>
        )
    }
}
</script>
<style scoped>
.endContainer{
    position: relative;
}
.endBg{
    position: fixed;z-index: -1;
    width: 100vw;height:100vh;
    background: url('../assets/homeBg.png') no-repeat center center/cover;
}
</style>
