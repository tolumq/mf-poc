<template>
    <p>Hello World</p>
    <p>and others</p>
    <Input />
    <ReactWrapper text="Welcome home" type="button" url="http://localhost:8081/RemoteEntry.js" scope="home" module="./Button" />
</template>
<script setup lang="ts">
import Input from "./Input.vue";
// import Layout from "./Layout.vue";
import ReactWrapper from "../federation/ReactWrapper.vue"


console.log(":HELLO WORD!!!!!!!");
</script>