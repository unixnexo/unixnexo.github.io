<script setup>
const props = defineProps({
    // in pixels
    size: {
        type: String,
        default: '22'
    }
});
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48" :style="{ width: `${size}px`, height: `${size}px`}" class="select-none touch-none cursor-pointer">
        <g id="Layer_1"><linearGradient id="SVGID_1__17KMxiQaWhwG_gr1" x1="6.001" x2="22.807" y1="29.396" y2="29.396" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#33bef0"></stop><stop offset="1" stop-color="#22a5e2"></stop></linearGradient><path fill="url(#SVGID_1__17KMxiQaWhwG_gr1)" d="M22.8,24.5l-3.5,12.1c-3-2.1-6.3-3.7-13.3-0.8l3.4-11.9l0,0C16.4,20.9,19.8,22.4,22.8,24.5z"></path><linearGradient id="SVGID_00000064344804604185625220000003582743550301639556__17KMxiQaWhwG_gr2" x1="39.149" x2="17.839" y1="32.84" y2="32.84" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fede00"></stop><stop offset="1" stop-color="#ffd000"></stop></linearGradient><path fill="url(#SVGID_00000064344804604185625220000003582743550301639556__17KMxiQaWhwG_gr2)" d="M24.6,25.7l-3.4,11.9 c3,2.1,6.4,3.7,13.4,0.8l3.3-11.6C30.8,29.2,27.7,27.7,24.6,25.7z"></path><linearGradient id="SVGID_00000067194281375023334940000000214048285996100276__17KMxiQaWhwG_gr3" x1="10.011" x2="26.828" y1="15.169" y2="15.169" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f44f5a"></stop><stop offset=".443" stop-color="#ee3d4a"></stop><stop offset="1" stop-color="#e52030"></stop></linearGradient><path fill="url(#SVGID_00000067194281375023334940000000214048285996100276__17KMxiQaWhwG_gr3)" d="M23.4,22.3l3.4-12 c-3-2.1-6.4-3.7-13.4-0.8l-3.4,12c2.8-1.2,5-1.7,6.8-1.7C19.6,19.9,21.6,21.1,23.4,22.3z"></path><linearGradient id="SVGID_00000104673114758685606420000016406648196720083331__17KMxiQaWhwG_gr4" x1="35.787" x2="19.822" y1="18.835" y2="18.835" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#21ad64"></stop><stop offset="1" stop-color="#088242"></stop></linearGradient><path fill="url(#SVGID_00000104673114758685606420000016406648196720083331__17KMxiQaWhwG_gr4)" d="M28.6,11.6l-3.4,12 c3,2.1,6.7,3.8,13.4,0.7l3.4-12C35,15.3,31.7,13.7,28.6,11.6z"></path></g>
    </svg>
</template>