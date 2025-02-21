import React, { useState } from 'react';
import { db } from '../../firebase/firebase'; // 根据您的 Firebase 设置调整导入
import { doc, updateDoc } from 'firebase/firestore'; // 导入 Firestore 更新函数
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate
import './newMatch.css';

export default function NewMatch() {
    const [matchNumber, setMatchNumber] = useState('');
    const [redPlayerName, setRedPlayerName] = useState('');
    const [bluePlayerName, setBluePlayerName] = useState('');
    const [roundTime, setRoundTime] = useState('');
    const [restTime, setRestTime] = useState('');
    const [ptgScore, setPtgScore] = useState('');
    const [punScore, setPunScore] = useState('');
    const navigate = useNavigate(); // 使用 useNavigate


    const handleSubmit = async (event) => {
        event.preventDefault();
        // 创建对 Firestore 文档的引用
        const currentInfoRef = doc(db, "Matches", "CurrentInfo");
        try {
            // 更新文档中的指定字段
            await updateDoc(currentInfoRef, {
                CurrentMatch: matchNumber,
                RedName: redPlayerName,
                BlueName: bluePlayerName,
                RoundTime: parseInt(roundTime, 10), // 转换为整数
                RestTime: parseInt(restTime, 10),   // 转换为整数
                PTGscore: parseInt(ptgScore, 10),    // 转换为整数
                PUNnumber: parseInt(punScore, 10),    // 转换为整数
                CurrentRound: 1,
                IsFinished: false,
                IsStarted: false,
                IsTimeOut: false,
                RedGamJeom: 0,
                BlueGamJeom: 0,
                RedScore: {
                    "1pts": 0,
                    "2pts": 0,
                    "3pts": 0,
                    "4pts": 0,
                    "5pts": 0
                },
                BlueScore: {
                    "1pts": 0,
                    "2pts": 0,
                    "3pts": 0,
                    "4pts": 0,
                    "5pts": 0
                },
                Round1: {
                  RoundWinner: "",
                  RoundWinningReason: ""
                },
                Round2: {
                  RoundWinner: "",
                  RoundWinningReason: ""
                },
                Round3: {
                  RoundWinner: "",
                  RoundWinningReason: ""
                }
            });
            //在提交后重置表单字段
            setMatchNumber('');
            setRedPlayerName('');
            setBluePlayerName('');
            setRoundTime('');
            setRestTime('');
            setPtgScore('');
            setPunScore('');
            navigate('/scoreboard'); // 提交后导航
        } catch (error) {
            console.error("Error updating document: ", error);
            alert('Error updating match information. Please try again.');
        }
    };

    return (
        <div className="NewMatch">
            <h1>Match Informations</h1>
            <form onSubmit={handleSubmit}>
                <div className="FormDiv">
                    <label>Match Number:</label>
                    <input 
                        type="text" 
                        value={matchNumber} 
                        onChange={(e) => setMatchNumber(e.target.value)} 
                        required 
                    />
                </div>
                <div className="FormDiv">
                    <label>Red Player Name:</label>
                    <input 
                        type="text" 
                        value={redPlayerName} 
                        onChange={(e) => setRedPlayerName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="FormDiv">
                    <label>Blue Player Name:</label>
                    <input 
                        type="text" 
                        value={bluePlayerName} 
                        onChange={(e) => setBluePlayerName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="FormDiv">
                    <label>Round Time (seconds):</label>
                    <input 
                        type="number" 
                        value={roundTime} 
                        onChange={(e) => setRoundTime(e.target.value)} 
                        min="0" 
                        required 
                    />
                </div>
                <div className="FormDiv">
                    <label>Rest Time (seconds):</label>
                    <input 
                        type="number" 
                        value={restTime} 
                        onChange={(e) => setRestTime(e.target.value)} 
                        min="0" 
                        required 
                    />
                </div>
                <div className="FormDiv">
                    <label>PTG Score:</label>
                    <input 
                        type="number" 
                        value={ptgScore} 
                        onChange={(e) => setPtgScore(e.target.value)} 
                        min="0" 
                        required 
                    />
                </div>
                <div className="FormDiv">
                    <label>PUN Score:</label>
                    <input 
                        type="number" 
                        value={punScore} 
                        onChange={(e) => setPunScore(e.target.value)} 
                        min="0" 
                        required 
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}