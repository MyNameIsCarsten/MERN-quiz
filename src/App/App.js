import { useSelector } from 'react-redux';
import Answers from '../components/Answers/Answers';
import Navbar from '../components/Navbar/Navbar';
import Progressbar from '../components/Progressbar/Progressbar';
import Question from '../components/Question/Question';
import './App.css';
import Summary from '../components/Summary/Summary';

function App() {

  const isCompleted = useSelector((state) => state.app.isCompleted)

  if(!isCompleted){
    return (
      <div className="App">
        <Navbar />
        <div style={{overflow: 'auto'}}>
          <Question />
          <Answers />
        </div>
        <Progressbar />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Navbar />
        <Summary />
      </div>
    );
  }

  
}

export default App;
