<script setup>
import {computed} from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "xs"
  }
})

const logoSize = computed(() => {
  return {
    xs: 'w-[24px] h-[24px]',
    sm: 'w-[32px] h-[32px]',
    md: 'w-[48px] h-[48px]',
    lg: 'w-[64px] h-[64px]',
    xl: 'w-[96px] h-[96px]',
    '2xl': 'w-[128px] h-[128px]',
    '3xl': 'w-[256px] h-[256px]',
  }[props.size.toString()]
})

</script>

<template>
  <svg :class="logoSize" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_193_98)">
      <path d="M2.19676 5.08117C6.90239 -1.58529 16.7482 -1.71509 21.6235 4.82828C24.8443 9.15101 24.7857 15.0928 21.4822 19.3527C16.5993 25.6492 7.04614 25.5282 2.32854 19.1069C-0.727344 14.9474 -0.779685 9.29792 2.19676 5.08117Z" fill="url(#paint0_radial_193_98)"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M21.6235 4.82827C16.7482 -1.71509 6.90239 -1.58529 2.19676 5.08117C2.15721 5.13719 2.1182 5.19346 2.07973 5.24999H11.2752C15.2552 5.24999 18.4815 8.47653 18.4815 12.4566C18.4815 16.4359 15.2564 19.6619 11.2775 19.6633L2.8081 19.7185C7.66791 25.5292 16.7594 25.4427 21.4822 19.3527C24.7857 15.0928 24.8443 9.15101 21.6235 4.82827ZM1.73882 18.2254L11.2701 18.1633L11.2726 18.1632H11.275C14.4266 18.1632 16.9815 15.6083 16.9815 12.4566C16.9815 9.30487 14.4267 6.75002 11.2752 6.75002H1.20977C0.742146 7.71008 0.410224 8.71777 0.213769 9.74537C1.67922 9.73966 3.14969 9.72961 4.62148 9.71944H4.62273C6.84374 9.70419 9.06784 9.68893 11.2771 9.68893C12.8066 9.68893 14.0427 10.9291 14.0427 12.4566C14.0427 13.9852 12.8036 15.2243 11.275 15.2243H0.439624C0.729507 16.2658 1.16265 17.2763 1.73882 18.2254ZM0.123802 13.7243H11.275C11.9751 13.7243 12.5427 13.1568 12.5427 12.4566C12.5427 11.7555 11.9762 11.1889 11.2771 11.1889C9.07343 11.1889 6.85414 11.2042 4.63178 11.2194L4.63033 11.2195H4.62996C3.09406 11.23 1.55671 11.2406 0.0238242 11.2461C-0.0282769 12.0727 0.00508912 12.9034 0.123802 13.7243Z" fill="url(#paint1_radial_193_98)"/>
    </g>
    <defs>
      <radialGradient id="paint0_radial_193_98" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15 6.5) rotate(132.709) scale(17.6918)">
        <stop stop-color="#6F00FF"/>
        <stop offset="1" stop-color="#A561FE"/>
      </radialGradient>
      <radialGradient id="paint1_radial_193_98" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(17.8295 7.37985) rotate(137.39) scale(38.3816)">
        <stop stop-color="white"/>
        <stop offset="0.15873" stop-color="#D4B3FF"/>
        <stop offset="0.31373" stop-color="#AF72FF"/>
        <stop offset="0.46373" stop-color="#6F00FF"/>
      </radialGradient>
      <clipPath id="clip0_193_98">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>

</template>


