<template>
    <div class="method pink-background-2" id="top">
        <h1 class="method-title big-title">The 80to100 Method</h1>
        <div class="method-section">
            <div v-for="(question, index) in questions" class="method-summary subtitle" :key="index"
            @click="scrollToSection(index)">
                {{ question.title }}
            </div>
        </div>
        <div v-for="(question, index) in questions" class="method-section" :id="`${index}`" :key="index">
            <h2 class="title"> {{ question.title }}</h2>
            <DotLottieVue style="height: 200px; width: 200px" autoplay loop :src="question.illustration" />
            <div>
                <p v-for="paragraph in question.content">
                    {{ paragraph }}
                </p>
            </div>
        </div>
        <DotLottieVue class="method-button" style="height: 100px; width: 100px" autoplay loop src="https://lottie.host/3da3f52f-e450-4c07-88aa-556bf754a262/lehp2KOC0x.json" @click="scrollToSection('top')" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

const questions = ref([
    {
        title : "What is 80to100 ?",
        content : [
            "80to100 is a health focused habit tracking SaaS made to help you maintain healthy and balanced habits.",
            "Log in daily, track your habits in less than 30 seconds and check your daily and weekly scores."
        ],
        illustration: "https://lottie.host/a3c53c93-168d-4953-91bc-bd98ab180925/Xv9c8YJK7Q.json",
        id: "1"
    },
    {
        title : "Why following the 80/20 rule ?",
        content : [
            "When it comes to losing weight or simply maintaining a healthy lifestyle, the 80/20 rule is a great way to stay on track.",
            "The 80/20 rule is a simple concept that suggests that to reach your health goals, you do not need to eat clean and excercise every single day.",
            "We believe it is a a matter of balance and regularity. The 80/20 rule is a great way to achieve this balance.",
            "In the context of weight loss, 100% efforts would mean all meals should be clean, you should have one workout session and probably walk a certain amount of steps. However, this is not sustainable for most people.",
            "Focusing on being strict only 80% of the time means that you can enjoy your favorite foods in moderation, while still making sure that you are getting the nutrients your body needs to function properly.",
            "By following the 80/20 rule, you can create a sustainable and balanced approach to healthy eating that works for you. This can help you to avoid feeling deprived or restricted, which can often lead to binge eating or unhealthy habits.",
        ],
        illustration: "https://lottie.host/ca71d134-0b07-472a-bc9e-538339d33dbc/yWM9H2ydDL.json"
    },
    {
        title : "What should I eat ?",
        content : [
            "This app is not meant to tell you what to eat, but rather to help you track your habits and make sure you are on the right track.",
            "We believe that if you are here, you probably know what you should be eating and what you should not be eating.",
            "However, if you are looking for some inspiration, we recommend focusing on whole foods, such as fruits, vegetables, whole grains, lean proteins, and healthy fats.",
            "Many studies suggest a mediterranean diet and/or anti-inflammatory diet can be beneficial for overall health and well-being.",
            "Make sure to eat enough protein, fiber, and healthy fats to keep you feeling full and satisfied.",
            "It is also important to stay hydrated and drink plenty of water throughout the day.",
            "If you are looking for more specific advice, we recommend consulting a registered dietitian or nutritionist who can help you create a personalized plan that works for you.",
        ],
        illustration: "https://lottie.host/39497b36-f6cc-4020-8356-addddbad3f14/XPcSpIe1X3.json"
    },
    {
        title : "Why track physical activity ?",
        content : [
            "Physical activity is an important part of a healthy lifestyle and can help you to maintain a healthy weight, improve your mood, and reduce your risk of chronic diseases.",
            "Regular physical activity can also help you to sleep better, boost your energy levels, and improve your overall quality of life.",
            "Moreover, if you messed a little bit with your diet, physical activity can help you to burn off those extra calories, get back on track and improve your daily score.",
            "We recommend finding an activity that you enjoy and that fits into your lifestyle, whether it's going for a walk, running, cycling, swimming, or lifting weights.",
            "The key is to find something that you enjoy and that you can stick to in the long term.",
            "We also recommend getting a mix of cardio and strength training, as both are important for overall health and well-being.",
            "We included a step tracker because walking is one of the easiest and most accessible forms of physical activity, and it can be a great way to get started with regular exercise. However, if walking enough is not a goal for you, you can simply ignore it.",
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
.method {
    // height: 100vh;
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