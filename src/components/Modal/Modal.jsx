import PropTypes from 'prop-types';

export const Modal = ({ largeImageURL, tags, onClick }) => {
  return (
    <div className="Overlay">
      <div className="Modal">
        <img
          className="modal__image"
          src={largeImageURL}
          alt={tags}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
