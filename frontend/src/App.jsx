import { useState } from 'react'
import './App.css'

function App() {
    const [cell, setCell] = useState(null)

    async function generateCell() {
        const res = await fetch('http://localhost:3001/api/cells/generate', {
            method: 'POST'
        })
        const data = await res.json()
        setCell(data)
    }

    return (
        <div className="App">
            <h1>Cell Lab</h1>
            <button onClick={generateCell}>Generate New Cell</button>

            {cell && (
            <div className = "cell-display">
                <h2>{cell.name}</h2>
                <p><strong>Shape:</strong> {cell.shape}</p>
                <p><strong>Color:</strong> {cell.color.name}</p>
                <p><strong>Finish:</strong> {cell.finish.name}</p>
                <p><strong>Size:</strong> {cell.size}</p>
                <p><strong>Modifiers:</strong> {cell.modifiers.join(', ')}</p>
                </div>
                )}
        </div>
    )
}

export default App
