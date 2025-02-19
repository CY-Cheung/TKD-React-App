import './scoreboard.css';
import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase/firebase';

export default function Scoreboard() {
  const [isYellow, setIsYellow] = useState(false);

  const toggleColor = () => {
    setIsYellow(prevIsYellow => !prevIsYellow);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        toggleColor();
        event.preventDefault(); // Prevents default space bar actions like scrolling
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  const [isRowReversed, setIsRowReversed] = useState(false);

    const handleKeyDown = (event) => {
        if (event.key === '\\') {
            setIsRowReversed(prev => !prev); // 切換狀態
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown); // 添加鍵盤事件監聽
        return () => {
            window.removeEventListener('keydown', handleKeyDown); // 清除事件監聽
        };
    }, []);
  
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

  return (
    <div className="Scoreboard">
      <div className="container">
        <div className="row above" style={{flexDirection: isRowReversed ? 'row-reverse' : 'row' }}>
          <div className="name leftname">Red Player</div>
          <div className="name rightname">Blue Player</div>
        </div>
        <div className="row below" style={{flexDirection: isRowReversed ? 'row-reverse' : 'row' }}>
          <div className="left">
            <div className="middle" style={{flexDirection: isRowReversed ? 'row-reverse' : 'row' }}>
              <div className="leftLog log"></div>
              <div className="leftPoints points">
                {redScore}
              </div>
            </div>
            <div className="bottom" style={{flexDirection: isRowReversed ? 'row-reverse' : 'row' }}>
              <div className="log">
                <div className="GJ">
                  <p className="GJstring">GAM-JEOM</p>
                  <p className="GJcount">
                    0
                  </p>
                </div>
              </div>
              <div className="points"></div>
            </div>
          </div>
          <div className="center">
            <div className="match">
              <div className="matchText">MATCH</div>
              <div className="matchNumber">
                A1001
              </div>
            </div>
            <div className="game">
              <div className="timer gameTimer" onClick={toggleColor}>
                2:00
              </div>
              <div className="timeOut gameTimeOut" onClick={toggleColor}
                style={{ backgroundColor: isYellow ? 'yellow' : 'black'}}>Time out</div>
            </div>
            <div className="round">
              <div className="roundText">ROUND</div>
              <div className="roundNumber">
                1
              </div>
            </div>
          </div>
          <div className="right">
            <div className="middle" style={{flexDirection: isRowReversed ? 'row-reverse' : 'row' }}>
              <div className="rightPoints points">
                {blueScore}
              </div>
              <div className="rightLog log"></div>
            </div>
            <div className="bottom" style={{flexDirection: isRowReversed ? 'row-reverse' : 'row' }}>
              <div className="points"></div>
              <div className="log">
                <div className="GJ">
                  <p className="GJstring">GAM-JEOM</p>
                  <p className="GJcount">
                    0
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
