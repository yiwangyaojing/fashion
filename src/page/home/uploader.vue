<template>
  <div class="sw-uploader">
    <input type="file" :accept="fileType" @change="doUpload" class="hide" />
  </div>
</template>
<script>
export default {
  name: 'sw-uploader',
  props: {
    fileType: {
      type: String,
      default: 'image/*'
    }
  },
  methods: {
    //选择文件
    selectFile() {
      this.$el.getElementsByTagName('input')[0].click();
    },
    doUpload(evt) {
      let files = evt.target.files;
      if (files.length === 0) {
        // this.$toast('请选择照片');
        return false;
      }
      let file = files[0];
      // this.$toast.loading();
      this.photoCompress(file, imgData => {
        if (imgData) {
          this.$emit('onSelected', imgData);
          // this.$toast.clear();
        } else {
          // this.$toast('图片获取失败');
        }
      });
    },

    photoCompress(file, callback) {
      let ready = new FileReader();
      ready.readAsDataURL(file);
      let _this = this;
      ready.onload = function() {
        let re = this.result;
        _this.$emit('onLoadImage', re);
        _this.canvasDataURL(re, { width: 800, quality: 0.8 }, callback);
      };
    },

    canvasDataURL(path, obj, callback) {
      let img = new Image();
      img.src = path;
      img.onload = function() {
        let that = this;
        // 默认按比例压缩
        let w = that.width,
          h = that.height,
          scale = w / h;
        w = obj.width || w;
        h = obj.height || w / scale;
        let quality = 0.7; // 默认图片质量为0.7
        //生成canvas
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        // 创建属性节点
        let anw = document.createAttribute('width');
        anw.nodeValue = w;
        let anh = document.createAttribute('height');
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
          quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        let base64 = canvas.toDataURL('image/jpeg', quality);
        // 回调函数返回base64的值
        callback(base64);
      };
    }
  }
};
</script>
