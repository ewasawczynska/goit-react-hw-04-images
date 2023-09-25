import PropTypes from 'prop-types';
import '../../styles.css';

export const ImageGalleryItem = props => {
  const { webformatURL, largeImageURL, tags, onClick } = props;

  const imageClick = () => {
    onClick({ largeImageURL, webformatURL, tags });
  };

  return (
    <li className="ImageGalleryItem" data-url={largeImageURL}>
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt={tags}
        onClick={imageClick}
        loading="lazy"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
