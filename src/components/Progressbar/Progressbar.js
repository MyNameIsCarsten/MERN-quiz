import './Progressbar.css';
import { nextQuestion } from '../../App/appSlice';
import { useDispatch, useSelector } from 'react-redux';

const Progressbar = () => {
  const dispatch = useDispatch();
  const hasSelected = useSelector((state) => state.app.hasSelected)

  function clickHandler() {
    console.log('Clicked')
    dispatch(nextQuestion());
  }

  return (
    <div data-testid='progressbar'>
      <footer>
        <div id='emptyProgress'></div>
        <p>Progressbar</p>
        <div id='buttonContainer'>
          <button data-testid='next' onClick={clickHandler} disabled={!hasSelected}>Next</button>
        </div>
      </footer>
    </div>
  )
}

export default Progressbar
