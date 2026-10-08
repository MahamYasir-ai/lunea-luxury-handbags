import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchModal } from './components/search/SearchModal';
import { QuickViewModal } from './components/quickview/QuickViewModal';
import { WhatsAppVIPButton } from './components/ui/WhatsAppVIPButton';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { WishlistPage } from './pages/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AboutPage } from './pages/AboutPage';
import { JournalPage } from './pages/JournalPage';
import { JournalDetailPage } from './pages/JournalDetailPage';
import { ContactPage } from './pages/ContactPage';

function AppContent() {
  const { route, slug } = useNavigation();

  const renderCurrentPage = () => {
    switch (route) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product-detail':
        return <ProductDetailPage slug={slug} />;
      case 'collections':
        return <CollectionsPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'journal':
        return <JournalPage />;
      case 'journal-detail':
        return <JournalDetailPage slug={slug} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#07060A] text-[#F7F1E3] relative selection:bg-[#D6B25E]/30 selection:text-[#F6E3A3]">
      {/* Top Banner */}
      <AnnouncementBar />

      {/* Primary Sticky Header */}
      <Navbar />

      {/* Main Dynamic View with Page Motion */}
      <main className="flex-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {renderCurrentPage()}
      </main>

      {/* Overlays */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />
      <WhatsAppVIPButton />

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}
