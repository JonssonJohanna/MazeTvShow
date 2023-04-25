import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './show.css';
import iShow from './interface';

const Show = () => {
  const [singleShow, setSingleShow] = useState<iShow>();
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const url = `https://api.tvmaze.com/shows/${id}`;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setSingleShow(response.data);
      })
      .catch((error) => {
        console.log('Error try again: ' + error);
      });
  }, [id]);

  if (!singleShow) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <button className='buttonBack' onClick={goBack}>
        Back to search results
      </button>
      <div className='showWrapper'>
        <h2>{singleShow.name}</h2>
        <p>Language {singleShow.language}</p>
        <div dangerouslySetInnerHTML={{ __html: singleShow.summary }}></div>
        <img className='image' src={singleShow.image?.original} alt='tv show' />
      </div>
    </div>
  );
};

export default Show;
