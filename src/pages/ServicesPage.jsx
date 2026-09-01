import { useEffect, useState } from 'react';

import ServiceHeader from '../components/services/ServiceHeader';
import CategoryFilter from '../components/services/CategoryFilter';
import ServiceCard from '../components/services/ServiceCard';
import RequestServiceBanner from '../components/services/RequestServiceBanner';

import { getServices } from '../api/serviceApi';

import Loading from '../components/common/Loader/Loading';
import Error from '../components/common/Error/Error';

const ServicesPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const servicesData = await getServices();

        console.log(servicesData);

        setData(servicesData);
      } catch (error) {
        console.log(error.message);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  const categories = [
  'All',
  ...new Set(data.map((service) => service.category))
];

console.log(categories);
  const filteredServices = data.filter((service) => {
    const matchesCategory =
      activeCategory === 'All' ||
      service.category === activeCategory;

    const query = searchQuery.toLowerCase().trim();

    const matchesSearch =
      service.name.toLowerCase().includes(query) ||
      service.contact.address.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loading />
      </div>
    );
  }

  if (errorMessage) {
    return <Error message={errorMessage} />;
  }

  return (
    <div
      style={{
        backgroundColor: '#f8fafc',
        minHeight: '100vh',
        padding: '32px 16px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <ServiceHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <div
          style={{
            fontSize: '14px',
            color: '#64748b',
            marginBottom: '20px',
          }}
        >
          Showing{' '}
          <strong style={{ color: '#0f172a' }}>
            {filteredServices.length}
          </strong>{' '}
          services
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}
        </div>

        <RequestServiceBanner />
      </div>
    </div>
  );
};

export default ServicesPage;