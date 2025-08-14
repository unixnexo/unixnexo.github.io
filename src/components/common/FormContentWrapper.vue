<script setup></script>

<template>
    <div class="relative shadow-lg border border-black dark:border-white rounded-md p-3 pb-4">
        <div class="absolute top-0 right-0 p-1.5 border-l border-b border-black dark:border-white rounded-tr-md rounded-bl-3xl">
            <slot name="idHeader"></slot>
        </div>
        <div class="w-[90%]">
            <slot name="inputBody"></slot>
            <div class="space-x-3 mt-4">
                <slot name="btnFooter"></slot>
            </div>
        </div>
    </div>
</template>