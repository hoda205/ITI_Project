
const styles = {
  banner: {
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '16px',
    padding: '20px 24px',
    marginTop: '32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 4px 0'
  },
  subtitle: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0
  },
  btn: {
    backgroundColor: '#0284c7',
    color: '#fff',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  }
};

const RequestServiceBanner = () => {
  return (
    <div style={styles.banner}>
      <div>
        <h3 style={styles.title}>Can't find what you're looking for?</h3>
        <p style={styles.subtitle}>
          We're adding new service providers every week. Request a service and we'll notify you when it's available.
        </p>
      </div>
      <button style={styles.btn}>Request a Service</button>
    </div>
  );
};

export default RequestServiceBanner;