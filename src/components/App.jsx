import { ImageGallery, SearchBar } from 'components';
import { useState } from 'react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = query => setSearchQuery(query);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <ImageGallery searchQuery={searchQuery} />
    </>
  );
}
