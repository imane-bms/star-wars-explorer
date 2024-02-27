import { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";
import { FavPilots } from "./FavPilots";
const Pilots = (props) => {
  const urls = props.pilotsUrls;
  //   console.log(urls);
  const [pilots, setPilots] = useState([]);

  // control the visibility of details
  const [pilotDetails, setPilotDetails] = useState(null);

  // control favs list
  const [favPilots, setFavPilots] = useState([]);

  // async function to fetch starships
  const fetchPilots = async () => {
    // console.log(shipsUrls);
    try {
      const data = await Promise.all(
        urls.map(async (url) => {
          const response = await axios.get(url);
          return response.data;
        })
      );
      //   console.log(data);
      //update the pilots state with fetched data
      setPilots(data);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect to fetch whenever pilotsurl change: after the comp Pilots is rendered(mounted)
  useEffect(() => fetchPilots, [urls]);

  // if the pilot's details are already displayed, clicking the name should hide them again
  function handlePilotDetails(pilotDetails) {
    setPilotDetails((prev) => (prev === pilotDetails ? null : pilotDetails));
  }
  function handleAddFav(pilot) {
    setFavPilots(favPilots.includes(pilot) ? favPilots : [...favPilots, pilot]);

    // console.log(favPilots);
  }

  return (
    <main>
      <div className="pilotsCol">
        {pilots &&
          pilots.map((pilot) => (
            //  console.log(ship)

            <div className="pilot-card" key={pilot.name}>
              <div onClick={() => handlePilotDetails(pilot.name)}>
                <h3>{pilot.name}</h3>
                {/* can create a seperate comp : ShipDetails */}
                {pilotDetails === pilot.name && (
                  <div className="pilot-details">
                    <div>
                      <strong>Height: </strong>
                      {pilot.height}
                    </div>
                    <div>
                      <strong>Mass: </strong>
                      {pilot.mass}
                    </div>
                    <div>
                      <strong>Birth Year: </strong>
                      {pilot.birth_year}
                    </div>
                    <div>
                      <strong>Gender: </strong>
                      {pilot.gender}
                    </div>
                  </div>
                )}
              </div>
              <button
                className="AddFav-btn"
                onClick={() => handleAddFav(pilot)}
              >
                ADD FAVORITE
              </button>
            </div>
          ))}
      </div>
      <div>{favPilots.length !== 0 && <FavPilots favPilots={favPilots} />}</div>
    </main>
  );
};
export default Pilots;
