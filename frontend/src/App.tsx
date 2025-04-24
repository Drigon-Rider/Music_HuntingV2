import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState<string[]>([]); // Explicitly define the type as an array of strings

  useEffect(() => {
    fetch("/hello")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data.message); // Update state with the 'message' array
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Datas:</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li> // Render each string directly
        ))}
      </ul>
    </div>
  );
}

export default App;