import { useState, useEffect, useCallback } from 'react';
import { Button, ImageGalleryItem, Loader, Modal } from 'components';
import '../../styles.css';
import axios from 'axios';

const searchParams = new URLSearchParams({
  key: '38224986-73ed753b6801a898f531e9036',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12,
});

export function ImageGallery({ searchQuery }) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchImages = useCallback(() => {
    setIsLoading(true);
    axios
      .get(
        `https://pixabay.com/api/?${searchParams}&q=${encodeURIComponent(
          searchQuery
        )}&page=${page}`
      )
      .then(response => {
        setImages(prev => [...prev, ...response.data.hits]);
        const totalPages = Math.floor(response.data.total / 12);
        setTotalPages(totalPages);
      })
      .catch(error => console.error('Houston, we have a problem:', error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchQuery, page]);

  useEffect(
    () => {
      if (searchQuery === '') return;
      fetchImages();
    },
    // eslint-disable-next-line
    [page]
  );

  useEffect(
    () => {
      if (searchQuery !== '') {
        setImages([]);
        fetchImages();
      }
    },
    // eslint-disable-next-line
    [searchQuery]
  );

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const openModal = image => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <ul className="ImageGallery">
        {images.map(({ id, ...rest }) => (
          <ImageGalleryItem key={id} {...rest} onClick={openModal} />
        ))}
      </ul>
      {isLoading && <Loader />}
      {page < totalPages && <Button onClick={handleLoadMore}>Load more</Button>}
      {selectedImage && (
        <Modal
          largeImageURL={selectedImage.largeImageURL}
          tags={selectedImage.tags}
          onClick={closeModal}
        />
      )}
    </>
  );
}
