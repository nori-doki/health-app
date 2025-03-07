import axios from "axios";

export class ScoreService {
    static async getDailyScores() {
        // const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/scores/daily/${date}`);
        const response = {
            data : [
                {
                    "_id": "entry-id-123",
                    "user_id": "user-id-123",
                    "date": "2024-11-20",
                    "meal_1": 20,
                    "meal_2": 10,
                    "meal_3": 10,
                    "snack": 0,
                    "steps": 10,
                    "workout": 0,
                    "daily_score": 50,
                    "created_at": "2024-11-20T12:00:00Z"
                },
                {
                    "_id": "entry-id-123",
                    "user_id": "user-id-123",
                    "date": "2024-11-21",
                    "meal_1": 20,
                    "meal_2": 20,
                    "meal_3": 20,
                    "snack": 10,
                    "steps": 10,
                    "workout": 0,
                    "daily_score": 80,
                    "created_at": "2024-11-21T12:00:00Z"
                },
                {
                    "_id": "entry-id-123",
                    "user_id": "user-id-123",
                    "date": "2024-11-22",
                    "meal_1": 20,
                    "meal_2": 20,
                    "meal_3": 20,
                    "snack": 10,
                    "steps": 10,
                    "workout": 10,
                    "daily_score": 90,
                    "created_at": "2024-11-22T12:00:00Z"
                }
            ]
        }
        return response.data;
    }

    static async getMonthlyScore(month) {
        const response = await axiosClient.get(`/scores/monthly/${month}`);
        return response.data;
    }

    static async recalculateScores() {
        const response = await axiosClient.post('/scores/recalculate');
        return response.data;
    }
}