<template>
  <div class="my-button" @click.capture="clickAnimate($event)" ref="mybutton">
    <slot> </slot>
    <span class="ripples" v-for="(item,index) in showList" :style="{left:item.left,top:item.top,background:bgColor}" v-if="item.show" :key="index"></span>
  </div>
</template>

<script>
export default {
  props: {
    bgColor: {
      default() {
        return '#ffffff';
      },
    }
  },
  data() {
    return {
      showList: [],
    };
  },
  mounted() {
    // buttons.addEventListener('click', (e) => {
    //   this.$emit("click")
    // })
  },
  methods: {
    clickAnimate(e) {
      let buttons = this.$refs.mybutton;
      let x = e.clientX - buttons.getBoundingClientRect().left;
      let y = e.clientY - buttons.getBoundingClientRect().top;
      let setNode = function (x, y) {
        this.show = true;
        this.left = x + 'px';
        this.top = y + 'px';
        setTimeout(() => {
          this.show = false;
        }, 1000)
      }
      let obj = new setNode(x, y);
      this.showList.push(obj)
    },
  }
};
</script>

<style lang="scss" scoped>
.my-button {
  text-align: center;
  position: relative;
  overflow: hidden;
}

.ripples {
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: none;
  border-radius: 50%;
  animation: animate 1s linear 1;
}

@keyframes animate {
  0% {
    width: 0px;
    height: 0px;
    opacity: 0.5;
  }

  100% {
    width: 500px;
    height: 500px;
    opacity: 0;
  }
}
</style>
