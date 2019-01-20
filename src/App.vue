<template>
  <div id="app" :class="{ modalOpen: modalOpen }">
    <header>
      <nav>
        <LoadModal
          v-if="savedPixels.savedPixels && savedPixels.savedPixels.length"
          :savedPixels="savedPixels"
          @onLoadPixel="onLoadPixel"
          @onDeletePixel="onDeletePixel"
          @onModalToggle="onModalToggle"
        />
        <SaveModal
          @onSavePixel="onSavePixel"
          @onModalToggle="onModalToggle"
          :savedPixels="savedPixels"
          :pixels="pixels"
          :deviceOrEmu="radioOptions.selected"
        />
      </nav>
      <Title level="1" text="SenseHAT Pixelator"/>
    </header>
    <main>
      <div class="component component-colorpicker">
        <Title level="2" text="Choose a color:"/>
        <ColorPicker @rgbChange="onRGBChange" model="rgb" :defaultRGB="defaultRGB"/>
      </div>
      <div class="component component-pixelgrid">
        <Title level="2" text="Click on the pixels to draw your image:"/>
        <PixelGrid
          :pixelsRGB="pixels.RGB"
          @pixelChange="onPixelChange"
          :defaultRGB="defaultRGB"
          :currentRGB="currentRGB"
        />
      </div>
      <div class="component component-options">
        <Title level="2" text="Are you using a real SenseHAT device, or an emulator?:"/>
        <RadioOptions @radioChange="onRadioChange" :radioOptions="radioOptions"/>
      </div>
      <div class="component component-codedisplay">
        <Title
          level="2"
          text="Copy this code into a new .py file and run the script with your SenseHAT plugged in or the emulator running:"
        />
        <CodeDisplay :code="finalCode"/>
      </div>
    </main>
  </div>
</template>

<script>
import Title from "./components/Title.vue";
import ColorPicker from "./components/ColorPicker.vue";
import PixelGrid from "./components/PixelGrid.vue";
import RadioOptions from "./components/RadioOptions.vue";
import CodeDisplay from "./components/CodeDisplay.vue";
import LoadModal from "./components/LoadModal.vue";
import SaveModal from "./components/SaveModal.vue";
import "./assets/css/normalize.css";
import "./assets/css/global.css";

export default {
  name: "app",
  components: {
    Title,
    ColorPicker,
    PixelGrid,
    RadioOptions,
    CodeDisplay,
    LoadModal,
    SaveModal
  },
  methods: {
    onRGBChange(rgb) {
      // Set to watcher in ColorPicker
      this.currentRGB = rgb;
    },
    onPixelChange(e) {
      // Set to event when pixel changes, update pixelData on App
      this.pixels.RGB[e.index] = e.rgb.replace("rgb", "");
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
    },
    onSavePixel(e) {
      this.savedPixels = e;
    },
    onLoadPixel(e) {
      this.pixels.RGB = e.pixels.RGB;
    },
    onDeletePixel(e) {
      let savedPixels = this.savedPixels.savedPixels.filter(item => {
        return item.name !== e.name;
      });
      this.savedPixels.savedPixels = savedPixels;
      localStorage.setItem("savedPixels", JSON.stringify(this.savedPixels));
    },
    onModalToggle(modalOpen) {
      this.modalOpen = modalOpen;
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
    // If saves dont exist, set up an object for them
    if (localStorage.getItem("savedPixels") === null) {
      let savedPixels = JSON.stringify({ savedPixels: [] });
      localStorage.setItem("savedPixels", savedPixels);
    } else {
      this.savedPixels = JSON.parse(localStorage.getItem("savedPixels"));
    }
  },
  data() {
    return {
      defaultRGB: "rgb(0,0,0)",
      currentRGB: "",
      pixels: {
        RGB: []
      },
      savedPixels: {},
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
      finalCode: "",
      modalOpen: false
    };
  }
};
</script>

<style>
@import "./assets/css/global.css";
@import "./assets/css/typography.css";
@import "./assets/css/components.css";
@import "./assets/css/pixels.css";
@import "./assets/css/modals.css";
@import "./assets/css/buttons.css";
@import "./assets/css/header.css";
</style>