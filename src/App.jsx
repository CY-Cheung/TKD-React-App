import './App.css';
import Scoreboard from './kyorugi/scoreboard/scoreboard';
import Remote from './kyorugi/remote/remote';

export default function App() {
  return (
    <div className="App">
      <Scoreboard />
      <Remote />
      {/* <SelectMatch /> */}
    </div>
  );
}
