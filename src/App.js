import React, { useState } from 'react';
import './App.css';

function App() {
  const [showProjects, setShowProjects] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>👩‍🎓 นิสิต: 65315147 นายสิรภพ เล็กกเลิศสุนทร</h1>
        <p>คณะวิทยาศาสตร์ สาขาวิทยาการคอมพิวเตอร์</p>
        <button onClick={() => setShowProjects(!showProjects)}>
          {showProjects ? 'ซ่อนโปรเจกต์ 👀' : 'แสดงโปรเจกต์ 📂'}
        </button>
      </header>

      {showProjects && (
        <section className="section fade-in">
          <h2>💻 โปรเจกต์ที่เคยทำ</h2>
          <ul>
            <li>🧠 ระบบ Quiz ออนไลน์ด้วย React + Node.js</li>
            <li>🚀 CI/CD Pipeline ด้วย Jenkins + Netlify</li>
            <li>📊 Dashboard แสดงพฤติกรรมในห้องเรียนด้วย AI</li>
          </ul>
        </section>
      )}

      <section className="section">
        <h2>📫 ติดต่อ</h2>
        <p>Email: siraphopl65@nu.ac.th</p>
        <p>GitHub: <a href="https://github.com/SiraphopL" target="_blank" rel="noopener noreferrer">SiraphopL</a></p>
      </section>

      <footer>
        <p>© 2025 Siraphop L. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;