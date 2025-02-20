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

  const [match, setMatch] = useState('');
  const [round, setRound] = useState(1);
  const [redName, setRedName] = useState('');
  const [blueName, setBlueName] = useState('');
  const [roundTime, setRoundTime] = useState(0);
  const [redGamJeom, setRedGamJeom] = useState(0);
  const [blueGamJeom, setBlueGamJeom] = useState(0);
  const [redScore, setRedScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);

  // 監聽變化
  useEffect(() => {
    const infoRef = doc(db, "Matches", "CurrentInfo");
    const unsubscribe = onSnapshot(infoRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setMatch(data.CurrentMatch || '');
        setRound(data.CurrentRound || 1);
        setRedName(data.RedName || '');
        setBlueName(data.BlueName || '');
        setRoundTime(data.RoundTime || 0);
        if (data.CurrentRound === 1) {
          setRedGamJeom(data.Round1.RedGamJeom || 0);
          setBlueGamJeom(data.Round1.BlueGamJeom || 0);
        } else if (data.CurrentRound === 2) {
          setRedGamJeom(data.Round2.RedGamJeom || 0);
          setBlueGamJeom(data.Round2.BlueGamJeom || 0);
        } else if (data.CurrentRound === 3) {
          setRedGamJeom(data.Round3.RedGamJeom || 0);
          setBlueGamJeom(data.Round3.BlueGamJeom || 0);
        }
      }
    });
    return () => unsubscribe(); // 清理監聽器
  }, [round]);

  // 將秒數格式化為 m:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`; // 確保秒數為兩位數
  };

  const calculateScore = (scoreData) => {
    return (scoreData['1pts'] || 0) * 1 +
           (scoreData['2pts'] || 0) * 2 +
           (scoreData['3pts'] || 0) * 3 +
           (scoreData['4pts'] || 0) * 4 +
           (scoreData['5pts'] || 0) * 5;
  };
  
  useEffect(() => {
    const infoRef = doc(db, "Matches", "CurrentInfo");
    const unsubscribe = onSnapshot(infoRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        // Fetch BlueScore and RedScore
        if (data.CurrentRound === 1) {
          setRedScore(calculateScore(data.Round1.RedScore || {}) + blueGamJeom);
          setBlueScore(calculateScore(data.Round1.BlueScore || {}) + redGamJeom);
        } else if (data.CurrentRound === 2) {
          setRedScore(calculateScore(data.Round2.RedScore || {}) + blueGamJeom);
          setBlueScore(calculateScore(data.Round2.BlueScore || {}) + redGamJeom);
        } else if (data.CurrentRound === 3) {
          setRedScore(calculateScore(data.Round3.RedScore || {}) + blueGamJeom);
          setBlueScore(calculateScore(data.Round3.BlueScore || {}) + redGamJeom);
        }
      }
    });
    return () => unsubscribe();
  }, [redScore, blueScore, redGamJeom, blueGamJeom]);

  return (
    <div className="Scoreboard">
      <div className="container">
        <div className="row above" style={{flexDirection: isRowReversed ? 'row-reverse' : 'row' }}>
          <div className="name leftname">{redName}</div>
          <div className="name rightname">{blueName}</div>
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
                    {redGamJeom}
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
                {match}
              </div>
            </div>
            <div className="game">
              <div className="timer gameTimer" onClick={toggleColor}>
                {formatTime(roundTime)}
              </div>
              <div className="timeOut gameTimeOut" onClick={toggleColor}
                style={{ backgroundColor: isYellow ? 'yellow' : 'black'}}>Time out</div>
            </div>
            <div className="round">
              <div className="roundText">ROUND</div>
              <div className="roundNumber">
                {round}
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
                    {blueGamJeom}
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
