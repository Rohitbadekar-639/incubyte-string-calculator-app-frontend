import React, { useState } from "react";
import { calculateString } from "../services/calculatorService";
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await calculateString(input);
      setResult(response.result);
    } catch (err) {
      setError(err.message);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator-card">
        <div className="input-group">
          <label htmlFor="numbers">Enter strings or numbers:</label>
          <textarea
            id="numbers"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter numbers (e.g., 1,2,3 or //;\n1;2;3)"
            rows="4"
          />
        </div>

        <button
          className="calculate-button"
          onClick={handleCalculate}
          disabled={isLoading}
        >
          {isLoading ? "Calculating..." : "Calculate"}
        </button>

        {result !== null && (
          <div className="result success">Result: {result}</div>
        )}

        {error && <div className="result error">Error: {error}</div>}
      </div>
    </div>
  );
};

export default Calculator;
