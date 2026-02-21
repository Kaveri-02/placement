import React from 'react'
import AppShell from './components/AppShell'

function App() {
    return (
        <AppShell>
            <div className="kn-workspace">
                <h2 style={{ fontSize: '40px', marginBottom: '16px' }}>Project Workspace</h2>
                <p className="kn-text-block">
                    Welcome to the KodNest Premium Build System. This interaction space is designed for focus and productivity,
                    adhering to our "Calm, Intentional, and Coherent" design philosophy.
                </p>
            </div>
        </AppShell>
    )
}

export default App
