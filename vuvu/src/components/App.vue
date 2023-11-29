<template>
    <p>Hello World</p>
    <p>and others</p>
    <Input />
<!--     
            text="Welcome home" 
            type="button"  -->
    <ReactWrapper reactWrapperName="button" text="Hello World" type="button" @click="() => {}" classes="" />

    <!-- text: string;
    type: "button" | "submit" | "reset";
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    classes: string; -->
</template>
<script setup lang="ts">
import Input from "./Input.vue";
import ReactWrapper from "../federation/ReactWrapper.vue"
import { SharedComponents } from "src/federation/utils";


console.log(":HELLO WORD!!!!!!!");
</script>