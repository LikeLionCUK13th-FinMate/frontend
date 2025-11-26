import styles from "./TermsNConditionsPage.module.css";
import GoBack from "../components/GoBack.jsx";

// 가상 약관 데이터
const termsData = [
    {
        title: "제 1조: 서비스 이용 약관 (필수)",
        content: [
            "본 서비스는 이용자의 금융 지식 증진을 목적으로 합니다. 이용자는 정확하고 최신의 정보를 제공받으며, 서비스 이용에 동의합니다.",
            "서비스를 통한 투자 결정 및 책임은 전적으로 이용자 본인에게 있으며, 제공된 정보는 참고용입니다.",
            "이용 약관을 위반하는 행위 발견 시, 서비스 이용이 제한될 수 있습니다."
        ]
    },
    {
        title: "제 2조: 개인정보 수집 및 이용 동의 (필수)",
        content: [
            "이용자의 관심 키워드 및 금융 지식 수준 정보는 맞춤형 콘텐츠 제공을 위해 수집 및 이용됩니다.",
            "수집된 개인 정보는 법률에 명시된 기간 동안 안전하게 보관되며, 목적 외 사용을 금합니다.",
            "이용자는 언제든지 개인 정보 수집 및 이용 동의를 철회할 수 있으나, 서비스 이용에 제약이 따를 수 있습니다."
        ]
    },
    {
        title: "제 3조: 컨텐츠 저작권 및 이용 정책 (선택)",
        content: [
            "서비스 내 모든 컨텐츠의 저작권은 회사에 있으며, 무단 복제 및 배포는 금지됩니다.",
            "이용자는 개인 학습 및 참고 목적으로 컨텐츠를 이용할 수 있습니다.",
            "컨텐츠를 외부 공유 시, 출처를 명확히 표기해야 합니다."
        ]
    },
];


export default function TermsNConditionsPage() {
    return (
        <div className="container">
            <div className={styles.pageContainer}>
                <header className={styles.header}>
                    <GoBack title="약관" />
                </header>
                
                <div className={styles.contentArea}>
                    {termsData.map((term, index) => (
                        <section key={index} className={styles.termSection}>
                            <h3 className={styles.termTitle}>{term.title}</h3>
                            
                            <div className={styles.termContent}>
                                {term.content.map((line, lineIndex) => (
                                    <p key={lineIndex} className={styles.termLine}>
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}