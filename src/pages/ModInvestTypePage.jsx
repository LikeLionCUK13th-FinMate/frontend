import styles from "./ModInvestTypePage.module.css";
import GoBack from "../components/GoBack.jsx";

export default function ModInvestTypePage() {
    return (
        <div className="container">
            <div className = "modinvesttypepage">
                <header className="modinvesttypepage__header">
                    <GoBack title="투자 성향 수정" />
                </header>
            </div>
        </div>
    );
}