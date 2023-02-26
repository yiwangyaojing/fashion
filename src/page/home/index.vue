<template>
  <div class="body">
    <uploader @onSelected="onSelectedAvatar"></uploader>
    <!-- <img style="width:200px;height:auto" :src="selectedImage" /> -->
    <!-- <img
      style="width:200px;height:auto"
      id="img"
      src="https://imgyoufeng.oss-cn-shanghai.aliyuncs.com/021fa5cfb218cb68b6df9e463bb65b2.png"
      alt=""
    /> -->
    <div class="popup" v-if="showPopup">
      <!-- 裁剪框 -->
      <div class="cropper-body" v-if="showPopupType == 1">
        <div class="choose">
          <span class="close-select-img" @click="closeCropperPopup">取消</span>
          <span class="save-cropper-img" @click="confirmUseCropper">确认</span>
        </div>
        <div class="centent">
          <vueCropper
            class="vue-cropper"
            ref="cropper"
            @crop-sizing="cropSizing"
            @cropMoving="cropMoving"
            @imgLoad="imgLoad"
            :img="option.img"
            :outputSize="option.outputSize"
            :outputType="option.outputType"
            :info="option.info"
            :canScale="option.canScale"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixedBox="option.fixedBox"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :full="option.full"
            :enlarge="option.enlarge"
            :mode="option.mode"
          >
          </vueCropper>
        </div>
        <div class="method">
          <span class="recovery" @click="recovery">重置</span>
          <div class="moreList" v-if="isShowTurnMore">
            <div
              class="text"
              @click="setPixel"
              :class="chooseTurnType == 'pixel' ? 'active' : ''"
            >
              分辨率
            </div>
            <scaleRule
              v-if="chooseTurnType == 'pixel'"
              ref="scaleRule"
              :boxW="220"
              :minNumber="0"
              :maxNumber="1000"
              @changeVal="changeVal"
            ></scaleRule>
            <!-- <scaleRule
              v-if="chooseTurnType == 'median'"
              ref="scaleRule"
              :boxW="220"
              :minNumber="0"
              :maxNumber="254"
              @changeVal="changeVal"
            ></scaleRule> -->
            <!-- <div class="text" @click="setMedian" :class="chooseTurnType == 'median' ? 'active' : ''">阈值</div> -->
            <!-- <div
              class="box"
              :class="turnListIndex == index ? 'active' : ''"
              v-for="(item, index) in turnList"
              @click="chooseF(item, index)"
              :key="index"
            >
              <img :src="item.img" alt="" />
              <div class="text">{{ item.text }}
              <span v-if="item.type == 'reducePixel' || item.type == 'addPixel'">* {{ turnInfoV.pixelMultiple }}</span>
              </div>
            </div> -->
          </div>
          <div class="list">
            <!-- <div class="box" @click="showTurnMore"> -->
            <div class="box">
              <img
                src="https://imgyoufeng.oss-cn-shanghai.aliyuncs.com/055.jpg"
                alt=""
              />
              <div class="text">二值化</div>
            </div>
            <div class="turn-info" v-if="isShowTurnMore">
              <div class="text">
                <div>
                  当前图片分辨率:{{ this.imgPixel.w }} *
                  {{ this.imgPixel.h }}
                </div>
                <div>
                  二值化图片分辨率:{{
                    this.imgPixel.w * this.turnInfoV.pixelMultiple
                  }}
                  *
                  {{ this.imgPixel.h * this.turnInfoV.pixelMultiple }}
                </div>
                <div>阈值:{{ this.turnInfoV.median }}</div>
              </div>
              <div class="turn-btn" @click="saveTurn">
                开始处理
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 裁剪完毕后进行预览 -->
      <div class="preview-body" v-if="showPopupType == 2"></div>
    </div>
    <!-- <img :src="sss" alt="" />
    <canvas id="canvas"></canvas> -->
  </div>
</template>

<script>
const TURNINFOV = function() {
  return {
    pixelMultiple: 1, //像素倍数,默认是1
    median: 200 //阈值,默认是200
  };
};
const IMGPIXEL = function() {
  return {
    w: 0,
    h: 0
  };
};
import uploader from "./uploader.vue";
import scaleRule from "./scaleRule.vue";
export default {
  components: { uploader, scaleRule },
  name: "App",
  data() {
    return {
      sss: "",
      watchCountD: 0,
      isShowTurnMore: true,
      selectedImage: "", //选择的图片
      watchTimer: null,
      showPopup: true,
      showPopupType: 1, //1:裁剪框,2:裁剪完后进行预览
      turnInfoV: TURNINFOV(),
      imgPixel: IMGPIXEL(),
      chooseTurnType: "pixel",
      turnList: [
        // {
        //   img:'https://imgyoufeng.oss-cn-shanghai.aliyuncs.com/055.jpg',
        //   text:'二值化',
        //   type:'showMore'
        // },
        {
          img: "https://imgyoufeng.oss-cn-shanghai.aliyuncs.com/055.jpg",
          text: "了解二值化",
          type: "understand"
        },
        {
          img: "https://imgyoufeng.oss-cn-shanghai.aliyuncs.com/055.jpg",
          text: "如何使用",
          type: "how"
        },
        {
          img: "https://imgyoufeng.oss-cn-shanghai.aliyuncs.com/055.jpg",
          text: "增加分辨率",
          type: "addPixel"
        },
        {
          img: "https://imgyoufeng.oss-cn-shanghai.aliyuncs.com/055.jpg",
          text: "减少分辨率",
          type: "reducePixel"
        },
        {
          img: "https://imgyoufeng.oss-cn-shanghai.aliyuncs.com/055.jpg",
          text: "阈值",
          type: "median"
        }
      ],
      option: {
        img: "", // 裁剪图片的地址 url 地址, base64, blob
        outputSize: 1, // 裁剪生成图片的质量
        outputType: "jpeg", // 裁剪生成图片的格式 jpeg, png, webp
        info: true, // 裁剪框的大小信息
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 0, // 默认生成截图框宽度
        autoCropHeight: 0, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: false, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例 [ 宽度 , 高度 ]
        canMove: false, // 上传图片是否可以移动
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        // centerBox: false, // 截图框是否被限制在图片里面
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        full: true, // 是否输出原图比例的截图
        enlarge: "2", // 图片根据截图框输出比例倍数
        mode: "contain" // 图片默认渲染方式 contain , cover, 100px, 100% auto
      }
    };
  },
  computed: {},
  methods: {
    // 选择设置分辨
    setPixel() {
      this.chooseTurnType = "pixel";
    },
    // 选择设置阈值
    setMedian() {
      this.chooseTurnType = "median";
    },
    // 取消裁剪
    closeCropperPopup() {
      this.showPopup = false;
    },
    // 选择完裁剪的图片,点击确认
    confirmUseCropper() {
      this.getText();
    },
    onSelectedAvatar(data) {
      this.showPopup = true;
      this.showPopupType = 1;
      this.selectedImage = data;
      this.option.img = data;
    },
    // 截图框大小改变事件
    cropSizing() {
      this.watchCountD = 0;
      clearInterval(this.watchTimer);
      this.watchTimer = null;

      this.watchTimer = setInterval(() => {
        this.watchCountD++;
        if (this.watchCountD == 2) {
          console.log("开始预览");
          clearInterval(this.watchTimer);
          this.watchTimer = null;
          // 开始预览
          this.$refs.cropper.getCropData(data => {
            this.option.img = data;
          });
        }
      }, 1000);
    },
    // 裁剪框图片加载成功
    imgLoad() {
      console.log(
        "图片加载成功了,图片的宽高",
        this.$refs.cropper.w,
        this.$refs.cropper.h
      );
      this.imgPixel.w = this.$refs.cropper.cropInfo.width;
      this.imgPixel.h = this.$refs.cropper.cropInfo.height;
      // this.$refs.cropper.changeCrop(this.$refs.cropper.w,this.$refs.cropper.h)
      // console.log(this.$refs.cropper.$el);
      // console.log(window.getComputedStyle(this.$refs.cropper.$el));
      // setTimeout(() => {
      // console.log(
      //   parseFloat(window.getComputedStyle(this.$refs.cropper.$el).width)
      // );
      // console.log(
      //   parseFloat(window.getComputedStyle(this.$refs.cropper.$el).height)
      // );
      this.option.autoCropWidth = this.$refs.cropper.w;
      this.option.autoCropHeight = this.$refs.cropper.h;
      // }, 1000);
    },
    // 复原裁剪框的图片
    recovery() {
      this.option.img = this.selectedImage;
    },
    // 裁剪框移动事件
    cropMoving() {
      console.log("截图框移动了");
      this.watchCountD = 0;
      clearInterval(this.watchTimer);
      this.watchTimer = null;
    },
    // 图片二值化处理
    updateL() {
      // otsu阈值计算
      function OTSUAlgorithm(canvasData) {
        var m_pFstdHistogram = new Array(); //表示灰度值的分布点概率
        var m_pFGrayAccu = new Array(); //其中每一个值等于m_pFstdHistogram中从0到当前下标值的和
        var m_pFGrayAve = new Array(); //其中每一值等于m_pFstdHistogram中从0到当前指定下标值*对应的下标之和
        var m_pAverage = 0; //值为m_pFstdHistogram【256】中每一点的分布概率*当前下标之和
        var m_pHistogram = new Array(); //灰度直方图
        var i, j;
        var temp = 0,
          fMax = 0; //定义一个临时变量和一个最大类间方差的值
        var nThresh = 0; //最优阀值
        //初始化各项参数
        for (i = 0; i < 256; i++) {
          m_pFstdHistogram[i] = 0;
          m_pFGrayAccu[i] = 0;
          m_pFGrayAve[i] = 0;
          m_pHistogram[i] = 0;
        }
        //获取图像的像素
        var pixels = canvasData.data;
        //下面统计图像的灰度分布信息
        for (i = 0; i < pixels.length; i += 4) {
          //获取r的像素值，因为灰度图像，r=g=b，所以取第一个即可
          var r = pixels[i];
          m_pHistogram[r]++;
        }
        //下面计算每一个灰度点在图像中出现的概率
        var size = canvasData.width * canvasData.height;
        for (i = 0; i < 256; i++) {
          m_pFstdHistogram[i] = m_pHistogram[i] / size;
        }
        //下面开始计算m_pFGrayAccu和m_pFGrayAve和m_pAverage的值
        for (i = 0; i < 256; i++) {
          for (j = 0; j <= i; j++) {
            //计算m_pFGaryAccu[256]
            m_pFGrayAccu[i] += m_pFstdHistogram[j];
            //计算m_pFGrayAve[256]
            m_pFGrayAve[i] += j * m_pFstdHistogram[j];
          }
          //计算平均值
          m_pAverage += i * m_pFstdHistogram[i];
        }
        //下面开始就算OSTU的值，从0-255个值中分别计算ostu并寻找出最大值作为分割阀值
        for (i = 0; i < 256; i++) {
          temp =
            ((m_pAverage * m_pFGrayAccu[i] - m_pFGrayAve[i]) *
              (m_pAverage * m_pFGrayAccu[i] - m_pFGrayAve[i])) /
            (m_pFGrayAccu[i] * (1 - m_pFGrayAccu[i]));
          if (temp > fMax) {
            fMax = temp;
            nThresh = i;
          }
        }
        return nThresh;
      }
      this.$refs.cropper.getCropData(data => {
        this.sss = data;
        console.log(data);
        let canvas = document.createElement("canvas");
        // var canvas = document.getElementById("canvas");
        var img = new Image();
        img.src = data;
        console.log(this.$refs.cropper.cropInfo);
        img.height = this.$refs.cropper.cropInfo.height; //使用分辨率
        img.width = this.$refs.cropper.cropInfo.width; //使用分辨率
        img.crossOrigin = ""; //处理图片跨域问题
        var c = canvas.getContext("2d");
        canvas.width = img.width * this.turnInfoV.pixelMultiple;
        canvas.height = img.height * this.turnInfoV.pixelMultiple;
        console.log(img.width * this.turnInfoV.pixelMultiple);
        console.log(img.height * this.turnInfoV.pixelMultiple);
        let that = this;
        img.onload = () => {
          // canvas二值化
          function showImg() {
            c.drawImage(img, 0, 0, canvas.width, canvas.height);
            // console.log(c.drawImage(img, 0, 0, canvas.width, canvas.height));
            var imgData = c.getImageData(0, 0, canvas.width, canvas.height);
            // var index = OTSUAlgorithm(imgData); //阈值 ,应该计算阈值,但是目前如果针对灰色文字也要提取,那么需要写死
            var index = that.turnInfoV.median
              ? that.turnInfoV.median
              : OTSUAlgorithm(imgData); //阈值 灰色文字也要提取,200
            for (var i = 0; i < imgData.data.length; i += 4) {
              var R = imgData.data[i]; //R(0-255)
              var G = imgData.data[i + 1]; //G(0-255)
              var B = imgData.data[i + 2]; //B(0-255)
              var Alpha = imgData.data[i + 3]; //Alpha(0-255)
              var sum = (R + G + B) / 3;
              if (sum > index) {
                imgData.data[i] = 255;
                imgData.data[i + 1] = 255;
                imgData.data[i + 2] = 255;
                imgData.data[i + 3] = Alpha;
              } else {
                imgData.data[i] = 0;
                imgData.data[i + 1] = 0;
                imgData.data[i + 2] = 0;
                imgData.data[i + 3] = Alpha;
              }
            }
            c.putImageData(imgData, 0, 0);
            that.option.img = canvas.toDataURL("image/jpg");
          }
          showImg();
          that.$refs.scaleRule.goOrder({ index: 23 });
          //重置用户的二值化选择
          that.turnInfoV = TURNINFOV();
        };
      });
    },
    // 显示更多二值化处理
    showTurnMore() {
      this.imgPixel.w = this.$refs.cropper.cropInfo.width;
      this.imgPixel.h = this.$refs.cropper.cropInfo.height;
      this.isShowTurnMore = !this.isShowTurnMore;
      if (!this.isShowTurnMore) {
        // 重置用户的二值化选择
        this.clearTurn();
      }
      // this.updateL();
    },
    // 刻度尺变动了
    changeVal({ scaleIndex, scaleVal }) {
      this.turnInfoV.pixelMultiple = scaleVal;
    },
    // 开始处理二值化
    saveTurn() {
      this.updateL();
    },
    // 重置用户的二值化选择
    clearTurn() {
      this.turnInfoV = TURNINFOV();
      this.imgPixel = IMGPIXEL();
      this.turnListIndex = -1;
      this.$refs.scaleRule.goOrder({ index: 23 });
    },
    // 提取文字!
    async getText() {
      this.$refs.cropper.getCropBlob(async img => {
        // do something
        // console.log(data);
        // const img =
        //   // 'https://imgyoufeng.oss-cn-shanghai.aliyuncs.com/e0485279b4bfe12c4f5aad95f21fb70.jpg'; //更多文字,跟多数字
        //   // "https://img0.baidu.com/it/u=1265654701,3339817054&fm=253&fmt=auto&app=138&f=GIF?w=636&h=131"; //数字 520
        //   // "https://imgyoufeng.oss-cn-shanghai.aliyuncs.com/021fa5cfb218cb68b6df9e463bb65b2.png"; //文字加数字 平安银行 000001
        //   // 'https://imgyoufeng.oss-cn-shanghai.aliyuncs.com/%E4%B8%8B%E8%BD%BD.png' //二值化后的图片.中量
        //   "https://imgyoufeng.oss-cn-shanghai.aliyuncs.com/001.png"; //二值化的图片.少量
        //识别的图像可以使url也可以是img元素，此处是生成的临时url
        const { createWorker } = Tesseract;

        let worker = await createWorker({
          logger: m => console.log(m)
        }); //创建工作对象
        await worker.loadLanguage("chi_sim"); //下载或者安装某个语言
        await worker.initialize("chi_sim"); //初始化使用某个语言
        // await worker.setParameters({
        //   user_defined_dpi: "10000000"
        // });
        let text = await worker.recognize(img, "chi_sim"); //导入图片,设置该图片使用的语言
        console.log(text.data.text); //打印图片解析的内容
        console.log(text);
      });
    }
  },
  async mounted() {
    // this.updateL();
    return;
    // 需要做的优化 1:原图片裁剪,2:适当放大,3:增加对比度,4:二值化图像处理
    const img =
      // 'https://imgyoufeng.oss-cn-shanghai.aliyuncs.com/e0485279b4bfe12c4f5aad95f21fb70.jpg'; //更多文字,跟多数字
      // "https://img0.baidu.com/it/u=1265654701,3339817054&fm=253&fmt=auto&app=138&f=GIF?w=636&h=131"; //数字 520
      // "https://imgyoufeng.oss-cn-shanghai.aliyuncs.com/021fa5cfb218cb68b6df9e463bb65b2.png"; //文字加数字 平安银行 000001
      // 'https://imgyoufeng.oss-cn-shanghai.aliyuncs.com/%E4%B8%8B%E8%BD%BD.png' //二值化后的图片.中量
      "https://imgyoufeng.oss-cn-shanghai.aliyuncs.com/001.png"; //二值化的图片.少量
    //识别的图像可以使url也可以是img元素，此处是生成的临时url
    const { createWorker } = Tesseract;

    let worker = await createWorker({
      logger: m => console.log(m)
    }); //创建工作对象
    await worker.loadLanguage("chi_sim"); //下载或者安装某个语言
    await worker.initialize("chi_sim"); //初始化使用某个语言
    // await worker.setParameters({
    //   user_defined_dpi: "10000000"
    // });
    let text = await worker.recognize(img, "chi_sim"); //导入图片,设置该图片使用的语言
    console.log(text.data.text); //打印图片解析的内容
    console.log(text);
  }
};
</script>

<style scoped lang="scss">
.body {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  position: relative;
  .popup {
    background: #000;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    .cropper-body {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .choose {
        height: 50px;
        line-height: 50px;
        color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        padding-bottom: 10px;
        .close-select-img,
        .save-cropper-img {
          padding: 0 20px;
        }
      }
      .centent {
        flex: 1;
        padding: 0 40px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .vue-cropper {
          flex: 1;
        }
      }
      .method {
        margin-top: 10px;
        .recovery {
          color: #3388ff;
          opacity: 0.8;
          padding: 10px;
          display: inline-block;
          font-size: 14px;
        }
        .moreList {
          box-sizing: border-box;
          padding: 0 20px;
          display: flex;
          padding-bottom: 15px;
          justify-content: space-between;
          align-items: center;
          .text {
            color: #ffffff;
            font-size: 10px;
            &.active {
              color: #3388ff;
            }
          }
          // .box {
          //   display: flex;
          //   flex-direction: column;
          //   align-items: center;
          //   padding: 10px 5px;
          //   &.active {
          //     .text {
          //       color: #3388ff;
          //     }
          //   }
          //   img {
          //     width: 15px;
          //     height: 15px;
          //     border-radius: 50%;
          //     margin-bottom: 5px;
          //   }
          //   .text {
          //     color: #ffffff;
          //     font-size: 8px;
          //   }
          // }
        }
        .list {
          padding: 0 20px;
          display: flex;
          padding-bottom: 10px;
          // justify-content: space-between;
          align-items: center;
          .box {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px 0px;
            img {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              margin-bottom: 5px;
            }
            .text {
              color: #ffffff;
              font-size: 10px;
            }
          }
          .turn-info {
            flex: 1;
            text-align: left;
            font-size: 8px;
            color: #ffffff;
            padding-left: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .turn-btn {
              height: 20px;
              line-height: 20px;
              padding: 5px 10px;
              text-align: center;
              border: solid 0.5px #3388ff;
              color: #3388ff;
              border-radius: 4px;
            }
          }
        }
      }
    }
  }
}
</style>
