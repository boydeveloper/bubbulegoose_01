import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/index';
import Preloader from '../utils/Preloader';
import useGetData from '../hooks/useGetData';
import Header from '../containers/header/Header';

function Home() {
  const navigate = useNavigate();
  const { cards, loading } = useGetData();
  return (
    <>
      <Header />
      <section className="section-mirrors">
        <div className="container">
          <p className="section-subtext">Recent Uploads</p>
          {loading ? (
            <Preloader />
          ) : cards && cards?.length > 0 ? (
            <>
              <div className="grid--3--cols" id="image-container">
                <Card
                  cards={cards

                    .sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate())
                    .slice(0, 6)}
                />
              </div>
              <div className="text-center">
                <button
                  className="viewMore"
                  onClick={() => navigate('/gallery')}
                >
                  {' '}
                  View ballers mirror
                </button>
              </div>
            </>
          ) : (
            <div className="error">
              <h1>Arts not Found</h1>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
