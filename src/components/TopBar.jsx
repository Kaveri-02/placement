import React from 'react'

const TopBar = ({ projectName = "KodNest Premium Build System", step = 1, totalSteps = 8, status = "In Progress" }) => {
    return (
        <div className="kn-top-bar">
            <div className="kn-top-bar-left">
                <span className="kn-project-name">{projectName}</span>
            </div>
            <div className="kn-top-bar-center">
                <span className="kn-progress">Step {step} / {totalSteps}</span>
            </div>
            <div className="kn-top-bar-right">
                <span className={`kn-status-badge kn-status-${status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {status}
                </span>
            </div>

            <style jsx>{`
        .kn-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 var(--kn-space-24);
          height: 64px;
          border-bottom: 1px solid var(--kn-border);
          background: #FFFFFF;
        }
        .kn-project-name {
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .kn-progress {
          color: rgba(17, 17, 17, 0.5);
          font-size: 14px;
        }
        .kn-status-badge {
          font-size: 12px;
          font-weight: 500;
          padding: 4px 12px;
          border-radius: 100px;
          border: 1px solid var(--kn-border);
        }
        .kn-status-in-progress {
          background: #FEF3C7;
          color: #92400E;
          border-color: #FDE68A;
        }
        .kn-status-shipped {
          background: #DCFCE7;
          color: #166534;
          border-color: #BBF7D0;
        }
        .kn-status-not-started {
          background: #F3F4F6;
          color: #374151;
        }
      `}</style>
        </div>
    )
}

export default TopBar
