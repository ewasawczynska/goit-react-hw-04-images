import { Component } from 'react';
import { fetchImagesWithQuery } from 'services/api';
import { Button, ImageGalleryItem, Loader, Modal } from 'components';
import '../../styles.css';

export class ImageGallery extends Component {
  state = {
    images: [],
    isLoading: false,
    isModalOpen: false,
    selectedImage: null,
    page: 1,
    totalPages: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const query = this.props.searchQuery;

    if (this.props.searchQuery !== prevProps.searchQuery) {
      this.setState({ images: [], page: 1 }, () => {
        this.fetchImages(query, 1);
      });
    }

    if (this.state.page !== prevState.page) {
      this.loadMoreImages(query, page);
    }
  }

  async fetchImages(query, page) {
    this.setState({ isLoading: true });
    try {
      const response = await fetchImagesWithQuery(query, page);
      const data = response.data.hits;
      const totalPages = Math.floor(response.data.total / 12);
      this.setState({
        images: data,
        page: 1,
        totalPages: totalPages,
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  async loadMoreImages(query, page) {
    this.setState({ isLoading: true });
    try {
      const response = await fetchImagesWithQuery(query, page);
      const data = response.data.hits;
      this.setState(prevState => ({ images: [...prevState.images, ...data] }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = image => {
    this.setState({ selectedImage: image, isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ selectedImage: null, isModalOpen: false });
  };

  render() {
    const { images, isLoading, page, selectedImage, totalPages } = this.state;
    return (
      <>
        <ul className="ImageGallery">
          {images.map(({ id, ...rest }) => (
            <ImageGalleryItem key={id} {...rest} onClick={this.openModal} />
          ))}
        </ul>
        {isLoading && <Loader />}
        {page < totalPages && (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        )}
        {selectedImage && (
          <Modal
            largeImageURL={this.state.selectedImage.largeImageURL}
            tags={this.state.selectedImage.tags}
            onClick={this.closeModal}
          />
        )}
      </>
    );
  }
}
