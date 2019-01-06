<template>
  <pre>
    <code>
      {{code}}
    </code>
  </pre>
</template>

<script>
export default {
  name: "CodeDisplay",
  props: {
    code: ""
  }
};
</script>

<style scoped>
pre {
  white-space: pre-wrap;
  padding: 0 50px;
  margin: 0 auto;
  max-width: 500px;
  border-radius: 5px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  background: white;
}
</style>
