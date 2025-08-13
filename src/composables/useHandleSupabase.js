
export default function useHandleSupabase() {

    function getHashParamsObject(routeHash) {
        const params = new URLSearchParams(routeHash.slice(1));
        return Object.fromEntries(params.entries());
    }

    return {
        getHashParamsObject,
    }
}