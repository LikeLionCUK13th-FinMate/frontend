import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import "./GoBack.css";

export default function GoBack({ title }) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="goback-header">
      <IoChevronBackOutline
        className="goback"
        onClick={goBack}
        aria-label="뒤로 가기"
        title="뒤로 가기"
      />
      <h1 className="goback-title">{title}</h1>
    </div>
  );
}