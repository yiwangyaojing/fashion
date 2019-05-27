<script>
import budx from '@/assets/budx.png'
import { Loading } from 'vant'

export default {
    name: 'budx',
    data(){
        return {
            loadingStatus:false
        }
    },
    render(){
        return (
            <div>
                {this.loadingStatus?
                    <div style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(105,105,105,0.8);">
                        <div style="padding-top:45vh;"><Loading type="spinner" style="margin:auto;"/></div>
                    </div>:[]
                }
                
                    <img src={budx} style="width:100vw;min-height:100vh;"/>
            </div>
        )
    }
}
</script>
