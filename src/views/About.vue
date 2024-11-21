<template>
    <div class="about pink-background" id="top">
        <BaseLogo class="about-logo" />
        <h1 class="about-title big-title">Frequently Asked Questions</h1>
        <div class="about-section">
            <div v-for="(question, index) in questions" class="about-summary subtitle" :key="index"
            @click="() => scrollToSection(index)">
                {{ question.title }}
            </div>
        </div>
        <div v-for="(question, index) in questions" class="about-section" :id="`${index}`" :key="index">
            <h2 class="title"> {{ question.title }}</h2>
            <DotLottieVue style="height: 200px; width: 200px" autoplay loop :src="question.illustration" />
            <div>
                <p v-for="paragraph in question.content">
                    {{ paragraph }}
                </p>
            </div>
        </div>
        <DotLottieVue class="about-button" style="height: 100px; width: 100px" autoplay loop src="https://lottie.host/3da3f52f-e450-4c07-88aa-556bf754a262/lehp2KOC0x.json" @click="() => scrollToSection('top')" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

const questions = ref([
    {
        title : "What is 80to100 ?",
        content : [
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore velit culpa molestiae ab exercitationem accusamus optio facere cupiditate dolores nobis suscipit minima id vitae, aspernatur, tempora iusto dolor saepe? Molestiae!",
            "Voluptatibus et neque facilis aspernatur nostrum. Quia obcaecati amet modi dolorem aut sit, sint sunt minima impedit odit temporibus id ex natus nostrum eum quod, nihil facere autem. Doloremque, ad?"
        ],
        illustration: "https://lottie.host/ca71d134-0b07-472a-bc9e-538339d33dbc/yWM9H2ydDL.json",
        id: "1"
    },
    {
        title : "Why following the 80/20 rule ?",
        content : [
            "Perspiciatis commodi repudiandae doloribus, consequuntur molestias tenetur. Non laboriosam cumque voluptates laudantium possimus vel pariatur culpa fuga in voluptas. Necessitatibus voluptas architecto suscipit quis minima doloremque a aut at aliquam?",
            "Cupiditate nisi totam consequuntur error obcaecati! Dolorum, neque aut. Velit maxime quod facilis temporibus magni, at aperiam quam dolore corporis laboriosam odit corrupti consequatur totam accusamus voluptatum numquam perspiciatis aliquam.",
            "Pariatur repellat et dignissimos ad magnam quibusdam non eos, minima quos in modi, ipsum a esse. Hic sed enim fuga quidem suscipit iste libero ipsa. Quidem deserunt ab beatae! Mollitia?"
        ],
        illustration: "https://lottie.host/39497b36-f6cc-4020-8356-addddbad3f14/XPcSpIe1X3.json"
    },
    {
        title : "what is lorem ipsum ?",
        content : [
            "Perspiciatis commodi repudiandae doloribus, consequuntur molestias tenetur. Non laboriosam cumque voluptates laudantium possimus vel pariatur culpa fuga in voluptas. Necessitatibus voluptas architecto suscipit quis minima doloremque a aut at aliquam?",
            "Cupiditate nisi totam consequuntur error obcaecati! Dolorum, neque aut. Velit maxime quod facilis temporibus magni, at aperiam quam dolore corporis laboriosam odit corrupti consequatur totam accusamus voluptatum numquam perspiciatis aliquam.",
            "Pariatur repellat et dignissimos ad magnam quibusdam non eos, minima quos in modi, ipsum a esse. Hic sed enim fuga quidem suscipit iste libero ipsa. Quidem deserunt ab beatae! Mollitia?"
        ],
        illustration: "https://lottie.host/a3c53c93-168d-4953-91bc-bd98ab180925/Xv9c8YJK7Q.json"
    },
    {
        title : "Why lorem ipsum ?",
        content : [
            "Perspiciatis commodi repudiandae doloribus, consequuntur molestias tenetur. Non laboriosam cumque voluptates laudantium possimus vel pariatur culpa fuga in voluptas. Necessitatibus voluptas architecto suscipit quis minima doloremque a aut at aliquam?",
            "Cupiditate nisi totam consequuntur error obcaecati! Dolorum, neque aut. Velit maxime quod facilis temporibus magni, at aperiam quam dolore corporis laboriosam odit corrupti consequatur totam accusamus voluptatum numquam perspiciatis aliquam.",
            "Pariatur repellat et dignissimos ad magnam quibusdam non eos, minima quos in modi, ipsum a esse. Hic sed enim fuga quidem suscipit iste libero ipsa. Quidem deserunt ab beatae! Mollitia?"
        ],
        illustration: "https://lottie.host/6c84863f-fced-4db9-8fa2-c7c12509ec5d/ZjPDglI4R2.json"
    }
])

function scrollToSection(id) {
    const element = document.getElementById(`${id}`);
    element.scrollIntoView({
        behavior: 'smooth'
    });
}

</script>

<style lang="scss">
.about {
    min-height: 100vh;
    padding: 10px 30px;
    position: relative;

    &-logo {
        margin: auto;
        scale: 0.8;
    }

    &-title {
        // font-size: $font-title-big;
        max-width: 800px;
        border-bottom: 2px black solid;
    }

    &-summary {
        cursor: pointer;
    }

    &-button {
        transform: rotate(180deg);
        fill: #5eff00;
        position: fixed;
        bottom: 0;
        right: 0;
    }

    &-section {
        max-width: 800px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin: 50px auto;
        padding: 20px 15px;
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 10px;

        p {
            margin-bottom: 15px;
        }
    }
}
</style>