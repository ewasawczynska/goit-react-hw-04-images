import { MagnifyingGlass } from 'react-loader-spinner';
import { Container } from 'components';

export const Loader = () => {
  return (
    <Container>
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#3f51b5"
      />
    </Container>
  );
};
