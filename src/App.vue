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
        <InfoModal @onModalToggle="onModalToggle"></InfoModal>
      </nav>
      <Title level="1" text="SenseHAT Pixelator"/>
    </header>
    <main>
      <div class="section section-colorpicker">
        <Title level="2" text="Choose a color:"/>
        <ColorPicker @rgbChange="onRGBChange" model="rgb" :defaultRGB="defaultRGB"/>
      </div>

      <div class="section section-pixelgrid">
        <Title level="2" text="Click on the pixels to draw your image:"/>
        <PixelGrid
          :pixelsRGB="pixels.RGB"
          @pixelChange="onPixelChange"
          :defaultRGB="defaultRGB"
          :currentRGB="currentRGB"
        />
      </div>

      <div class="section section-options">
        <Title level="2" text="Are you using a real SenseHAT device, or an emulator?:"/>
        <RadioOptions @radioChange="onRadioChange" :radioOptions="radioOptions"/>
      </div>

      <div class="section section-codedisplay">
        <Title
          level="2"
          text="Copy this code into a new .py file and run the script with your SenseHAT plugged in or the emulator running:"
        />
        <CodeDisplay :code="finalCode"/>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Title from "./components/Title.vue";
import Footer from "./components/Footer.vue";
import ColorPicker from "./components/ColorPicker.vue";
import PixelGrid from "./components/PixelGrid.vue";
import RadioOptions from "./components/RadioOptions.vue";
import CodeDisplay from "./components/CodeDisplay.vue";
import LoadModal from "./components/LoadModal.vue";
import SaveModal from "./components/SaveModal.vue";
import InfoModal from "./components/InfoModal.vue";

export default {
  name: "app",
  components: {
    Title,
    Footer,
    ColorPicker,
    PixelGrid,
    RadioOptions,
    CodeDisplay,
    LoadModal,
    SaveModal,
    InfoModal
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
  },
  methods: {
    onModalToggle(modalOpen) {
      this.modalOpen = modalOpen;
    },
    // Triggered by watcher in ColorPicker
    onRGBChange(rgb) {
      this.currentRGB = rgb;
    },
    // Triggered pixel click, updates pixel data on App and regenerates 'code'
    onPixelChange(e) {
      this.pixels.RGB[e.index] = e.rgb.replace("rgb", "");
      this.generatePixelCode();
    },
    // Triggered radio options selection, updates data on App and regenerates 'code'
    onRadioChange(value) {
      this.radioOptions.selected = value;
      this.generatePixelCode();
    },
    // Generates the Python code based on pixel data and selected radio options
    generatePixelCode() {
      let lib =
        this.radioOptions.selected === "real-device"
          ? "sense_hat"
          : "sense_emu";

      this.finalCode = `from ${lib} import SenseHat
sense = SenseHat()
pixels = [${this.pixels.RGB}]
sense.set_pixels(pixels)
`;
    },
    // When pixel data is saved by user, update App state
    onSavePixel(e) {
      this.savedPixels = e;
    },
    // When pixel data is loaded by user, update App state
    onLoadPixel(e) {
      this.pixels.RGB = e.pixels.RGB;
    },
    // When pixel data is deleted by user, filter it out and save to localstorage
    onDeletePixel(e) {
      let savedPixels = this.savedPixels.savedPixels.filter(item => {
        return item.name !== e.name;
      });
      this.savedPixels.savedPixels = savedPixels;
      localStorage.setItem("savedPixels", JSON.stringify(this.savedPixels));
    }
  },
  // On Component Mount
  mounted: function() {
    // Set currentRGB to default
    this.currentRGB = this.defaultRGB;
    // Create 64 pixels in data with default RGB
    for (let i = 0; i < 64; i++) {
      this.pixels.RGB.push(this.defaultRGB.replace("rgb", ""));
    }
    // Set default 'selected' value for radioOptions
    this.radioOptions.selected = this.radioOptions.options[0].name;
    // Generate the initial Python code
    this.generatePixelCode();
    // If no saves exist, set up an object for them in localStorage
    if (localStorage.getItem("savedPixels") === null) {
      let savedPixels = JSON.stringify({ savedPixels: [] });
      localStorage.setItem("savedPixels", savedPixels);
    } else {
      // If saves exist, use them to set App state
      this.savedPixels = JSON.parse(localStorage.getItem("savedPixels"));
    }
  }
};
</script>

<style>
@import "./assets/css/normalize.css";
@import "./assets/css/global.css";
@import "./assets/css/sections.css";
@import "./assets/css/header.css";
@import "./assets/css/modals.css";
@import "./assets/css/buttons.css";
@import "./assets/css/components/SaveModal.css";
@import "./assets/css/components/LoadModal.css";
@import "./assets/css/components/LoadModalItem.css";
@import "./assets/css/components/RadioOptions.css";
@import "./assets/css/components/Title.css";
@import "./assets/css/components/PixelGrid.css";
@import "./assets/css/components/Pixel.css";
@import "./assets/css/components/CodeDisplay.css";
@import "./assets/css/components/Footer.css";
</style>