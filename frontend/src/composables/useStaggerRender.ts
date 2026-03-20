import { ref, onMounted } from 'vue';

export function useStaggerRender(totalElements: number, delayMs: number = 100) {
    const showElements = ref<boolean[]>(Array(totalElements).fill(false));

    onMounted(() => {
        showElements.value.forEach((_, index) => {
            setTimeout(() => {
                showElements.value[index] = true;
            }, index * delayMs);
        });
    });

    return {
        showElements
    };
}