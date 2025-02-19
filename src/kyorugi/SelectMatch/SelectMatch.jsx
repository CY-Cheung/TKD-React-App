import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase'; // Adjust the import based on your Firebase setup
import './selectMatch.css';

export default function SelectMatch() {
    const [matchNumbers, setMatchNumbers] = useState([]);

    useEffect(() => {
        const fetchMatchNumbers = async () => {
        const matchNumbersRef = db.collection('Matches');
        const snapshot = await matchNumbersRef.get();
        const matches = snapshot.docs.map(doc => doc.id); // Get the document IDs (A1001, A1002, etc.)
        setMatchNumbers(matches);
        };

        fetchMatchNumbers();
    }, []);

    return (
        <div>
            <h1>Select a Match</h1>
            <select>
                {matchNumbers.map(matchNumber => (
                    <option key={matchNumber} value={matchNumber}>
                        {matchNumber}
                    </option>
                ))}
            </select>
        </div>
    );
}