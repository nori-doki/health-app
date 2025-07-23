<template>
    <div class="about">
        <h1>{{ title }}</h1>
        <p v-html="introduction"></p>
        <a class="about-item" v-for="item in socialMediaLinks" :key="item.name" :href="item.url" target="_blank">
            <img :src="item.img"/>
            <p>{{ item.name }}</p>
        </a>
        <p></p>
    </div>
</template>

<script setup>
import noridoki from '@/assets/noridoki.gif';

const title = "Thanks for (considering) using 80to100 ❤️";
const introduction = "I am a junior software engineer and this is my first personal project. <br><br> Feel free to contact me :";
const socialMediaLinks = [  
    { name: "twitter", url: "https://x.com/norid0ki", img: "src/assets/icons/twitter-icon.png" },
    { name: "portfolio", url: "https://nori-doki.github.io/", img: "src/assets/icons/globe-icon.png" },
    { name: "linkedin", url: "https://www.linkedin.com/in/ines-a-d/", img: "src/assets/icons/linkedin-square-icon.png" },
]
const myStory = "At 29, I have spent more than half of my life displeased with my body trying to lose weight. I have tried over many times, succeeded sometimes. My issue is that I am not consistent. I have found what works for me but it demands so much investment in time and energy that I am not able to keep it up. I needed to find a way to make it easier for myself and others to stay consistent with their health goals. Go back to the basics. I know what I should eat, I know I can cheat sometimes, I know how often I should excerise, I just need an easy way to know if I'm doing enough or slacking. This is why I created 80to100, a simple app that helps you track your progress and stay motivated.";

</script>

<style lang="scss">
.about {
    padding: 1.5rem;
    text-align: center;
    &-item {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 2rem;
        img {
            width: 2rem;
            height: 2rem;
            margin-right: 0.5rem;
        }
    }
}

</style>