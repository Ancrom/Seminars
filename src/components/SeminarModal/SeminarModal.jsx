import { useState } from "react";
import formatDateToLocal from "../../utils/dateUtils";
import "./SeminarModal.css";

const SeminarModal = ({ setIsModalOpen, id, onSubmit }) => {
  // Хранение нового семинара при редактировании
  const [newSeminar, setNewSeminar] = useState({});

  const onEdit = (e) => {
    let key = e.target.name;
    let value = e.target.value;

    // Форматирование даты в локальный формат
    if (key === "date") {
      value = formatDateToLocal(e.target.value);
    }
    setNewSeminar((prevSeminar) => ({ ...prevSeminar, [key]: value }));
  };

  const closeModal = (e) => {
    if (e.target.classList.contains("seminar-modal")) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="seminar-modal" onClick={closeModal}>
      <div className="seminar-modal__body">
        <h1 className="seminar-modal__title">Редактировать семинар</h1>
        <form action="" className="seminar-modal__form form">
          <input
            className="form__input"
            type="text"
            placeholder="Название семинара"
            name="title"
            onChange={onEdit}
          />
          <textarea
            className="form__textarea"
            name="description"
            placeholder="Описание семинара"
            onChange={onEdit}
          ></textarea>
          <input
            type="text"
            className="form__input"
            placeholder="URL изображения"
            name="photo"
            onChange={onEdit}
          />
          <input
            className="form__input"
            type="date"
            name="date"
            onChange={onEdit}
          />
          <input
            className="form__input"
            type="time"
            name="time"
            onChange={onEdit}
          />
          <button
            className="form__btn btn"
            onClick={(e) => {
              e.preventDefault();
              onSubmit(newSeminar, id);
            }}
          >
            Сохранить
          </button>
        </form>
        <button
          className="seminar-modal__btn btn btn--close"
          onClick={() => setIsModalOpen(false)}
        >
          <span>✖</span>
        </button>
      </div>
    </div>
  );
};

export default SeminarModal;
