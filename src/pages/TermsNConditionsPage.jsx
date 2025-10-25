import styles from "./TermsNConditionsPage.module.css";
import GoBack from "../components/GoBack.jsx";

export default function TermsNConditionsPage() {
    return (
        <div className="container">
            <div className = "termsnconditionspage">
                <header className="termsnconditionspage__header">
                    <GoBack title="약관" />
                </header>
            </div>
        </div>
    );
}