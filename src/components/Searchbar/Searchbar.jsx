import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonLabel, Header, Input, SearchButton, SearchForm} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      alert('Please enter something');
      return;
    }
    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </SearchButton>

        <Input
          value={inputValue}
          onChange={handleChange}
          type="text"
          name="inputValue"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default Searchbar;
