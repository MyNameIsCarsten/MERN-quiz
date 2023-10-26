import Navbar from '../components/Navbar/Navbar';
import Progressbar from '../components/Progressbar/Progressbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <p id='question'>Hello World</p>
      <Progressbar />
    </div>
  );
}

export default App;
