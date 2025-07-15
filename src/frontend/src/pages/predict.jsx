import React, { useState } from "react";
import Header from "../components/header";
import "../styles/predict.css";
import CustomNumberInput from "../components/numberInput";

function Predict() {
  const [form, setForm] = useState({
    sepal_length: "",
    sepal_width: "",
    petal_length: "",
    petal_width: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const isValidInput = (name, val) => {
      const bounds = {
        sepal_length: [4.0, 8.0],
        sepal_width: [2.0, 5.0],
        petal_length: [1.0, 7.0],
        petal_width: [0.1, 3.0],
      };
      const [min, max] = bounds[name];
      return val >= min && val <= max;
    };

    for (let key in form) {
      const val = parseFloat(form[key]);
      if (!isValidInput(key, val)) {
        setResult({
          error: `Value for ${key.replace("_", " ")} is out of range.`,
        });
        return;
      }
    }

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        setResult({ error: "Prediction failed" });
      }
    } catch {
      setResult({ error: "Server error" });
    } finally {
      setLoading(false);
    }
  };

  const irisDescriptions = {
    setosa: [
      "Iris setosa is commonly found in colder northern regions like Alaska and parts of Canada.",
      "This species is known for its bluish-violet flowers and thrives in wet, marshy environments.",
      "Setosa is one of the smallest in the Iris family, and blooms early in the season.",
    ],
    versicolor: [
      "Known as the Blue Flag Iris, it is found throughout the eastern United States and Canada.",
      "It typically has violet-blue petals, and prefers moist, swampy areas or stream banks.",
      "This species was used historically in herbal remedies.",
    ],
    virginica: [
      "Native to southeastern U.S., Iris virginica is known for its larger size and adaptability.",
      "Its deep purple or blue flowers bloom in mid to late spring, often in wetlands.",
      "Virginica has broader petals and is often confused with versicolor, but grows taller.",
    ],
  };

  return (
    <>
      <Header />
      <div className="predict-wrapper">
        <div className="predict-left">
          <h1>Identify Iris Species</h1>
          <p>
            Input petal and sepal dimensions to classify the species of the
            iris!
          </p>
          <form className="input-grid" onSubmit={handleSubmit}>
            <div className="input-group">
              <CustomNumberInput
                name="sepal_length"
                label="Sepal Length (cm)"
                value={form.sepal_length}
                onChange={handleChange}
                min={4.0}
                max={8.0}
                step={0.1}
              />
            </div>
            <div className="input-group">
              <CustomNumberInput
                name="sepal_width"
                label="Sepal Width (cm)"
                value={form.sepal_width}
                onChange={handleChange}
                min={2.0}
                max={5.0}
                step={0.1}
              />
            </div>
            <div className="input-group">
              <CustomNumberInput
                name="petal_length"
                label="Petal Length (cm)"
                value={form.petal_length}
                onChange={handleChange}
                min={1.0}
                max={7.0}
                step={0.1}
              />
            </div>
            <div className="input-group">
              <CustomNumberInput
                name="petal_width"
                label="Petal Width (cm)"
                value={form.petal_width}
                onChange={handleChange}
                min={0.1}
                max={3.0}
                step={0.1}
              />
            </div>
            <button className="predict-button" type="submit">
              {loading ? "Predicting..." : "Predict"}
            </button>
          </form>
        </div>

        <div className="predict-right">
          {result && (
            <>
              <h2>
                {result.species.charAt(0).toUpperCase() +
                  result.species.slice(1)}
              </h2>
              <div className="predict-content">
                <img
                  src={`/assets/iris/setosa.jpg`}
                  alt={result.species}
                />
                <div className="predict-text">
                  {irisDescriptions[result.species].map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Predict;
