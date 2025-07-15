import React, { useState } from "react";
import "../styles/FilterModal.css";

function FilterModal({ selectedSpecies, onClose, onApply }) {
  const allSpecies = ["Iris Setosa", "Iris Versicolor", "Iris Virginica"];
  const [localSelection, setLocalSelection] = useState(selectedSpecies);

  const handleToggle = (species) => {
    if (localSelection.includes(species)) {
      const updated = localSelection.filter(s => s !== species);
      if (updated.length > 0) setLocalSelection(updated);
    } else {
      setLocalSelection([...localSelection, species]);
    }
  };

  const handleSubmit = () => {
    onApply(localSelection);
    onClose();
  };

  return (
    <div className="filter-modal-backdrop">
      <div className="filter-modal">
        <h3>Filter by Species</h3>
        <div className="checkbox-group">
          {allSpecies.map((species) => (
            <label key={species}>
              <input
                type="checkbox"
                checked={localSelection.includes(species)}
                onChange={() => handleToggle(species)}
              />
              {species}
            </label>
          ))}
        </div>
        <div className="modal-actions">
          <button onClick={handleSubmit}>Apply Filter</button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
