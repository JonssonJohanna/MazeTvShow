import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

type iSeries = {
  score: number;
  show: {
    id: number;
    url: string;
    name: string;
    image?: {
      medium: string;
      original: string;
    };
  };
};

const Series = () => {
  const [searchData, setSearchData] = useState<iSeries[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

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
        console.log('Error try again: ' + error);
      });
  }, [searchQuery]);

  return (
    <>
      <div>
        <label>Search tv shows</label>
        <input type='text' onChange={(e) => handleSearch(e)} />
      </div>
      <div>
        {searchData.map((value) => {
          return (
            <Link to={`/show/${value.show.id}`}>
              <div key={value.show.id}>
                <div>{value.show.name}</div>
                <div>{value.show.url}</div>
                <img src={value.show.image?.medium} alt='tv show' />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Series;
