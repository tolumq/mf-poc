<template>
    <article class="page-wrapper">
        <h1>Login</h1>
        <!-- we should use onsubmit but I need to show how our button can easily handle onClick events passed to it  -->
        <form class="form">
            <div class="">
                <ReactWrapper 
                    reactWrapperName="input" name="firstName"  :value="data.firstName"  :label="`First name: ${data.firstName}`" :required="true" 
                    inputType="text" :onChange="onChange" :classes="{wrapper: 'input-wrapper', label: 'input-label', input: 'input-input'}" />
            </div>
            <ReactWrapper 
                reactWrapperName="input" name="lastName" :value="data.lastName" :label="`Last name: ${data.lastName}`" :required="true" 
                inputType="text" :onChange="onChange" :classes="{wrapper: 'input-wrapper', label: 'input-label', input: 'input-input'}" />

            <ReactWrapper 
                reactWrapperName="input" name="password" :value="data.password" label="Password:" :required="true" 
                inputType="password" :onChange="onChange" :classes="{wrapper: 'input-wrapper', label: 'input-label', input: 'input-input'}" />

            <div class="button-wrapper">
                <ReactWrapper reactWrapperName="button" text="Login" type="button" :onClick="onClick" classes="button" />
            </div>
        
        </form>
    </article>
</template>
<script setup lang="ts">
import ReactWrapper from "../federation/ReactWrapper.vue"
import { reactive } from "vue";
import React from "react";

const onClick = () => {
    console.log("all the user provided data is: ", data);
    alert("I got clicked")
}

type UserData = {
    firstName: string;
    lastName: string;
    password: string;
}


const data = reactive<UserData>({
    firstName: "",
    lastName: "",
    password: ""
});


const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    data[name as keyof UserData] = value as string;
}


</script>
<style lang="css">
.page-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.form {
    border: 2px solid black;
    width: min(400px, 90%);
    padding: 2rem;
}
.input-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

.input-label {
    font-size: 0.95rem;
}

.input-input {
    width: 80%;
    height: 2rem;
    margin-top: 0.5rem;
    border: 1px solid black;
    padding: 0.25rem;
}

.button-wrapper {
    width: 80%;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
}

.button {
    justify-self: end;
}
</style>