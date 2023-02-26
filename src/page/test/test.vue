
<template>
  <div class="body">
    <div class="info">
      <div class="left">左边</div>
      <div class="right">右边</div>
    </div>
    <div class="center">
      <div class="value">
        这是值:10000
      </div>
    </div>
    <div class="list">
      <div class="box" v-for="(item,index) in list" :key="index">
        <div class="name">
          {{item.name}}{{index}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test',
  data() {
    return {
      list: [{ name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 }, { name: 1 },]
    }
  },
  computed: {
  },
  methods: {
  },
  mounted() {

  },
}
</script>

<style>
.body {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.info {
  margin: 10px 0px;
  background: #cccccc;
  display: flex;
  justify-content: center;
}
.left,
.right {
  padding: 20px;
  font-size: 25px;
}
.center {
  padding: 40px;
  background: #cccccc;
  margin: 20px 0;
  font-size: 25px;
}
.list {
  flex: 1;
}
.box {
  padding: 20px;
  margin-bottom: 1px;
  background: #cccccc;
}
</style>