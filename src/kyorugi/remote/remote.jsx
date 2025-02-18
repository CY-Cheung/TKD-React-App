import React, { useEffect, useState } from 'react';
import { doc, updateDoc, increment, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase/firebase';
import './remote.css';

function Remote() {
  const [redScore, setRedScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);

  // 監聽分數變化
  useEffect(() => {
    const scoreRef = doc(db, "MATCH A1001", "ROUND 1");
    const unsubscribe = onSnapshot(scoreRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setRedScore(data.RedScore || 0);
        setBlueScore(data.BlueScore || 0);
      }
    });
  
    // 清理監聽器
    return () => unsubscribe();
  }, []);

  const updateScore = async (team, round, score) => {
    const scoreRef = doc(db, "MATCH A1001", `ROUND ${round}`); // 直接使用新的文檔名稱
    try {
      await updateDoc(scoreRef, {
        [`${team}Score`]: increment(score)
      });
      console.log(`${team}Score updated by ${score}`);
    } catch (e) {
      console.error("Error updating score: ", e);
    }
  };

  return (
    <div className="Remote">
      <div className="Left">
        <div className="Col145">
          <button onClick={() => updateScore('Red', 1, 5)} style={{ borderColor: 'var(--red-bg-color)', background: 'var(--red-pt-color)' }}> 5 </button>
          <button onClick={() => updateScore('Red', 1, 4)} style={{ borderColor: 'var(--red-bg-color)', background: 'var(--red-pt-color)' }}> 4 </button>
          <button onClick={() => updateScore('Red', 1, 1)} style={{ borderColor: 'var(--red-bg-color)', background: 'var(--red-pt-color)' }}> 1 </button>
        </div>
        <div className="Col23">
          <button onClick={() => updateScore('Red', 1, 3)} style={{ borderColor: 'var(--red-bg-color)', background: 'var(--red-pt-color)' }}> 3 </button>
          <button onClick={() => updateScore('Red', 1, 2)} style={{ borderColor: 'var(--red-bg-color)', background: 'var(--red-pt-color)' }}> 2 </button>
        </div>
      </div>
      <div className="Center">
        <p>RedScore: {redScore}</p>
        <p>BlueScore: {blueScore}</p>
      </div>
      <div className="Right">
        <div className="Col23">
          <button onClick={() => updateScore('Blue', 1, 3)} style={{ borderColor: 'var(--blue-bg-color)', background: 'var(--blue-pt-color)' }}> 3 </button>
          <button onClick={() => updateScore('Blue', 1, 2)} style={{ borderColor: 'var(--blue-bg-color)', background: 'var(--blue-pt-color)' }}> 2 </button>
        </div>
        <div className="Col145">
          <button onClick={() => updateScore('Blue', 1, 5)} style={{ borderColor: 'var(--blue-bg-color)', background: 'var(--blue-pt-color)' }}> 5 </button>
          <button onClick={() => updateScore('Blue', 1, 4)} style={{ borderColor: 'var(--blue-bg-color)', background: 'var(--blue-pt-color)' }}> 4 </button>
          <button onClick={() => updateScore('Blue', 1, 1)} style={{ borderColor: 'var(--blue-bg-color)', background: 'var(--blue-pt-color)' }}> 1 </button>
        </div>
      </div>
    </div>
  );
}

export default Remote;