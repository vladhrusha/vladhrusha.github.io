import React from 'react'
import logo from './logo.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { JobList } from './components/pages/JobList'
import './App.css'
import { JobDetailed } from './components/pages/JobDetailed'

function App() {
  return (
    <div className="App">
      <div className="main">
        <Router>
          <Routes>
            <Route path="/JobList" element={<JobList />}></Route>
            <Route path="/JobDetailed" element={<JobDetailed />}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App
