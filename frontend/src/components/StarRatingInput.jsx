import React, { useState } from 'react';

export default function StarRatingInput({ initialValue = 0, onChange, readOnly = false }) {
  const [hoverValue, setHoverValue] = useState(null);

  return (
    <div style={{ display: 'inline-block' }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isLit = hoverValue !== null ? star <= hoverValue : star <= initialValue;
        return (
          <span
            key={star}
            onClick={() => !readOnly && onChange && onChange(star)}
            onMouseEnter={() => !readOnly && setHoverValue(star)}
            onMouseLeave={() => !readOnly && setHoverValue(null)}
            style={{
              fontSize: '24px',
              cursor: readOnly ? 'default' : 'pointer',
              color: isLit ? '#ffc107' : '#e4e5e9',
              transition: 'color 0.15s ease'
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
