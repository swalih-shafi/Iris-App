import React, { useState } from "react";
import Header from "../components/header";
import "../styles/predict.css";
import CustomNumberInput from "../components/numberInput";
import setosaImg from "../assets/iris/setosa.jpg";
import versicolorImg from "../assets/iris/versicolor.jpg";
import virginicaImg from "../assets/iris/virginica.jpg";

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
      "Iris setosa, often called the bristle-pointed iris, is a hardy, low-growing flower native to the cooler regions of the Northern Hemisphere. Think Alaska, northern Canada, and parts of Siberia. It thrives in moist, boggy environments and is one of the few irises naturally adapted to Arctic and subarctic climates. The name “setosa” comes from Latin, meaning 'bristly,' referring to the short, fuzzy hairs found on its sepals (the outer petals). It usually grows to just about a foot tall, making it one of the smaller iris species.",
      "Visually, setosa is striking despite its size. It typically displays vibrant violet-blue flowers, though sometimes shades of purple or lilac can appear. Each flower has three petals that arch outward and three upright ones, like most irises, but its small stature gives it a more delicate, ground-hugging look. It blooms in late spring to early summer and often forms wide patches along streams and wetlands. Though beautiful, the plant is mildly toxic if ingested, especially the rhizomes (roots), which can irritate the stomach. However, it poses no threat if simply admired in the wild or in a garden. Gardeners value it for its cold-hardiness and ability to bring color to damp, chilly corners where few other flowers can flourish.",
    ],

    virginica: [
      "Iris virginica, or the Southern Blue Flag, is a graceful wildflower native to the southeastern United States. It loves damp soil and is often found in marshes, ditches, or near ponds where water gathers. This species grows taller than many others, up to three feet, and puts on a showy display when it blooms in late spring. The name “virginica” reflects its discovery in the Virginia region, though it can now be found across a broad area stretching from Florida to parts of the Midwest.",
      "This iris is easily recognized by its large, vibrant flowers, usually in deep shades of bluish-purple with yellow and white markings at the base of each petal. Its petals are wide and gently ruffled, giving it a soft, almost silky appearance. While it’s often confused with other blue-flag irises like Iris versicolor, virginica tends to be taller and more streamlined in appearance. It's also quite resilient and is used in some water-cleaning projects thanks to its ability to thrive in wet, nutrient-rich soil. Although beautiful, the plant, like many irises, contains compounds that can be toxic if eaten, especially by pets or livestock. However, it’s perfectly safe to plant in gardens as long as it’s not consumed. Many gardeners and conservationists appreciate Iris virginica for its role in supporting pollinators and maintaining wetland ecosystems.",
    ],

    versicolor: [
      "Iris versicolor, commonly called the Blue Flag Iris, is one of the most popular and recognizable iris species in North America. Native to the northeastern United States and eastern Canada, it typically grows along riverbanks, lakesides, and marshy meadows. The name “versicolor” refers to its varied coloration; flowers can range from deep violet to blue-purple, often with subtle blends of white and yellow in their centers. It blooms in late spring to early summer, standing about two to three feet tall.",
      "What makes versicolor especially captivating is its multi-toned petals, which seem to shimmer with color under sunlight. Each flower has three large drooping sepals and three smaller upright petals, forming the classic iris shape. It’s a favorite among photographers and gardeners alike, not just for its beauty but also for its ability to grow in tough, wet conditions. Unlike more delicate species, versicolor can tolerate fluctuating water levels, making it ideal for rain gardens or restoration projects near ponds. However, this iris does have a cautionary side. It is known to contain a chemical called iridin, which can be toxic if ingested. This isn’t a problem for viewing or planting, but it’s worth keeping in mind if you have curious pets. Despite that, Iris versicolor plays a beneficial role in wetland habitats, supporting bees and butterflies while also helping to prevent soil erosion in soggy areas.",
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
              <h3 style={{ fontWeight: 300, marginBottom: 0 }}>
                The dimensions match to be of species:
              </h3>
              <h1 style={{ fontSize: "2rem", marginTop: 0 }}>
                {result.species.charAt(0).toUpperCase() +
                  result.species.slice(1)}
              </h1>
              <div className="predict-content">
                <img
                  className="result-image"
                  src={
                    result.species === "setosa"
                      ? setosaImg
                      : result.species === "versicolor"
                      ? versicolorImg
                      : virginicaImg
                  }
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
