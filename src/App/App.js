import Answers from '../components/Answers/Answers';
import Navbar from '../components/Navbar/Navbar';
import Progressbar from '../components/Progressbar/Progressbar';
import Question from '../components/Question/Question';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Question />
      <Answers />
      <Progressbar />
    </div>
  );
}

export default App;
