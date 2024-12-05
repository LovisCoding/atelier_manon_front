import axios from 'axios';

export const getQuestions = async () => {
    const data = await axios
        .get('/api/question/get-questions')
    if (data.data) return data.data
    return null;
}

export const getQuestionsById = async (id) => {
    try {
      const response = await axios.get(`/api/question/get-question?idQuestion=${id}`);
      if (response.data) return response.data;
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération de la question:', error);
      return null;
    }
};

export const updateQuestion = async (question) => {
    try {
        const response = await axios.post(
            '/api/client/question/add-update-question',
            {
                idQuestion: question.idQuestion,
                contenu: question.contenu,
                reponse: question.reponse
            },
            { headers: { 'Content-Type': 'application/json' } }
        );
        if (response.data) return response.data;
        return null;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la question:', error);
        return null;
    }
};

export const deleteQuestion = async (id) => {
    try {
        const response = await axios.delete(`/api/question/delete-question`, {
            data: { idQuestion: id }, // Utilisation du champ 'data' dans le DELETE pour passer les paramètres
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.data) return response.data;
        return null;
    } catch (error) {
        console.error('Erreur lors de la suppression de la question:', error);
        return null;
    }
};