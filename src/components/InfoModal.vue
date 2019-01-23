<template>
  <div class="component component--info-modal">
    <button @click="toggleModal">What is this?</button>
    <div class="modal" v-if="modalOpen">
      <button class="button-exit" @click="toggleModal">Exit</button>
      <div class="modal-content">
        <Title level="3" text="What is this?"/>
        <p>This is an app you can use to draw pixel art for the SenseHAT peripheral device for the Raspberry Pi. The code at the bottom of the page updates as you go and generates the Python code needed to display the pixel art on the SenseHAT.</p>
        <Title level="3" text="What is a SenseHAT?"/>
        <p>
          The SenseHAT is an attachment for the Raspberry Pi which has a bunch of environmental sensors like temperature, humitidy etc. It also has an 8x8 grid of LEDs. For more information check out the Specifications tab on
          <a
            href="https://www.raspberrypi.org/products/sense-hat/"
          >this page</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "./Title.vue";

export default {
  name: "InfoModal",
  components: {
    Title
  },
  data() {
    return {
      modalOpen: false
    };
  },
  methods: {
    toggleModal() {
      this.modalOpen = !this.modalOpen;
      this.$emit("onModalToggle", this.modalOpen);
    }
  }
};
</script>