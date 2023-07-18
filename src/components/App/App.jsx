import React, { useState, useEffect } from 'react';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import Searchbar from 'components/Searchbar/Searchbar';
import getImages from 'services/api';
import { AppDiv } from './App.styled';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [status, setStatus] = useState('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [loadMore, setLoadMore] = useState(null);

  const getInputValue = (value) => {
    setInputValue(value);
    setPage(1);
    setPictures([]);
  };

  const getLargeImgUrl = (imgUrl) => {
    setSelectedImageUrl(imgUrl);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchImages = () => {
      setIsLoading(true);

      getImages(inputValue, page)
        .then((data) => {
          const { hits } = data;
          if (hits.length === 0) {
            setStatus('idle');
            setIsLoading(false);
          } else {
            setPictures((prevPictures) => [...prevPictures, ...hits]);
            setStatus('idle');
            setLoadMore(12 - hits.length);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
          setStatus('error');
          setIsLoading(false);
        });
    };

    if (inputValue) {
      fetchImages();
    } else {
      setPictures([]);
    }
  }, [page, inputValue]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setStatus('loading');
  };

  return (
    <AppDiv>
      <Searchbar onSubmit={getInputValue} />
      {status === 'loading' && <Loader />}
      {status === 'error' && <p>Error occurred.</p>}
      {showModal && <Modal imgUrl={selectedImageUrl} onClose={toggleModal} />}
      {inputValue && (
        <ImageGallery
          pictures={pictures}
          onLoadMore={handleLoadMore}
          onClick={getLargeImgUrl}
          loadMore={loadMore}
        />
      )}
    </AppDiv>
  );
};

export default App;
