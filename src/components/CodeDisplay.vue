<template>
  <pre class="component component--code-display"><button
  v-if="!isCopied"
  v-clipboard="() => code"
  v-clipboard:success="onClipboardSuccess"
>Copy to clipboard</button><button
  v-if="isCopied"
  class="button-inactive"
>Copied!</button><code>{{code}}</code></pre>
</template>

<script>
export default {
  name: "CodeDisplay",
  props: {
    code: String
  },
  data() {
    return {
      isCopied: false
    };
  },
  methods: {
    onClipboardSuccess() {
      this.isCopied = true;
    }
  },
  watch: {
    // When 'code' changes, set isCopied to false so user can copy again
    code() {
      this.isCopied = false;
    }
  }
};
</script>