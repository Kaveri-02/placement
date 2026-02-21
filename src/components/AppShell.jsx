import React from 'react'
import TopBar from './TopBar'
import ContextHeader from './ContextHeader'
import ProofFooter from './ProofFooter'

const AppShell = ({ children }) => {
    return (
        <div className="kn-app-shell">
            <TopBar />

            <main className="kn-container">
                <ContextHeader />

                <div className="kn-layout-grid">
                    <section className="kn-primary-workspace">
                        {children}
                    </section>

                    <aside className="kn-secondary-panel">
                        <div className="kn-card kn-panel-content">
                            <h3>Step Explanation</h3>
                            <p style={{ marginTop: '16px', fontSize: '14px', color: 'rgba(17,17,17,0.7)' }}>
                                This is where you explain the current step of the build process. Keep it concise.
                            </p>

                            <div className="kn-prompt-box">
                                <code>Build a clean login page...</code>
                            </div>

                            <div className="kn-panel-actions">
                                <button className="kn-btn kn-btn-primary">Build in Lovable</button>
                                <button className="kn-btn kn-btn-secondary">Copy Prompt</button>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <ProofFooter />

            <style jsx>{`
        .kn-app-shell {
          min-height: 100vh;
          padding-bottom: 100px;
        }
        .kn-layout-grid {
          display: grid;
          grid-template-columns: 7fr 3fr;
          gap: var(--kn-space-40);
          align-items: start;
        }
        .kn-secondary-panel {
          position: sticky;
          top: var(--kn-space-40);
        }
        .kn-prompt-box {
          background: #F3F4F6;
          padding: var(--kn-space-16);
          border-radius: 4px;
          margin: var(--kn-space-24) 0;
          font-size: 13px;
        }
        .kn-panel-actions {
          display: flex;
          flex-direction: column;
          gap: var(--kn-space-16);
        }
        .kn-btn {
          padding: 12px 24px;
          border-radius: 4px;
          font-weight: 500;
          font-size: 14px;
          text-align: center;
        }
        .kn-btn-primary {
          background: var(--kn-accent);
          color: #FFFFFF;
          border: 1px solid var(--kn-accent);
        }
        .kn-btn-primary:hover {
          opacity: 0.9;
        }
        .kn-btn-secondary {
          background: transparent;
          color: var(--kn-text);
          border: 1px solid var(--kn-border);
        }
        .kn-btn-secondary:hover {
          background: rgba(17, 17, 17, 0.05);
        }
      `}</style>
        </div>
    )
}

export default AppShell
