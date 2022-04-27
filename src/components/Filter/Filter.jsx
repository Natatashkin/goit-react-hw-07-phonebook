import React from 'react';
import IconButton from '../IconButton';
import { FilterWrapper, Input } from './Filter.styled';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from 'redux/contactsSelectors';
import { changeFilterValue, resetFilterValue } from 'redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectors.getFilterValue);

  const handleFilterChange = e => {
    dispatch(changeFilterValue(e.target.value));
  };

  return (
    <>
      <label htmlFor="filter">Find contact by name:</label>
      <FilterWrapper>
        <Input
          type="text"
          name="filter"
          value={filterValue}
          onChange={handleFilterChange}
        />
        {filterValue && (
          <IconButton
            color="blue"
            type="button"
            aria-label="Clear filter"
            onClick={() => dispatch(resetFilterValue())}
          >
            <FaTimes />
          </IconButton>
        )}
      </FilterWrapper>
    </>
  );
};

export default Filter;
