import { defineAsyncComponent } from 'vue';

export default function registerGlobalComponents(app) {
    const components = import.meta.glob('./components/{atoms,molecules,organisms}/**/*.vue');

    for (const path in components) {
        const componentName = path
        .split('/')
        .pop()
        .replace(/\.\w+$/, '');
        let componentNameUpperFirstChar = componentName.charAt(0).toUpperCase() + componentName.slice(1);
        app.component(componentNameUpperFirstChar, defineAsyncComponent(components[path]));
    }
}