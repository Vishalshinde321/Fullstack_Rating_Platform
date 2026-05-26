import React from 'react';

export default function SortableTable({ columns, data, onSortChange, currentSort }) {
  const handleHeaderClick = (key) => {
    if (!onSortChange) return;
    const direction = currentSort.key === key && currentSort.direction === 'ASC' ? 'DESC' : 'ASC';
    onSortChange(key, direction);
  };

  return (
    <div style={{ overflowX: 'auto', margin: '20px 0', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#343a40', color: '#fff' }}>
            {columns.map((col) => (
              <th 
                key={col.key} 
                onClick={() => col.sortable && handleHeaderClick(col.key)}
                style={{ padding: '12px 15px', cursor: col.sortable ? 'pointer' : 'default', userSelect: 'none' }}
              >
                {col.label}
                {col.sortable && currentSort.key === col.key && (
                  <span>{currentSort.direction === 'ASC' ? ' ▴' : ' ▾'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: '20px', textAlign: 'center', color: '#6c757d' }}>
                No records matching requirements found.
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={row.id || index} style={{ borderBottom: '1px solid #dee2e6', backgroundColor: index % 2 === 0 ? '#ff' : '#f8f9fa' }}>
                {columns.map((col) => (
                  <td key={col.key} style={{ padding: '12px 15px' }}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
