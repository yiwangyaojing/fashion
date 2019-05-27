<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
html,body{
  height: 100%;
}
*{
  margin: 0;
  padding: 0;
}

.Submission{
    cursor: pointer;
    width: 65%;
    margin: 40px auto;
    background: #292929;
    color: #fff;
    font-size: 13px;
    padding: 8px 20px;
    text-align: center;
    border-radius: 5px;
    box-sizing: border-box;
}
.A_background_img{
  width:80vw;
  min-height:80vh;
  margin:10vh auto 0;
  background:#000;
  font-size:1.4vw;
  color:#fff;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
