import { useEffect, useState } from "react";
import {
  getSeminars,
  updateSeminar,
  removeSeminar,
} from "../../services/SeminarService";
import Seminar from "../Seminar/Seminar";
import SeminarModal from "../SeminarModal/SeminarModal";
import "./SeminarsBody.css";

const SeminarsBody = () => {
  const [seminars, setSeminars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(null); // ID семинара для редактирования

  useEffect(() => {
    // Загружаем список семинаров при первом рендере
    getSeminars()
      .then((data) => setSeminars(data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  const onSubmit = async (newData, id) => {
    try {
      const newSeminar = await updateSeminar(id, newData);

      // Обновляем только изменённый семинар в списке
      setSeminars((prevSeminars) =>
        prevSeminars.map((item) => (item.id === id ? { ...newSeminar } : item))
      );

      setIsModalOpen(false);
    } catch (err) {
      console.log("Ошибка обновления данных", err);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Вы действительно хотите удалить семинар?")) return;
    // Запрос на удаление
    try {
      await removeSeminar(id);

      setSeminars((prevSeminars) =>
        prevSeminars.filter((item) => item.id !== id)
      );
    } catch (err) {
      console.log("Ошибка удаления семинара", err);
    }
  };

  if (isLoading) return <div>Загрузка семинаров...</div>;

  if (error) {
    return (
      <div>
        <p>Ошибка загрузки: {error.message}</p>
        <button onClick={() => window.location.reload()}>
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="seminars">
        {seminars.map((item) => (
          <Seminar
            item={item}
            onDelete={onDelete}
            setId={setId}
            setIsModalOpen={setIsModalOpen}
          />
        ))}
      </div>
      {isModalOpen ? (
        <SeminarModal
          setIsModalOpen={setIsModalOpen}
          onSubmit={onSubmit}
          id={id}
        />
      ) : null}
    </>
  );
};

export default SeminarsBody;
