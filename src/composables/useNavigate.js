import { useRouter } from 'vue-router';

export default function useNavigate() {
    const router = useRouter();

    function goToPage (path) {
        router.push(path)
    };

    return {
        goToPage
    }
}