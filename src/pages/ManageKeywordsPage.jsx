import styles from "./ManageKeywordsPage.module.css";
import GoBack from "../components/GoBack.jsx";

export default function ManageKeywordsPage() {
    return (
        <div className="container">
            <div className = "managekeywordspage">
                <header className="managekeywordspage__header">
                    <GoBack title="관심 키워드 관리" />
                </header>
            </div>
        </div>
    );
}