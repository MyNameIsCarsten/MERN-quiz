import { useSelector, useDispatch } from 'react-redux';
import './Settings.css';
import { toggleRandomize } from './settingsSlice';
import { Link } from 'react-router-dom';
import { fetchQuiz } from '../Quiz/quizSlice';

const Settings = () => {
  const dispatch = useDispatch();
  const randomize = useSelector((state) => state.settings.randomize);
  const userId = useSelector((state) => state.app.userId);

  const handleChange = (e) => {
    dispatch(toggleRandomize());
  };

  const clickHandler = (e) => {
    e.preventDefault();
    if(randomize === true){
        dispatch(fetchQuiz({id : userId, shuffle : randomize}));
    } else {
        dispatch(fetchQuiz(userId));
    }
  }

  return (
    <div>
      <form id="settingsForm" data-testid='settings'>
        <label htmlFor="randomize">Randomize Quiz:</label>
        <div id="randomizeDiv">
          <input
            type="radio"
            id="yes"
            name="randomize"
            value="true"
            checked={randomize}
            onChange={handleChange}
          />
          <label htmlFor="yes">Yes</label>
          <input
            type="radio"
            id="no"
            name="randomize"
            value="false"
            checked={!randomize}
            onChange={handleChange}
          />
          <label htmlFor="no">No</label>
        </div>
        <button onClick={clickHandler}>
            <Link to="/">Submit Settings</Link>
        </button>
      </form>
    </div>
  );
};

export default Settings;
