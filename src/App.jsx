import './App.css';
import Scoreboard from './kyorugi/scoreboard/scoreboard';
import Remote from './kyorugi/remote/remote';
import SelectMatch from './kyorugi/SelectMatch/SelectMatch';

export default function App() {
  return (
    <div className="App">
      <Scoreboard />
      <Remote />
      {/* <SelectMatch /> */}
    </div>
  );
}
