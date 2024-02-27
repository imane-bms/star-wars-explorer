import { useEffect, useState } from "react";
import axios from "axios";
import Pilots from "../Pilots/Pilots";
import "../styles.css";

const Ships = (props) => {
  const urls = props.shipsUrls;
  //   console.log(urls);
  const [ships, setShips] = useState([]);

  // control the visibility of details
  const [shipDetailsModel, setShipDetailsModel] = useState(null);

  const [showPilots, setShowPilots] = useState(false);
  const [pilotsUrls, setPilotsUrls] = useState([]);

  // async function to fetch starships
  const fetchShips = async () => {
    // console.log(shipsUrls);
    try {
      const data = await Promise.all(
        urls.map(async (url) => {
          const response = await axios.get(url);
          return response.data;
        })
      );
      //   console.log(data);
      //update the starships state with fetched data
      setShips(data);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect to fetch whenever shipsurls change: after the comp Ships is rendered(mounted)
  useEffect(() => fetchShips, [urls]);

  // if the ship's details are already displayed, clicking the name should hide them again
  function handleShipDetails(shipDetailsModel) {
    setShipDetailsModel((prev) =>
      prev === shipDetailsModel ? null : shipDetailsModel
    );
  }

  function handleShowPilots(urls) {
    // console.log(urls); // array of urls of pilots
    setShowPilots(!showPilots);
    setPilotsUrls(urls);
    // console.log(pilotsUrls);
  }
  //   console.log(ships); // array of ships and their info

  return (
    <main>
      <div className="shipsCol">
        {ships &&
          ships.map((ship) => (
            //  console.log(ship)

            <div className="ship-card" key={ship.model}>
              <div onClick={() => handleShipDetails(ship.model)}>
                <h3>{ship.name}</h3>
                {/* can create a seperate comp : ShipDetails */}
                {shipDetailsModel === ship.model && (
                  <div className="ship-details">
                    <div>
                      <strong>Model: </strong>
                      {ship.model}
                    </div>
                    <div>
                      <strong>Max Atmoshpering Speed: </strong>
                      {ship.max_atmosphering_speed}
                    </div>
                    <div>
                      <strong>Starship Class: </strong>
                      {ship.starship_class}
                    </div>
                  </div>
                )}
              </div>
              <button
                className="show-pilots-btn"
                onClick={() => handleShowPilots(ship.pilots)}
              >
                SHOW PILOTS
              </button>
            </div>
          ))}
      </div>
      <div>{showPilots && <Pilots pilotsUrls={pilotsUrls} />}</div>
    </main>
  );
};
export default Ships;
