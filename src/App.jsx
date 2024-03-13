import React, { useState, useEffect } from 'react';
import Alert from './components/alert';

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
    </div>
  );
}

export default App;
