import { useState } from "react";

export const FavPilots = (props) => {
  //   console.log(props.favPilots); // array of objects
  const favArray = props.favPilots;
  const [favs, setFavs] = useState(favArray);

  function handleRemove(pilotIndex) {
    // console.log(pilotName);
    const updatedFavs = favs.filter((pilot, index) => index !== pilotIndex);
    // const updatedFavs = favs.splice(pilotIndex, 1);
    console.log(updatedFavs);
    setFavs(updatedFavs);
  }
  return (
    <div className="favPilotsCol">
      {favs.map((fav, index) => (
        <div className="fav-pilot-card" key={index}>
          <h3>{fav.name}</h3>
          <button className="remove-btn" onClick={() => handleRemove(index)}>
            REMOVE FROM FAVORITE
          </button>
        </div>
      ))}
    </div>
  );
};
