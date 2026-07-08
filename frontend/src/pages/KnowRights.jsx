import Layout from "../components/Layout";
import "../styles/dashboard.css";

function KnowRights() {

    const rights = [

        {
            title: "⚖️ Fair Collection Practices",
            description:
                "Banks and recovery agents must treat borrowers respectfully. They cannot threaten, harass, abuse, or intimidate borrowers while collecting loan dues."
        },

        {
            title: "📄 Settlement Agreement",
            description:
                "Before making any settlement payment, always request a written settlement agreement from your lender. Do not rely only on verbal promises."
        },

        {
            title: "✅ Right to NOC",
            description:
                "After repaying or settling your loan, ask for a No Objection Certificate (NOC) or Loan Closure Certificate to avoid future disputes."
        },

        {
            title: "📈 Credit Score Awareness",
            description:
                "A settled loan may impact your credit score. Paying EMIs on time and reducing outstanding debt can gradually improve your credit profile."
        },

        {
            title: "📞 Complaint & Grievance",
            description:
                "If your lender or recovery agent behaves unfairly, first file a complaint with the bank. If unresolved, you may escalate the issue through the RBI Integrated Ombudsman Scheme."
        },

        {
            title: "💡 Financial Tips",
            description:
                "Maintain an emergency fund, avoid unnecessary borrowing, track monthly expenses, and prioritize repayment of high-interest loans."
        }

    ];

    return (

        <Layout>

            <div className="dashboard">

                <div className="dashboard-header">

                    <div>

                        <h1>Know Your Rights</h1>

                        <p
                            style={{
                                color: "var(--text-secondary)",
                                marginTop: "8px"
                            }}
                        >
                            Learn about your legal rights, responsible borrowing practices, and financial awareness during loan repayment and settlement.
                        </p>

                    </div>

                </div>

                <div className="cards">

                    {

                        rights.map((item, index) => (

                            <div
                                key={index}
                                className="card"
                            >

                                <h3>
                                    {item.title}
                                </h3>

                                <p
                                    style={{
                                        lineHeight: "1.8",
                                        color: "var(--text-secondary)"
                                    }}
                                >
                                    {item.description}
                                </p>

                            </div>

                        ))

                    }

                </div>

            </div>

        </Layout>

    );

}

export default KnowRights;