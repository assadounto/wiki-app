import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft, faGear, faMicrophone, faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { getDetails2, getDetails } from '../redux/details';

const Country = () => {
  const { country, lat, lon } = useParams();
  const status = useSelector((state) => state.details);
  const dispatch = useDispatch();
  useEffect(() => {
    const latlon = {
      lon,
      lat,
    };
    dispatch(getDetails(latlon));
    dispatch(getDetails2(country));
  }, [country, dispatch, lat, lon]);
  return (
    <div>
      { status.isCountryinfoLoading
        ? <div className="load"><FontAwesomeIcon icon={faSpinner} className="spin" /></div>

        : (
          <div className="details">
            <div>
              <div className="utilBar">
                <Link to="/"><FontAwesomeIcon icon={faChevronLeft} color="white" size="xl" /></Link>
                <div className="MicGear">
                  <FontAwesomeIcon icon={faMicrophone} className="mic" color="white" size="xl" />
                  <FontAwesomeIcon icon={faGear} color="white" size="xl" />
                </div>
              </div>

            </div>

            {status.items2.map((key) => (
              <div className="country-info" key={key.name}>
                <div className="img-cont">
                  <div className="img"><img src={key.flag} alt="" /></div>
                  <div className="dsc-cont">
                    <strong>{key.name}</strong>
                    <div>
                      Population :
                      {key.population}
                    </div>
                  </div>
                </div>

              </div>
            ))}
            {status.items.map((key) => (
              <div className="Pollution-info" key={key.nitro}>
                <div className="Quality">
                  Air Quality
                  {key.AirQuality < 3 ? <div className="G C">Good</div> : <div className="G C">moderate</div>}
                  <div>Details Below</div>
                </div>

                <table>
                  <tbody>
                    <tr>
                      <th>Air Pollutant</th>
                      <th>Concentration</th>
                    </tr>

                    <tr>
                      <td>Nitrogen Monoxide</td>
                      <td>{key.nitro}</td>
                    </tr>
                    <tr>
                      <td>Nitrogen Dioxide </td>
                      <td>{key.nitrodioxide}</td>
                    </tr>
                    <tr>
                      <td>Ozone  </td>
                      <td>{key.ozone}</td>
                    </tr>
                    <tr>
                      <td>Carbon Monoxide </td>
                      <td>{key.carbon}</td>
                    </tr>
                    <tr>
                      <td>Sulfur Dioxide </td>
                      <td>{key.sulphur}</td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  Air Quality Index is
                  {key.AirQuality}
                </div>

              </div>
            ))}
          </div>
        )}
    </div>
  );
};
export default Country;
