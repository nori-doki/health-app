
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

    function getTodayInDDMMYYYY() {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
    
        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;
        return `${day}/${month}/${year}`
    }

    function getDateInDDMMYYYY(date) {
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
    
        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;
        return `${day}/${month}/${year}`;
    }

    return {
        timestampToDay,
        getDateInTimestamp,
        getTodayInDDMMYYYY,
        getDateInDDMMYYYY
    }
}