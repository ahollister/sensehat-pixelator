<template>
  <div id="app">
    <Title level="1" text="SenseHAT Pixelator"/>
    <Title level="2" text="Click here to choose colours:"/>
    <ColorPicker @rgbChange="onRGBChange" model="rgb" v-bind:defaultRGB="defaultRGB"/>
    <Title level="2" text="Click on the pixels below to draw your image:"/>

    <Title level="2" text="Are you using a real SenseHAT device, or an emulator?:"/>

    <Title
      level="2"
      text="Copy this code into a new .py file and run the script with your SenseHAT plugged in or the emulator running:"
    />
  </div>
</template>

<script>
import Title from "./components/Title.vue";
import ColorPicker from "./components/ColorPicker.vue";

export default {
  name: "app",
  components: {
    Title,
    ColorPicker
  },
  methods: {
    onRGBChange(rgb) {
      this.currentRGB = rgb;
    }
  },
  mounted: function() {
    this.currentRGB = this.defaultRGB;
  },
  data() {
    return {
      defaultRGB: "rgb(0,0,0)",
      currentRGB: ""
    };
  }
};
</script>