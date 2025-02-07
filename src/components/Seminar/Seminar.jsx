import { removeSeminar } from "../../services/SeminarService";
import "./Seminar.css";
import "../../assets/styles/button.css";

export default function Seminar({ item, onDelete, setId, setIsModalOpen }) {
  const handleDelete = async () => {
    if (window.confirm("Вы действительно хотите удалить семинар?")) {
      removeSeminar(item.id)
        .then(() => onDelete(item.id))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="seminar" key={item.id}>
      <div className="seminar__text-wrapper">
        <h2 className="seminar__title">{item.title}</h2>
        <p className="seminar__description">{item.description}</p>
        <p className="seminar__date">Дата начала: {item.date}</p>
        <p className="seminar__time">Время начала: {item.time}</p>
      </div>
      <img className="seminar__image" src={item.photo} alt={item.title} />
      <button className="seminar__btn btn btn--close" onClick={handleDelete}>
        <span>✖</span>
      </button>
      <button
        className="seminar__btn seminar__btn--edit"
        onClick={() => {
          setId(item.id);
          setIsModalOpen(true);
        }}
      >
        Редактировать
      </button>
    </div>
  );
}
