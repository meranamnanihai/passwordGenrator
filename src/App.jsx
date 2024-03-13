import React, { useState, useEffect } from 'react';
import Alert from './components/alert';
import githubicon from './assets/github-icon.png';


function App() {
  const [charsInPass, setCharsInPass] = useState(false);
  const [numsInPass, setNumsInPass] = useState(false);
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  // Function to generate password
  const generatePassword = () => {
    let pass = '';
    let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numsInPass) string += '1234567890';
    if (charsInPass) string += '!@#$%^&*()_-+=}{|';
    for (let index = 0; index < length; index++) {
      let randomNum = Math.floor(Math.random() * string.length);
      pass += string[randomNum];
    }
    setPassword(pass);
  };

  // Function to dismiss alert after 3 seconds
  const dismissAlert = () => {
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  // Effect to generate password whenever relevant state changes
  useEffect(() => {
    generatePassword();
  }, [numsInPass, length, charsInPass]);

  return (
    <div className="container mx-auto mt-8 px-4">
      {alertVisible && <Alert />}
      <h1 className="text-3xl font-semibold mb-4">Password Generator</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password:</label>
          <div className="mt-1 flex items-center">
            <input
              type="text"
              value={password}
              readOnly
              className="border border-gray-300 px-3 py-2 w-full rounded-md"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Length:</label>
          <input
            type="range"
            max="30"
            min="7"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="block w-full"
          />
          <span className="text-sm">{length}</span>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Include Numbers:</label>
          <input
            type="checkbox"
            checked={numsInPass}
            onChange={() => setNumsInPass(!numsInPass)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Include Special Characters:</label>
          <input
            type="checkbox"
            checked={charsInPass}
            onChange={() => setCharsInPass(!charsInPass)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(password);
            setAlertVisible(true);
            dismissAlert();
          }}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Copy Password
        </button>
      </div>
          <div className="wrapper flex justify-center">
      <footer className="bg-gray-900 text-white py-6 absolute bottom-0 w-[90%] ">
      <div className="container mx-auto flex items-center justify-center px-4">
        <div className="text-center flex gap-2">
          <span className="inline-block relative animate-bounce text-2xl cursor-pointer">
            <span className="text-white flex justify-center items-center gap-4">Made by Admya Salar <img className='invert' src={githubicon} alt="" srcset="" /></span>
          </span>
        </div>
      </div>
    </footer>
    </div>
    </div>
  );
}

export default App;
