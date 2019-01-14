<template>
  <div id="app" :class="{ modalOpen: modalOpen }">
    <header>
      <Title level="1" text="SenseHAT Pixelator"/>
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
    </header>
    <main>
      <Title level="2" text="Choose a color:"/>
      <ColorPicker @rgbChange="onRGBChange" model="rgb" :defaultRGB="defaultRGB"/>
      <Title level="2" text="Click on the pixels to draw your image:"/>
      <PixelGrid
        :pixelsRGB="pixels.RGB"
        @pixelChange="onPixelChange"
        :defaultRGB="defaultRGB"
        :currentRGB="currentRGB"
      />
      <Title level="2" text="Are you using a real SenseHAT device, or an emulator?:"/>
      <RadioOptions @radioChange="onRadioChange" :radioOptions="radioOptions"/>
      <Title
        level="2"
        text="Copy this code into a new .py file and run the script with your SenseHAT plugged in or the emulator running:"
      />
      <CodeDisplay :code="finalCode"/>
    </main>
  </div>
</template>

<script>
import Title from "./components/Title.vue";
import ColorPicker from "./components/ColorPicker.vue";
import Pixel from "./components/Pixel.vue";
import PixelGrid from "./components/PixelGrid.vue";
import RadioOptions from "./components/RadioOptions.vue";
import CodeDisplay from "./components/CodeDisplay.vue";
import SaveForm from "./components/SaveForm.vue";
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
    SaveForm,
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

<style scoped>
header {
  background: white;
  padding: 0.5em 0 0.5em 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.22);
  display: flex;
  margin: 0;
}
header h1 {
  flex: 1;
  padding: 0 1rem;
}
header > div {
  margin-right: 0.5em;
}
</style>


<style>
/* FIELDS */
input[type="text"] {
  border-radius: 5px;
  border: none;
  box-shadow: inset 0px 0px 1px 1px rgba(71, 26, 26, 0.4),
    0px 0px 0px 1px rgba(255, 255, 255, 0.5);
  padding: 10px;
}

/* BUTTONS */
button {
  font-size: 14px;
  text-transform: uppercase;
  color: white;
  border-radius: 5px;
  border: none;
  padding: 10px;
  background: #00bfff;
  cursor: pointer;
}
button:hover,
button:focus {
  background: #41d0ff;
}
.button-exit {
  background: #ff6969;
}
.button-exit:hover,
.button-exit:focus {
  background: #fd8080;
}
.button-invisible {
  padding: 0;
  margin: 0;
  background: transparent;
}

/* MODALS */
.modalOpen {
  height: 100%;
  overflow-y: hidden;
  position: fixed;
}
.modal {
  position: fixed;
  top: 0%;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 999;
}
.modal-content {
  position: absolute;
  top: 50%;
  width: 280px;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 0 1em 1em 1em;
  border-radius: 5px;
  margin: 0 auto;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  overflow: scroll;
  max-height: 380px;
}
@media only screen and (min-width: 768px) {
  .modal-content {
    overflow: scroll;
    max-height: 600px;
  }
}
.modal button.button-exit {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  z-index: 999;
}
@media only screen and (min-width: 600px) {
  .modal button.button-exit {
    top: 2em;
    right: 2em;
  }
}
.modal ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.modal li {
  border-top: 1px solid #ddd;
  padding: 0.75em 0;
  display: flex;
  justify-content: space-between;
}
.modal li:first-of-type {
  border-top: none;
}
.modal li button {
  height: fit-content;
}
</style>