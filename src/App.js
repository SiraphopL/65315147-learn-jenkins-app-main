import './App.css';

function App() {
  const handleClick = () => {
    alert("ขอบคุณที่กดเข้ามาดูครับ! 😊");
  };

  return (
    <div className="App">
      <h1>👋 สวัสดีครับ ผมชื่อสิรภพ</h1>
      <p>นี่คือเว็บพอร์ตโฟลิโอง่าย ๆ ที่ทำด้วย React + Jenkins CI/CD</p>
      <button onClick={handleClick}>กดเพื่อทักทาย</button>
    </div>
  );
}

export default App;