import PropTypes from 'prop-types';
import '../../styles.css';

export const SearchForm = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const query = e.target.elements.searchQuery.value;
    onSubmit(query);
  };

  return (
    <form className="SearchForm" onSubmit={handleSubmit}>
      <button className="SearchForm-button" type="submit">
        <span className="SearchForm-button-label">Search</span>
      </button>
      <input
        className="SearchForm-input"
        name="searchQuery"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
