
import HeroSection from '../components/home/HeroSection';
import TrustedOrganizations from '../components/home/TrustedOrganizations';
import PopularServices from '../components/home/PopularServices';
import CtaBanner from '../components/home/CtaBanner';
import Footer from '../components/home/Footer';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <TrustedOrganizations />
      <PopularServices/>
      <CtaBanner />
      <Footer />
    </div>
  );
}