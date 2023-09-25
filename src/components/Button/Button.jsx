import PropTypes from 'prop-types';
import { Container } from 'components/Container';
import '../../styles.css';

export const Button = ({ onClick, children }) => {
  return (
    <Container>
      <button className="Button" type="button" onClick={onClick}>
        {children}
      </button>
    </Container>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
