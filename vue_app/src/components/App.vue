<template>
    <p>Hello World</p>
    <p>and others</p>
    <Input />
    <ReactWrapper reactWrapperName="button" text="Hello World" type="button" @click="handleClick" classes="" />
</template>
<script setup lang="ts">
import Input from "./Input.vue";
import ReactWrapper from "../federation/ReactWrapper.vue"
import { SharedComponents } from "src/federation/utils";

const handleClick = () => {
    console.log(":HELLO WORD!!!!!!!");
    alert("I got clicked")
}


</script>