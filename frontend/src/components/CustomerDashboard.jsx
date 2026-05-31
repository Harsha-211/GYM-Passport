import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/customer';

export default function CustomerDashboard(){
    const testUserID = "fcdfd5e2-9c1d-42c3-93e6-7811e6b13f32";
    const [user, setUser] = useState(null);
    const [gyms, setGyms] = useState([]);
    const [searchCity, setSearchCity] = useState('');
    const [searchName, setSearchName] = useState('');
    const [topUpAmount, setTopUpAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({text:'', type:''});

    // Automatically fetch user and all gyms on mount
    useEffect(() => {
        fetchUserProfile();
        fetchAllGyms();
    }, []);

    // Fetch User Profile & Balance from Backend
    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/profile/${testUserID}`);
            if(response.data.success){
                setUser(response.data.data);
            }
        } catch(error) {
            console.error("Error fetching profile:", error);
            showNotification("Failed to load user profile data.", "error");
        }
    }

    // Fetch Gyms based on filter inputs
    const handleSearch = async (e) => {
        if(e) e.preventDefault();
        setLoading(true);
        try {
            let url = `${API_BASE_URL}/search?`;
            // FIXED: Using backticks for template literals and fixed casing for searchCity
            if(searchCity) url += `city=${searchCity}&`;
            if(searchName) url += `gym_name=${searchName}`;

            const response = await axios.get(url);
            if(response.data.success){
                setGyms(response.data.data);
            }
        } catch(error) {
            console.error("Error searching gyms:", error);
            showNotification("Could not complete the gym lookup request.", "error");
        } finally {
            setLoading(false);
        }
    }

    // Fetch all the gyms without filters
    const fetchAllGyms = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/search`);
            if(response.data.success){
                setGyms(response.data.data);
            }
        } catch(error) {
            console.error("Error loading initial gyms:", error);
        } finally {
            setLoading(false);
        }
    }

    // Trigger Wallet Top-Up API Request
    const handleTopUp = async (e) => {
        e.preventDefault();
        if(!topUpAmount || parseInt(topUpAmount) <= 0){
            showNotification("Please enter a valid credit amount.", "error");
            return;
        }
        try {
            const response = await axios.post(`${API_BASE_URL}/wallet/topup`, {
                user_id: testUserID,
                amount: parseInt(topUpAmount)
            });
            if(response.data.success){
                showNotification(response.data.message, 'success');
                setTopUpAmount('');
                fetchUserProfile();
            }
        } catch(error) {
            console.log("Error executing wallet top-up:", error);
            showNotification("Failed to add money to wallet.", "error");
        }
    }

    const showNotification = (text, type) => {
        setMessage({text, type});
        setTimeout(() => setMessage({text:"", type:""}), 4000);
    };

    return (
    <div className="space-y-8 animate-fadeIn">
      {/* Toast Notification Bar */}
      {message.text && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-2xl text-sm font-bold border transform transition-all tracking-wide ${
          message.type === 'success' ? 'bg-emerald-950/90 text-emerald-400 border-emerald-500' : 'bg-rose-950/90 text-rose-400 border-rose-500'
        }`}>
          {message.text}
        </div>
      )}

      {/* TOP SECTION: User Profile Summary Card & Wallet Topup Portal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Stats Card */}
        <div className="md:col-span-1 bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl"></div>
          {user ? (
            <div>
              <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">Registered Customer</p>
              <h2 className="text-2xl font-black mt-1 text-white">{user.name}</h2>
              <p className="text-sm text-slate-400 mt-0.5">{user.email}</p>
              <div className="mt-8">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Available Wallet Balance</span>
                <span className="text-4xl font-extrabold text-emerald-400 mt-1 block">
                  {user.wallet_balance} <span className="text-lg font-medium text-slate-400">Credits</span>
                </span>
              </div>
            </div>
          ) : (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-slate-700 rounded w-1/3"></div>
              <div className="h-6 bg-slate-700 rounded w-2/3"></div>
              <div className="h-10 bg-slate-700 rounded w-1/2 mt-6"></div>
            </div>
          )}
        </div>

        {/* Top-up Form Panel */}
        <div className="md:col-span-2 bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-white tracking-wide">💳 Instant Wallet Refill Portal</h3>
          <p className="text-xs text-slate-400 mt-1">Add electronic passport credits to purchase single-day access entry passes across participating network gym structures.</p>
          <form onSubmit={handleTopUp} className="mt-6 flex flex-col sm:flex-row items-end gap-4">
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Amount to deposit</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                <input 
                  type="number" 
                  placeholder="e.g. 500, 1000, 2000" 
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-9 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-semibold"
                />
              </div>
            </div>
            <button type="submit" className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3.5 rounded-xl transition-all shadow-lg active:scale-95 text-sm uppercase tracking-wider whitespace-nowrap">
              Authorize Top-up
            </button>
          </form>
        </div>
      </div>

      {/* MIDDLE SECTION: Search Optimization Engine Filter Controls */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl">
        <h3 className="text-lg font-bold text-white tracking-wide">🔍 Intelligent Network Explorer</h3>
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 items-end">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Filter by Location</label>
            <select 
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 font-medium"
            >
              <option value="">All Regions / Cities</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Vijayawada">Vijayawada</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Search Center Name</label>
            <input 
              type="text" 
              placeholder="e.g. Gold's Gym, Cult.fit" 
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>
          <button type="submit" className="bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow focus:outline-none flex justify-center items-center gap-2">
            {loading ? 'Analyzing...' : 'Apply Filter Configurations'}
          </button>
        </form>
      </div>

      {/* LOWER SECTION: Dynamic Gym Roster Display Results */}
      <div>
        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">
          Available Search Inventory ({gyms.length} Centers Discovered)
        </h4>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
            {[1, 2].map((n) => (
              <div key={n} className="bg-slate-800 h-48 rounded-2xl border border-slate-700"></div>
            ))}
          </div>
        ) : gyms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gyms.map((gym) => (
              <div key={gym.id} className="bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-2xl p-6 shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative group flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                      {gym.gym_name}
                    </h3>
                    <span className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-2 py-0.5 rounded-lg text-xs font-black">
                      ⭐ {parseFloat(gym.rating).toFixed(1)}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-400 mt-1 flex items-center gap-1">
                    📍 Located in <span className="text-slate-200 font-semibold">{gym.city}</span> • Operated by {gym.owner_name}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-slate-700/60 text-center">
                  <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-700/40">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Day Pass</span>
                    <span className="text-sm font-black text-emerald-400 mt-0.5 block">{gym.credit_per_day} cr</span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-700/40">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Weekly Pass</span>
                    <span className="text-sm font-black text-slate-200 mt-0.5 block">{gym.credit_per_week} cr</span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-xl border border-slate-700/40">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Monthly Pass</span>
                    <span className="text-sm font-black text-slate-200 mt-0.5 block">{gym.credit_per_month} cr</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/40 flex items-center justify-between bg-slate-900/40 -mx-6 -mb-6 px-6 py-3 rounded-b-2xl">
                  <span className="text-[10px] font-mono text-slate-500 select-all truncate max-w-[200px]">
                    ID: {gym.id}
                  </span>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(gym.id);
                      showNotification("Gym ID securely copied to system clipboard!", "success");
                    }}
                    className="text-[10px] font-bold uppercase tracking-wider text-emerald-500/80 hover:text-emerald-400 bg-emerald-500/5 px-2 py-1 rounded border border-emerald-500/10 hover:border-emerald-500/30 transition-all"
                  >
                    Copy Gym ID
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center shadow-xl">
            <p className="text-slate-400 font-medium">No operational facilities match your exact filter configuration.</p>
          </div>
        )}
      </div>
    </div>
  );
}