import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import iSeries from './interface';
import './series.css';

const Series = () => {
  const [searchData, setSearchData] = useState<iSeries[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSearch = (e: any) => {
    let value = e.target.value.toLowerCase();
    setSearchQuery(value);
  };

  useEffect(() => {
    const url = `https://api.tvmaze.com/search/shows?q=${searchQuery}`;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setSearchData(response.data);
      })
      .catch((error) => {
        console.log('Something went wrong', error);
        setShowError(true);
      });
  }, [searchQuery]);

  return (
    <>
      <div className='inputfieldWrapper'>
        <div>
          <input
            className='inputfield'
            placeholder='Search for Series'
            type='text'
            onChange={(e) => handleSearch(e)}
          />
        </div>
        {showError && <p>Something went wrong</p>}
        <div className='showsWrapper'>
          {searchData.map((value) => {
            return (
              <Link to={`/show/${value.show.id}`}>
                <div className='show' key={value.show.id}>
                  <img src={value.show.image?.medium} alt='tv show' />
                  <div>{value.show.name}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Series;
