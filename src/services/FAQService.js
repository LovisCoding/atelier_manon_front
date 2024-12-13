
import api from "../utils/api";

export const getQuestions = async () => {
    const data = await api
        .get('/api/question/get-questions')
    if (data.data) return data.data
    return null;
}

export const getQuestionsAdmin = async () => {
    const data = await api
        .get('/api/admin/question/get-questions')
    if (data.data) return data.data
    return null;
}


export const getQuestionsById = async (id) => {
    try {
      const response = await api.get(`/api/question/get-question?idQuestion=${id}`);
      if (response.data) return response.data;
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération de la question:', error);
      return null;
    }
};

export const updateQuestion = async (question) => {
    try {
        const response = await api.post(
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

export const addQuestion = async (question) => {
    return api.post("/api/client/question/add-update-question", {
        reponse: "",
        contenu: question,
        idQuestion: -1
    })
    .then((res) => {
        if (res.status == 201 || res.status == 200) return true;
        return false;    
    })
    .catch((err) => {
        return false;
    })
}

export const deleteQuestion = async (id) => {
    try {
        const response = await api.delete(`/api/admin/question/delete-question`, {
            data: { idQuestion: id },
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.data) return response.data;
        return null;
    } catch (error) {
        console.error('Erreur lors de la suppression de la question:', error);
        return null;
    }
};