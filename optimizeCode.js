import React, { useState, useCallback, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item component
const WrappedSingleListItem = memo(({ index, isSelected, onClickHandler, text }) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={() => onClickHandler(index)}
    >
      {text}
    </li>
  );
});

// Declare required props and their types for Single List Item component
WrappedSingleListItem.propTypes = {
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

// List component
const WrappedListComponent = memo(({ items = [] }) => {
  // Declare selected index state
  const [selectedIndex, setSelectedIndex] = useState();

  // Reset selected index state when items prop changes
  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  // Memoized click handler using useCallback
  const handleClick = useCallback(
    (index) => {
      // Update selected index only if it's not equal to the clicked item index
      if (selectedIndex !== index) {
        setSelectedIndex(index);
      }
    },
    [selectedIndex, setSelectedIndex]
  );

  return (
    <ul style={{ textAlign: 'left' }}>
      {/* Render list items only if items prop exists */}
      {items?.map((item, index) => (
        <WrappedSingleListItem
          key={index} // Add key prop with unique index value
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex === index}
        />
      ))}
    </ul>
  );
});

// Declare required props and their types for List component
WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};

// Default props for List component
WrappedListComponent.defaultProps = {
  items: null,
};

export default WrappedListComponent;