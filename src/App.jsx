import './App.css';
import Scoreboard from './kyorugi/scoreboard/scoreboard';
import Remote from './kyorugi/remote/remote';
import NewMatch from './kyorugi/newMatch/newMatch';

export default function App() {
  return (
    <div className="App">
      <NewMatch />
      <Scoreboard />
      <Remote />
    </div>
  );
}
