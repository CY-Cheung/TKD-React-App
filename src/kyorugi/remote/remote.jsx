import './remote.css';
import Button from '../../components/button/button';

function Remote() {
  return (
    <div className="Remote">
      <div className="Left">
        <div className="Col145">
          <Button label="5" color="var(--red-bg-color)" />
          <Button label="4" color="var(--red-bg-color)" />
          <Button label="1" color="var(--red-bg-color)" />
        </div>
        <div className="Col23">
          <Button label="3" color="var(--red-bg-color)" />
          <Button label="2" color="var(--red-bg-color)" />
        </div>
      </div>
      <div className="Right">
        <div className="Col23">
          <Button label="3" color="var(--blue-bg-color)" />
          <Button label="2" color="var(--blue-bg-color)" />
        </div>
        <div className="Col145">
          <Button label="5" color="var(--blue-bg-color)" />
          <Button label="4" color="var(--blue-bg-color)" />
          <Button label="1" color="var(--blue-bg-color)" />
        </div>
      </div>
    </div>
  );
}

export default Remote;