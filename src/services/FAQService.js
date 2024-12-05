

import axios from 'axios';


export const getQuestions = async () => {
    const data = await axios
        .get('/api/question/get-questions')
    if (data.data) return data.data
    return null;
}


