import logo from './logo.svg';
import './App.css';
import src from './moita.mp3';


function App() {
  return (
      <div className="body">
        <div className="top-nav"></div>
        <div className="middle-nav"></div>
        <div className="bottom-nav">
          <audio src={src} controls>
          </audio>
        </div>
      </div>
  );
}

export default App;
