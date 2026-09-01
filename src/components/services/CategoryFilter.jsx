
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    gap: '16px',
    flexWrap: 'wrap'
  },
  list: {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto'
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s'
  },
  dropdown: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 14px',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '13px',
    color: '#374151',
    cursor: 'pointer',
    background: '#fff'
  }
};

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {

  return (
    <div style={styles.container}>
      <div style={styles.list}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                ...styles.btn,
                backgroundColor: isActive ? '#0070f3' : '#f3f4f6',
                color: isActive ? '#ffffff' : '#374151',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;