import React, { useEffect, useState } from 'react';
import { doc, updateDoc, increment, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase/firebase';
import './remote.css';

export default function Remote() {
  const [match, setMatch] = useState('');
  const [round, setRound] = useState(1);

  // 監聽變化
  useEffect(() => {
    const infoRef = doc(db, "Matches", "CurrentInfo");
    const unsubscribe = onSnapshot(infoRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setMatch(data.CurrentMatch || '');
        setRound(data.CurrentRound || 1);
      }
    });
    return () => unsubscribe(); // 清理監聽器
  }, []);

  const updateScore = async (scoreType, round, points) => {
    const roundKey = `Round${round}`;
    const scoreField = `${points}pts`; // 例如 '5pts'
    const infoRef = doc(db, "Matches", "CurrentInfo");
    try {
      await updateDoc(infoRef, {
        [`${roundKey}.${scoreType}.${scoreField}`]: increment(1) // 使用 Firestore 的增量更新
      });
    } catch (error) {
      console.error("Error updating score: ", error);
    }
  };

  return (
    <div className="Remote">
      <div className="Left">
        <div className="Col145">
          <button onClick={() => updateScore('RedScore', round, 5)} style={{ borderColor: 'var(--red-bg-color)', background: 'var(--red-pt-color)' }}> 5 </button>
          <button onClick={() => updateScore('RedScore', round, 4)} style={{ borderColor: 'var(--red-bg-color)', background: 'var(--red-pt-color)' }}> 4 </button>
          <button onClick={() => updateScore('RedScore', round, 1)} style={{ borderColor: 'var(--red-bg-color)', background: 'var(--red-pt-color)' }}> 1 </button>
        </div>
        <div className="Col23">
          <button onClick={() => updateScore('RedScore', round, 3)} style={{ borderColor: 'var(--red-bg-color)', background: 'var(--red-pt-color)' }}> 3 </button>
          <button onClick={() => updateScore('RedScore', round, 2)} style={{ borderColor: 'var(--red-bg-color)', background: 'var(--red-pt-color)' }}> 2 </button>
        </div>
      </div>
      <div className="Center">
        <p>CurrentMatch: {match}</p>
        <p>CurrentRound: {round}</p>
        <p>RedScore: </p>
        <p>BlueScore: </p>
      </div>
      <div className="Right">
        <div className="Col23">
          <button onClick={() => updateScore('BlueScore', round, 3)} style={{ borderColor: 'var(--blue-bg-color)', background: 'var(--blue-pt-color)' }}> 3 </button>
          <button onClick={() => updateScore('BlueScore', round, 2)} style={{ borderColor: 'var(--blue-bg-color)', background: 'var(--blue-pt-color)' }}> 2 </button>
        </div>
        <div className="Col145">
          <button onClick={() => updateScore('BlueScore', round, 5)} style={{ borderColor: 'var(--blue-bg-color)', background: 'var(--blue-pt-color)' }}> 5 </button>
          <button onClick={() => updateScore('BlueScore', round, 4)} style={{ borderColor: 'var(--blue-bg-color)', background: 'var(--blue-pt-color)' }}> 4 </button>
          <button onClick={() => updateScore('BlueScore', round, 1)} style={{ borderColor: 'var(--blue-bg-color)', background: 'var(--blue-pt-color)' }}> 1 </button>
        </div>
      </div>
    </div>
  );
}