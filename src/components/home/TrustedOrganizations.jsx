import './TrustedOrganizations.css';

export default function TrustedOrganizations() {
  const orgs = [
    "National Bank",
    "Cairo University",
    "Health Ministry",
    "Vodafone Egypt",
    "Banque Misr",
    "Alexandria Port",
    "Egyptian Post",
    "CIB Bank"
  ];

  return (
    <section className="trusted-section">
      <div className="trusted-container">
        <p className="trusted-title">TRUSTED BY LEADING ORGANIZATIONS</p>
        <div className="trusted-logos-bar">
          {orgs.map((org, index) => (
            <span key={index} className="organization-name">{org}</span>
          ))}
        </div>
      </div>
    </section>
  );
}