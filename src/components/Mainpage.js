/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleRight } from '@fortawesome/free-solid-svg-icons';
import { getCountries } from '../redux/mainpage';

const Mainpage = () => {
  const status = useSelector((state) => state.countries);
  const [search, setsearch] = useState('');
  const [select, setSelect] = useState('Africa');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);
  function handle(e) {
    e.preventDefault();
    setsearch(e.target.value);
  }
  function handleFilter(e) {
    setSelect(e.target.value);
  }

  return (
    <div>

      <div className="search-cont">
        <FontAwesomeIcon icon={faBars} color="white" size="xl" />
        <div className="search">
          <input type="text" value={search} onChange={handle} placeholder="Search country.." />

          Continent:
          <select value={select} onChange={handleFilter}>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Oceania">Oceania</option>
          </select>

        </div>

      </div>
      <div className="item-container">
        <div className="country-box">
          {select}
        </div>
        <div className="stats">Stats By Countries</div>
        <div className="card">
          {status.items.filter((post) => post.region === select).filter((country) => {
            if (search === '') {
              return country;
            } if (country.country.toString().toLowerCase().includes(search.toLowerCase())) {
              return country;
            }
          })
            .map((country) => (

              <Link
                to={`/${country.country}/${country.lat}/${country.lon}`}
                className="link"
                key={country.country}
                style={{
                  backgroundImage: `url(${country.coat})`,
                  backgroundSize: 'cover',
                  backgroundBlendMode: 'saturation',
                }}
              >
                <div className="one">
                  <div className="fa-Right"><FontAwesomeIcon icon={faCircleRight} /></div>
                </div>
                <div className="two">
                  <div>{country.country}</div>
                  <div>
                    {country.population}
                    {' '}
                    people
                  </div>
                </div>

              </Link>

            ))}
        </div>
      </div>
    </div>
  );
};
export default Mainpage;
