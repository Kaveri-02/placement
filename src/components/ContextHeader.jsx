import React from 'react'

const ContextHeader = ({ title = "Development Workspace", subtitle = "Build and iterate on your product with intentionality." }) => {
    return (
        <div className="kn-context-header">
            <h1>{title}</h1>
            <p>{subtitle}</p>

            <style jsx>{`
        .kn-context-header {
          padding: var(--kn-space-64) 0 var(--kn-space-40) 0;
        }
        .kn-context-header h1 {
          font-size: 48px;
          margin-bottom: var(--kn-space-8);
          letter-spacing: -0.02em;
        }
        .kn-context-header p {
          font-size: 18px;
          color: rgba(17, 17, 17, 0.6);
        }
      `}</style>
        </div>
    )
}

export default ContextHeader
