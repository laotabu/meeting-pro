<template>
  <div>
    <video ref="review" controls width="500" height="400" autoplay>

    </video>
  </div>
</template>

<script>

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  mounted: function () {
    
    this.__initApp();
  },
  methods: {
    __initApp() {

      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      }).then(this.dealMediaStream).catch(this.dealError)
    },
    dealMediaStream(_stream) {
      this.$refs.review.srcObject = _stream;
    },

    dealError(err) {
      console.log(err);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
