
const styles = {
  header: {
    marginBottom: '24px',
    fontFamily: 'sans-serif'
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 6px 0'
  },
  subtitle: {
    color: '#6b7280',
    fontSize: '14px',
    margin: '0 0 20px 0'
  },
  row: {
    display: 'flex',
    gap: '12px'
  },
  inputWrapper: {
    position: 'relative',
    flex: 1
  },
  icon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '16px',
    height: '16px',
    color: '#9ca3af'
  },
  input: {
    width: '100%',
    padding: '10px 14px 10px 40px',
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  filterBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    background: '#fff',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    cursor: 'pointer'
  }
};

const ServiceHeader = ({ searchQuery, setSearchQuery}) => {
  return (
    <div style={styles.header}>
      <h1 style={styles.title}>Find a Service</h1>
      <p style={styles.subtitle}>
        Choose a service and book an appointment at a time that works for you.
      </p>

      <div style={styles.row}>
        <div style={styles.inputWrapper}>
          <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search services, providers, or locations..."
            value={searchQuery}
            onChange={(e)=> setSearchQuery(e.target.value)}
            style={styles.input}
          />
        </div>
        <button style={styles.filterBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          Filters
        </button>
      </div>
    </div>
  );
};

export default ServiceHeader;