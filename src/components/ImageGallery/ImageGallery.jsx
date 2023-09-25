import { useState, useEffect } from 'react';
import { fetchImagesWithQuery } from 'services/api';
import { Button, ImageGalleryItem, Loader, Modal } from 'components';
import '../../styles.css';

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [pages, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');

  // useEffect(() => {
  //   const query = this.props.searchQuery;
  //   if (query !== prevProps.searchQuery) {
  //     (setImages([])), setPages(1), () => {
  //       fetchImages(query, 1);
  //     }
  //   }
  //   if (pages => !pages) {
  //     loadMoreImages(query, page)
  //   }
  // }, [query, pages, fetchImages ]);

  //   useEffect(() => {
  //   (async fetchImages(query, page) {
  //     setIsLoading(true)};
  //     try {
  //       const response = await fetchImagesWithQuery(query, page);
  //       const data = response.data.hits;
  //       const totalPages = Math.floor(response.data.total / 12);
  //       setImages(data);
  //       setPages(1);
  //       setTotalPages(totalPages);
  //     } catch (error) {
  //       setError({ error });
  //     } finally {
  //       setIsLoading(false );
  //     })
  //   }, []);

  //     async loadMoreImages(query, page) {
  //     setIsLoading(true);
  //       try {
  //         const response = await fetchImagesWithQuery(query, page);
  //         const data = response.data.hits;
  //         setImages(prev => [...prev, ...data]);
  //       } catch (error) {
  //         setError({ error });
  //       } finally {
  //         setIsLoading(false );
  //       }
  //     }

  const handleLoadMore = () => {
    setPages(prev => prev + 1);
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
      {pages < totalPages && (
        <Button onClick={handleLoadMore}>Load more</Button>
      )}
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
