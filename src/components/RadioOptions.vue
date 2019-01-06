<template>
  <div>
    <span class="radio-option" v-for="(option, index) in radioOptions.options" :key="index">
      <label :for="option.name">{{option.label}}</label>
      <input
        type="radio"
        :name="radioOptions.name"
        :value="option.name"
        :id="option.name"
        v-model="checked"
        @change="onRadioChange"
      >
    </span>
  </div>
</template>

<script>
export default {
  name: "RadioOptions",
  props: {
    radioOptions: {}
  },
  data() {
    return {
      checked: this.radioOptions.options[0].name
    };
  },
  methods: {
    onRadioChange(e) {
      this.$emit("radioChange", this.checked);
    }
  }
};
</script>

<style scoped>
div {
  text-align: center;
  background: white;
  max-width: 280px;
  padding: 0.5em 0;
  border-radius: 5px;
  margin: 0 auto;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.radio-option {
  margin: 0 1em;
}

label {
  margin-right: 0.5em;
}
input {
  position: relative;
  top: -1px;
}
</style>
