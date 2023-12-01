import { useState } from 'react';
import './App.css';

function App() {
  const [loginEnabled, setLoginEnabled] = useState(false);
  const [signupEnabled, setSignupEnabled] = useState(false);
  
  return (
    <div className="flex flex-col items-center h-screen bg-blue-100">
      <nav className="w-full h-[100px] bg-green-100">

      </nav>

      <button
        className="bg-green-400 hover:bg-green-700 rounded-xl p-5"
        onClick={() => { setLoginEnabled(true); }}
      >
        Login
      </button>

      

      <div className={`${loginEnabled ? 'flex flex-col' : 'hidden'} w-2/3 h-2/3 bg-orange-300 fixed top-[200px]`
          }>
            <button
              className="bg-red-300 hover:bg-red-500 rounded-xl p-5"
              onClick={() => { setLoginEnabled(false); }}
            >
              Exit Login
          </button>

          <button
            className="bg-blue-400 hover:bg-blue-700 rounded-xl p-5"
            onClick={() => { setSignupEnabled(true); setLoginEnabled(false); }}
          >
            New user? Create an account
          </button>
      </div>
      <div className={`${signupEnabled ? 'flex flex-col' : 'hidden'} w-2/3 h-2/3 bg-purple-300 fixed top-[200px]`
          }>
            <button
              className="bg-red-300 hover:bg-red-500 rounded-xl p-5"
              onClick={() => { setSignupEnabled(false); }}
            >
              Exit Signup
          </button>
      </div>
    </div>
  );
}

export default App;
