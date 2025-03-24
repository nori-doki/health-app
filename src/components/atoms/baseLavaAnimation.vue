<template>
    <div class="container">
        <div class="main"></div>
        <div class="footer">
            <div class="bubbles">
        </div>
    </div>

    <svg style="position: fixed; top: 0;">
        <defs>
            <filter id="blob">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="blob"></feColorMatrix>
            </filter>
        </defs>
    </svg>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

onMounted(() => {                
    for (let i = 0; i < 80; i++) {
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.style = `--size:${2 + Math.random() * 3}rem; 
        --distance:${10 + Math.random() * 20}rem; 
        --position:${-5 + Math.random() * 100}%; 
        --time:${3 + Math.random() * 7}s; 
        --delay:${-1 * (2 + Math.random() * 2)}s;`;
        document.querySelector(".bubbles").appendChild(bubble);
    }
})

</script>

<style lang="scss">

.container{
    width: 110%;
    position: absolute;
    bottom: -100px;
    .footer {
        z-index: 1;
        display:grid;
        position: relative;
        grid-area: footer;
        height:6rem;
        .bubbles {
            position: absolute;
            top:0;
            left:0;
            right:0;
            height:1rem;
            background: $base-gradient;
            filter:url("#blob");
            height: fit-content;
            .bubble {
                position: absolute;
                left:var(--position, 50%);
                background: $base-gradient;
                border-radius:100%;
                animation:bubble-size var(--time, 4s) ease-in infinite var(--delay, 0s),
                    bubble-move var(--time, 5s) ease-in infinite var(--delay, 0s);
                transform:translate(-50%, 100%);
            }
        }
        .content {
            z-index: 2;
            display:grid;
            grid-template-columns: 1fr auto;
            grid-gap: 4rem;
            padding:2rem;
        }
    }
}

@keyframes bubble-size {
    0%, 75% {
        width:var(--size, 4rem);
        height:var(--size, 4rem);
    }
    100% {
        width:0rem;
        height:0rem;
    }
}
@keyframes bubble-move {
    0% {
        bottom:0rem;
    }
    100% {
        bottom:var(--distance, 10rem);
    }
}

</style>