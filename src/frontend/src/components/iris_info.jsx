import "../styles/predict.css";
import setosaImg from "../assets/iris/setosa.jpg";
import versicolorImg from "../assets/iris/versicolor.jpg";
import virginicaImg from "../assets/iris/virginica.jpg";

const descriptions = {
  setosa: [
    "Iris setosa is known for its vibrant purple-blue petals.",
    "It typically grows in colder climates like Alaska and Siberia.",
    "It has the smallest petals among the three iris types.",
    "Popular in gardens due to its compact size."
  ],
  versicolor: [
    "Also known as the 'Harlequin Blueflag'.",
    "Found mostly in wet meadows and marshes.",
    "Its flowers are usually violet-blue with yellow markings.",
    "Intermediate size among the three iris species."
  ],
  virginica: [
    "Native to North America, especially the southeastern U.S.",
    "The largest of the three iris species.",
    "Usually blooms in late spring to early summer.",
    "Tolerant of wet, swampy areas."
  ]
};

const images = {
  setosa: setosaImg,
  versicolor: versicolorImg,
  virginica: virginicaImg
};

function IrisResultCard({ species }) {
  const facts = descriptions[species] || [];
  const image = images[species] || "";

  return (
    <div className="result-card">
      <h2>{species.charAt(0).toUpperCase() + species.slice(1)}</h2>
      <div className="result-content">
        <img src={image} alt={species} />
        <ul>
          {facts.map((fact, idx) => (
            <li key={idx}>{fact}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default IrisResultCard;
