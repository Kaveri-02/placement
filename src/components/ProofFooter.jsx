import React from 'react'

const ProofFooter = () => {
    const items = [
        { label: "UI Built", checked: false },
        { label: "Logic Working", checked: false },
        { label: "Test Passed", checked: false },
        { label: "Deployed", checked: false },
    ]

    return (
        <div className="kn-proof-footer">
            <div className="kn-container">
                <div className="kn-footer-content">
                    <span className="kn-footer-label">Proof Checklist:</span>
                    <div className="kn-checklist">
                        {items.map((item, i) => (
                            <div key={i} className="kn-checklist-item">
                                <input type="checkbox" readOnly checked={item.checked} id={`check-${i}`} />
                                <label htmlFor={`check-${i}`}>{item.label}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
        .kn-proof-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 64px;
          background: #FFFFFF;
          border-top: 1px solid var(--kn-border);
          display: flex;
          align-items: center;
          z-index: 100;
        }
        .kn-footer-content {
          display: flex;
          align-items: center;
          gap: var(--kn-space-40);
        }
        .kn-footer-label {
          font-size: 14px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgba(17, 17, 17, 0.4);
        }
        .kn-checklist {
          display: flex;
          gap: var(--kn-space-24);
        }
        .kn-checklist-item {
          display: flex;
          align-items: center;
          gap: var(--kn-space-8);
          font-size: 14px;
          font-weight: 500;
        }
        .kn-checklist-item input[type="checkbox"] {
          width: 16px;
          height: 16px;
          accent-color: var(--kn-accent);
        }
      `}</style>
        </div>
    )
}

export default ProofFooter
