import styles from "./ModKnowledgeLevelPage.module.css";
import GoBack from "../components/GoBack.jsx";

export default function ModKnowledgeLevelPage() {
    return (
        <div className="container">
            <div className = "modknowledgelevelpage">
                <header className="modknowledgelevelpage__header">
                    <GoBack title="금융 지식 수준 수정" />
                </header>
            </div>
        </div>
    );
}