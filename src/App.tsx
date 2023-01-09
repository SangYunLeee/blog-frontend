import React from 'react';

function App() {
  const testFunt = () => {
    for (let i = 0; i < 10; i++) {
      console.log(i);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div onClick={testFunt}>테스트 test</div>
      </header>
    </div>
  );
}

export default App;
