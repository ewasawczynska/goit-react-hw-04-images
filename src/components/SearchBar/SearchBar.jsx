import PropTypes from 'prop-types';
import { SearchForm } from 'components';
import '../../styles.css';

export const SearchBar = ({ onSubmit }) => {
  const handleSubmit = query => {
    onSubmit(query);
  };

  return (
    <header className="Searchbar">
      <SearchForm onSubmit={handleSubmit} />
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
