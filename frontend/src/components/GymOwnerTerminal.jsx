import axios from 'axios';
import React, { useState } from 'react';

export default function GymOwnerTerminal() {
  const [userId, setUserId] = useState('');
  const [gymId, setGymId] = useState('');
  const [attendanceId, setAttendanceId] = useState('');
  const [walletBalance, setWalletBalance] = useState(''); 
  
  const API_BASE_URL = 'http://localhost:5000/api/gym/checkin';
  
  const applyTransaction = async () => {
    if (!userId || !gymId) {
      alert("Please fill out both fields!");
      return;
    }
    try {
      const response = await axios.post(API_BASE_URL, { user_id: userId, gym_id: gymId });
      if (response.data.success) {
        console.log(response.data.message);
        setAttendanceId(response.data.attendance_id);
        setWalletBalance(response.data.remaining_user_balance);
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Failed to book your spot..", error);
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("Transaction failed. Check terminal connection.");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyTransaction();
  };

  return (
    <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 animate-fadeIn">
      <h2 className="text-xl font-bold text-white mb-4">🏬 Gym Owner Terminal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Enter User ID</label>
          <input
            type='text'
            value={userId}
            onChange={e => setUserId(e.target.value)}
            placeholder="Paste User UUID here"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Enter Gym ID</label>
          <input
            type='text'
            value={gymId}
            onChange={e => setGymId(e.target.value)}
            placeholder="Paste Gym UUID here"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
        <button
          type='submit'
          className="w-full bg-emerald-500 text-slate-950 font-black p-3 rounded-xl hover:bg-emerald-400 transition-all uppercase tracking-wider text-sm shadow-lg"
        > 
          Verify & Check In User
        </button>
      </form>

      {(attendanceId || walletBalance) && (
        <div className="mt-6 p-4 bg-slate-900 rounded-xl border border-emerald-500/30">
          <h3 className="text-emerald-400 font-bold mb-2">✅ Check-In Successful!</h3>
          <p className="text-sm text-slate-300">Attendance Log ID: <span className="font-mono text-white select-all">{attendanceId}</span></p>
          <p className="text-sm text-slate-300">Remaining User Balance: <span className="font-bold text-emerald-400">{walletBalance} Credits</span></p>
        </div>
      )}
    </div>
  );
}