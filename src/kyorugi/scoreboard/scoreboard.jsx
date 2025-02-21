import './scoreboard.css';
import React, { useEffect, useState } from 'react';
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/firebase';

export default function Scoreboard() {
  const [isRowReversed, setIsRowReversed] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [match, setMatch] = useState('');
  const [round, setRound] = useState(1);
  const [redName, setRedName] = useState('');
  const [blueName, setBlueName] = useState('');
  const [roundTime, setRoundTime] = useState(120);
  const [redGamJeom, setRedGamJeom] = useState(0);
  const [blueGamJeom, setBlueGamJeom] = useState(0);
  const [redScore, setRedScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);


  const handleKeyDown = (event) => {
    if (event.key === '\\') {
      setIsRowReversed(prev => !prev); // 切换状态
    }
    if (event.code === 'Space') {
      event.preventDefault(); // 防止默认的空格键行为

      const currentRoundRef = doc(db, "Matches", "CurrentInfo");
      if (!isStarted) {
        setIsStarted(true);
        setIsTimeOut(false);
        updateDoc(currentRoundRef, {
          IsStarted: true,
          IsTimeOut: false
        });
      } else {
        if (!isTimeOut) {
          setIsTimeOut(true);
          updateDoc(currentRoundRef, {
            IsTimeOut: true
          });
        } else {
          setIsTimeOut(false);
          updateDoc(currentRoundRef, {
            IsTimeOut: false
          });
        }
      }
    }
  };

  const calculateScore = (scoreData) => {
    return (scoreData['1pts'] || 0) * 1 +
           (scoreData['2pts'] || 0) * 2 +
           (scoreData['3pts'] || 0) * 3 +
           (scoreData['4pts'] || 0) * 4 +
           (scoreData['5pts'] || 0) * 5;
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown); // 添加键盘事件监听
    return () => {
      window.removeEventListener('keydown', handleKeyDown); // 清除事件监听
    };
  }, [isStarted, isTimeOut, round]);

  // 监听变化
  useEffect(() => {
    const infoRef = doc(db, "Matches", "CurrentInfo");
    const unsubscribe = onSnapshot(infoRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setMatch(data.CurrentMatch || '');
        setRound(data.CurrentRound || 1);
        setRedName(data.RedName || '');
        setBlueName(data.BlueName || '');
        setRoundTime(data.CurrentRoundTime || 0);
        setRedGamJeom(data.RedGamJeom || 0);
        setBlueGamJeom(data.BlueGamJeom || 0);
        setIsStarted(data.IsStarted || false);
        setIsTimeOut(data.IsTimeOut || false);
        setRedScore(calculateScore(data.RedScore || {}) + blueGamJeom);
        setBlueScore(calculateScore(data.BlueScore || {}) + redGamJeom);
      }
    });
    return () => unsubscribe(); // 清理监听器
  }, [match, redScore, blueScore, redGamJeom, blueGamJeom]);

  // 将秒数格式化为 m:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`; // 确保秒数为两位数
  };

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
              <div className="timer gameTimer">
                {formatTime(roundTime)}
              </div>
              <div className="timeOut gameTimeOut" style={{ backgroundColor: isTimeOut ? 'yellow' : 'black' }}>
                Time out
              </div>
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