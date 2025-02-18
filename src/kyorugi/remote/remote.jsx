import './remote.css';
import Button from '../../components/button/button';

function Remote() {
  return (
    <div className="Remote">
      <div className="Left">
        <div className="Col145">
          <Button label="5" borderColor="var(--red-bg-color)" background="var(--red-pt-color)" />
          <Button label="4" borderColor="var(--red-bg-color)" background="var(--red-pt-color)" />
          <Button label="1" borderColor="var(--red-bg-color)" background="var(--red-pt-color)" />
        </div>
        <div className="Col23">
          <Button label="3" borderColor="var(--red-bg-color)" background="var(--red-pt-color)" />
          <Button label="2" borderColor="var(--red-bg-color)" background="var(--red-pt-color)" />
        </div>
      </div>
      <div className="Center">
        Remote Info
      </div>
      <div className="Right">
        <div className="Col23">
          <Button label="3" borderColor="var(--blue-bg-color)" background="var(--blue-pt-color)" />
          <Button label="2" borderColor="var(--blue-bg-color)" background="var(--blue-pt-color)" />
        </div>
        <div className="Col145">
          <Button label="5" borderColor="var(--blue-bg-color)" background="var(--blue-pt-color)" />
          <Button label="4" borderColor="var(--blue-bg-color)" background="var(--blue-pt-color)" />
          <Button label="1" borderColor="var(--blue-bg-color)" background="var(--blue-pt-color)" />
        </div>
      </div>
    </div>
  );
}

export default Remote;