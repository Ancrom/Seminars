import { useEffect, useState } from "react";
import { getSeminars, updateSeminar } from "../../services/SeminarService";
import Seminar from "../Seminar/Seminar";
import SeminarModal from "../SeminarModal/SeminarModal";
import "./SeminarsBody.css";

const SeminarsBody = () => {
  const [seminars, setSeminars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    getSeminars()
      .then((data) => setSeminars(data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  const onSubmit = async (newData, id) => {
    try {
      const newSeminar = await updateSeminar(id, newData);

      setSeminars((prevSeminars) =>
        prevSeminars.map((item) => (item.id === id ? { ...newSeminar } : item))
      );

      setIsModalOpen(false);
    } catch (err) {
      console.log("Ошибка обновления данных", err);
    }
  };

  const onDelete = (id) => {
    setSeminars((prevSeminars) =>
      prevSeminars.filter((item) => item.id !== id)
    );
  };

  if (isLoading) return <div>Загрузка семинаров...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className="seminars">
        {seminars.map((item) => (
          <Seminar
            key={item.id}
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
