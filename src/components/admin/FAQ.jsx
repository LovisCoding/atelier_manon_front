import React, { useState } from 'react';

const FoireAuxQuestions = () => {
  const [faqList, setFaqList] = useState([
    { question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis ?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis' },
    { question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis ?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis' },
    { question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis ?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis' },
    { question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis ?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis' },
    { question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis ?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque dignissim felis' }
  ]);

  const handleNewFaq = () => {
    setFaqList([
      ...faqList,
      { question: 'Nouvelle question ?', answer: 'Nouvelle réponse' }
    ]);
  };

  const handleDelete = () => {
    setFaqList(faqList.filter(faq => !faq.isSelected));
  };

  const handleSelect = (index) => {
    const updatedFaqList = [...faqList];
    updatedFaqList[index].isSelected = !updatedFaqList[index].isSelected;
    setFaqList(updatedFaqList);
  };

  return (
    <div className="faq-container">
      <h1>Foire aux questions</h1>
      <div className="faq-actions">
        <button onClick={handleNewFaq}>nouveau</button>
        <button onClick={handleDelete}>delete</button>
      </div>
      <div className="faq-list">
        {faqList.map((faq, index) => (
          <div key={index} className="faq-item">
            <input
              type="checkbox"
              checked={faq.isSelected || false}
              onChange={() => handleSelect(index)}
            />
            <div className="faq-question">
              <p>{faq.question}</p>
            </div>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoireAuxQuestions;