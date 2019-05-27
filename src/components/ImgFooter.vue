<template>
    <div class="bottom">
        <img :src="footer" alt="">
    </div>
</template>

<script>
import footer from "@/assets/footer.png";
export default {
    data(){
        return{
            footer
        }
    },
    methods:{
    }
}
</script>

<style>
.bottom{
    width:50%;
    height: 10vw;
    position: fixed;
    bottom: 0;
    left: 25%;
    overflow: hidden;
    margin: 0 auto;
}
.bottom img{
    width: 100%;
    height: 50%;
}
</style>
