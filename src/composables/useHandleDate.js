
export default function useHandleDate() {
    function timestampToDay (timestamp) {
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        return `${day}`;
    };

    function getDateInTimestamp(date) {
        return Math.floor(date.getTime() / 1000);
    }

    return {
        timestampToDay,
        getDateInTimestamp
    }
}