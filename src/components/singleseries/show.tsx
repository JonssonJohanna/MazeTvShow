import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

type iShow = {
  name: string;
  language: string;
  summary: string;
  image?: {
    original: string;
  };
};

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
      <h1>Single serie page</h1>
      <p>{singleShow.name}</p>
      <div dangerouslySetInnerHTML={{ __html: singleShow.summary }}></div>

      <img src={singleShow.image?.original} alt='tv show' />
      <button onClick={goBack}>Back</button>
    </div>
  );
};

export default Show;
