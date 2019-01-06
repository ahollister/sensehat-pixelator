<template>
  <div id="app">
    <Title level="1" text="SenseHAT Pixelator"/>
    <Title level="2" text="Click here to choose colours:"/>
    <ColorPicker @rgbChange="onRGBChange" model="rgb" :defaultRGB="defaultRGB"/>
    <Title level="2" text="Click on the pixels below to draw your image:"/>
    <PixelGrid @pixelChange="onPixelChange" :defaultRGB="defaultRGB" :currentRGB="currentRGB"/>
    <Title level="2" text="Are you using a real SenseHAT device, or an emulator?:"/>
    <RadioOptions @radioChange="onRadioChange" :radioOptions="radioOptions"/>
    <Title
      level="2"
      text="Copy this code into a new .py file and run the script with your SenseHAT plugged in or the emulator running:"
    />
    <CodeDisplay :code="finalCode"/>
  </div>
</template>

<script>
import Title from "./components/Title.vue";
import ColorPicker from "./components/ColorPicker.vue";
import Pixel from "./components/Pixel.vue";
import PixelGrid from "./components/PixelGrid.vue";
import RadioOptions from "./components/RadioOptions.vue";
import CodeDisplay from "./components/CodeDisplay.vue";

export default {
  name: "app",
  components: {
    Title,
    ColorPicker,
    PixelGrid,
    RadioOptions,
    CodeDisplay
  },
  methods: {
    onRGBChange(rgb) {
      // Set to watcher in ColorPicker
      this.currentRGB = rgb;
    },
    onPixelChange(e) {
      // Set to event when pixel changes, update pixelData on App
      this.pixels.RGB[e.index - 1] = e.rgb.replace("rgb", "");
      this.generatePixelCode();
    },
    onRadioChange(value) {
      this.radioOptions.selected = value;
      this.generatePixelCode();
    },
    generatePixelCode() {
      let lib =
        this.radioOptions.selected === "real-device"
          ? "sense_hat"
          : "sense_emu";

      this.finalCode = `
        from ${lib} import SenseHat
        sense = SenseHat()
        pixels = [${this.pixels.RGB}]
        sense.set_pixels(pixels)
      `;
    }
  },
  mounted: function() {
    // Set currentRGB to default
    this.currentRGB = this.defaultRGB;
    // Setup 64 pixels in data with default RGB
    for (let i = 0; i < 64; i++) {
      this.pixels.RGB.push(this.defaultRGB.replace("rgb", ""));
    }
    // Set default 'selected' value in data
    this.radioOptions.selected = this.radioOptions.options[0].name;
    // Generate the initial code
    this.generatePixelCode();
  },
  data() {
    return {
      defaultRGB: "rgb(0,0,0)",
      currentRGB: "",
      pixels: {
        RGB: []
      },
      radioOptions: {
        name: "deviceOrEmu",
        options: [
          {
            name: "real-device",
            label: "Real Device"
          },
          {
            name: "emulator",
            label: "Emulator"
          }
        ],
        selected: ""
      },
      finalCode: ""
    };
  }
};
</script>