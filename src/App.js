import { useState } from 'react';
import './App.css';
import { AuthContextProvider } from './config/AuthContext';
import SignInPage from './components/SignIn';



function App() {
  
  return (
    <AuthContextProvider>
      <SignInPage/>
    </AuthContextProvider>
  );
}

export default App;
