<template>
  <div class="load-modal">
    <button @click="toggleModal">Load Pixels</button>
    <div class="modal" v-if="modalOpen">
      <button @click="toggleModal">Exit</button>
      <ul>
        <LoadItem
          @onLoadPixel="onLoadPixel"
          @onDeletePixel="onDeletePixel"
          :pixel="pixel"
          v-for="pixel in savedPixels.savedPixels"
          :key="pixel.name"
        ></LoadItem>
      </ul>
    </div>
  </div>
</template>

<script>
import LoadItem from "./LoadItem.vue";
export default {
  name: "LoadModal",
  components: {
    LoadItem
  },
  data() {
    return {
      modalOpen: false
    };
  },
  props: {
    savedPixels: {}
  },
  methods: {
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
    onLoadPixel(e) {
      this.$emit("onLoadPixel", e);
      this.toggleModal();
    },
    onDeletePixel(e) {
      this.$emit("onDeletePixel", e);
    }
  }
};
</script>

<style>
.load-modal .modal {
  position: fixed;
  top: 0%;
  bottom: 0;
  left: 0;
  width: 100%;
  /*background: rgba(255, 255, 255, 0.9);*/
  background: rgba(0, 0, 0, 0.9);
  z-index: 999;
}
.load-modal .modal > button {
  position: absolute;
  top: 2em;
  right: 2em;
}
.load-modal .modal ul {
  position: fixed;
  top: 50%;
  width: 280px;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 0.5em 0;
  border-radius: 5px;
  margin: 0 auto;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  list-style-type: none;
}
.load-modal .modal li {
  border-top: 1px solid #ddd;
  padding: 0.75em;
}
.load-modal .modal li:first-of-type {
  border-top: none;
}
</style>
