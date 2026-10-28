import { useMemo, useState } from 'react';
import {
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Film,
  Heart,
  Home,
  MapPin,
  Menu,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Ticket,
  UserRound,
  X,
} from 'lucide-react';

type Movie = {
  id: number;
  title: string;
  genre: string;
  year: string;
  duration: string;
  rating: string;
  accent: string;
  image: string;
  description: string;
};

const movies: Movie[] = [
  {
    id: 1,
    title: 'The Last Light',
    genre: 'Drama · Mystery',
    year: '2024',
    duration: '2h 08m',
    rating: '8.7',
    accent: '#e8b968',
    image: 'https://images.pexels.com/photos/25746381/pexels-photo-25746381.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'When the last lighthouse keeper disappears, a young photographer follows a trail of light into a town that forgot how to leave.',
  },
  {
    id: 2,
    title: 'Northbound',
    genre: 'Adventure · Indie',
    year: '2024',
    duration: '1h 52m',
    rating: '8.2',
    accent: '#86a98d',
    image: 'https://images.pexels.com/photos/15766210/pexels-photo-15766210.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Two estranged siblings take the long way home, finding a new map for everything they thought they had lost.',
  },
  {
    id: 3,
    title: 'After the Applause',
    genre: 'Romance · Music',
    year: '2023',
    duration: '1h 46m',
    rating: '7.9',
    accent: '#c98b7e',
    image: 'https://images.pexels.com/photos/7991128/pexels-photo-7991128.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'A final encore becomes the beginning of an unexpected love story beneath the velvet curtain.',
  },
  {
    id: 4,
    title: 'Distant Signals',
    genre: 'Sci-fi · Thriller',
    year: '2024',
    duration: '2h 14m',
    rating: '8.5',
    accent: '#7791b6',
    image: 'https://images.pexels.com/photos/24770280/pexels-photo-24770280.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'A radio astronomer hears a signal that sounds less like a message and more like a warning.',
  },
];

const dates = [
  { day: 'TODAY', date: '24', month: 'JUN' },
  { day: 'WED', date: '25', month: 'JUN' },
  { day: 'THU', date: '26', month: 'JUN' },
  { day: 'FRI', date: '27', month: 'JUN' },
];

const times = ['10:30 AM', '1:15 PM', '4:40 PM', '7:20 PM', '9:55 PM'];
const occupiedSeats = ['A3', 'A4', 'B6', 'C2', 'C3', 'D7', 'E5', 'F1', 'F2', 'G8'];

function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [search, setSearch] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState('7:20 PM');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [booked, setBooked] = useState(false);
  const [liked, setLiked] = useState<number[]>([]);

  const filteredMovies = useMemo(() => movies.filter((movie) => `${movie.title} ${movie.genre}`.toLowerCase().includes(search.toLowerCase())), [search]);

  const toggleSeat = (seat: string) => {
    if (occupiedSeats.includes(seat)) return;
    setSelectedSeats((current) => current.includes(seat) ? current.filter((item) => item !== seat) : [...current, seat]);
  };

  const toggleLike = (id: number) => {
    setLiked((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const openMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setBooked(false);
    setSelectedSeats([]);
  };

  const closeMovie = () => {
    setSelectedMovie(null);
    setSelectedSeats([]);
    setBooked(false);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark"><Film size={18} /></span><span>movié</span></div>
        <div className="location"><MapPin size={15} /><span>New York, NY</span><ChevronRight size={14} /></div>
        <nav className="side-nav">
          {[['Home', Home], ['Explore', Sparkles], ['My Tickets', Ticket]].map(([label, Icon]) => (
            <button className={`side-link ${activeTab === label ? 'active' : ''}`} key={label as string} onClick={() => setActiveTab(label as string)}>
              <Icon size={18} /><span>{label as string}</span>{label === 'My Tickets' && <span className="nav-count">2</span>}
            </button>
          ))}
        </nav>
        <div className="side-divider" />
        <p className="side-caption">YOUR ACCOUNT</p>
        <button className="side-link"><Heart size={18} /><span>Watchlist</span></button>
        <button className="side-link"><UserRound size={18} /><span>Profile</span></button>
        <div className="sidebar-bottom"><div className="help-card"><ShieldCheck size={18} /><div><strong>Need help?</strong><span>Visit our support center</span></div><ChevronRight size={15} /></div><p className="version">movié / v1.0</p></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><button className="mobile-menu"><Menu size={21} /></button><div className="breadcrumbs"><span>Home</span><ChevronRight size={14} /><strong>{activeTab}</strong></div><div className="top-actions"><button className="icon-button"><Bell size={19} /><i /></button><div className="avatar">AM</div></div></header>

        {activeTab === 'My Tickets' ? <TicketsView onBrowse={() => setActiveTab('Home')} /> : <>
          <section className="hero">
            <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /> FEATURED THIS WEEK</div><h1>Every story<br /><em>deserves</em> a screen.</h1><p>Find your next favorite film. Reserve your seat. Make it a night to remember.</p><div className="hero-actions"><button className="primary-button" onClick={() => openMovie(movies[0])}>Book a ticket <ChevronRight size={17} /></button><button className="play-button"><span><Play size={13} fill="currentColor" /></span> Watch trailer</button></div></div><div className="hero-poster"><img src={movies[0].image} alt="The Last Light" /><div className="poster-overlay" /><div className="poster-info"><span>NOW SHOWING</span><strong>The Last Light</strong><small>Drama · Mystery &nbsp; / &nbsp; 2h 08m</small></div><button className="poster-play"><Play size={19} fill="currentColor" /></button></div><div className="hero-note"><span>01</span><div /><span>04</span></div></section>

          <section className="content-section"><div className="section-heading"><div><p className="section-kicker">CURATED FOR YOU</p><h2>{activeTab === 'Explore' ? 'Explore all films' : 'Now showing'}</h2></div><div className="search-box"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search movies..." /></div></div><div className="filter-row"><button className="filter active">All films</button><button className="filter">Playing today</button><button className="filter">Coming soon</button><span className="result-count">{filteredMovies.length} films</span></div><div className="movie-grid">{filteredMovies.map((movie) => <MovieCard key={movie.id} movie={movie} liked={liked.includes(movie.id)} onLike={() => toggleLike(movie.id)} onOpen={() => openMovie(movie)} />)}</div></section>

          <section className="cinema-banner"><div className="banner-image"><img src="https://images.pexels.com/photos/7991318/pexels-photo-7991318.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="People watching a movie in a cinema" /></div><div className="banner-copy"><p className="section-kicker">THE MOVIÉ EXPERIENCE</p><h2>Your seat is waiting.</h2><p>Premium sound, thoughtful spaces, and the little details that make a movie night feel like an occasion.</p><button className="text-button">Discover our cinemas <ChevronRight size={16} /></button></div><div className="banner-stat"><strong>12</strong><span>cinemas<br />near you</span></div></section>
        </>}
      </main>

      {selectedMovie && <BookingModal movie={selectedMovie} booked={booked} selectedDate={selectedDate} selectedTime={selectedTime} selectedSeats={selectedSeats} onDate={setSelectedDate} onTime={setSelectedTime} onSeat={toggleSeat} onClose={closeMovie} onBook={() => setBooked(true)} />}
    </div>
  );
}

function MovieCard({ movie, liked, onLike, onOpen }: { movie: Movie; liked: boolean; onLike: () => void; onOpen: () => void }) {
  return <article className="movie-card"><button className="movie-image" onClick={onOpen}><img src={movie.image} alt={movie.title} /><span className="rating"><span>★</span> {movie.rating}</span><span className="quick-book">View details <ChevronRight size={14} /></span></button><div className="movie-meta"><div><h3>{movie.title}</h3><p>{movie.genre} <span>·</span> {movie.duration}</p></div><button className={`heart-button ${liked ? 'liked' : ''}`} onClick={onLike}><Heart size={17} fill={liked ? 'currentColor' : 'none'} /></button></div></article>;
}

function BookingModal({ movie, booked, selectedDate, selectedTime, selectedSeats, onDate, onTime, onSeat, onClose, onBook }: { movie: Movie; booked: boolean; selectedDate: number; selectedTime: string; selectedSeats: string[]; onDate: (value: number) => void; onTime: (value: string) => void; onSeat: (value: string) => void; onClose: () => void; onBook: () => void }) {
  return <div className="modal-backdrop"><div className="booking-modal"><button className="close-button" onClick={onClose}><X size={19} /></button>{booked ? <div className="success-state"><span className="success-icon"><Check size={30} /></span><p className="section-kicker">BOOKING CONFIRMED</p><h2>Enjoy the show.</h2><p>Your tickets for <strong>{movie.title}</strong> are ready. We sent the details to your account.</p><div className="ticket-summary"><span><CalendarDays size={16} /> {dates[selectedDate].day}, {dates[selectedDate].date} {dates[selectedDate].month}</span><span><Clock3 size={16} /> {selectedTime}</span><span><Ticket size={16} /> {selectedSeats.length} {selectedSeats.length === 1 ? 'seat' : 'seats'}</span></div><button className="primary-button" onClick={onClose}>Done <ChevronRight size={17} /></button></div> : <><div className="booking-head"><div><p className="section-kicker">RESERVE YOUR SEAT</p><h2>{movie.title}</h2><p>{movie.genre} <span>·</span> {movie.duration}</p></div><div className="booking-rating">★ {movie.rating}</div></div><div className="booking-step"><div className="step-label"><span>01</span><strong>Choose a date</strong></div><div className="date-row">{dates.map((date, index) => <button key={date.date} className={`date-option ${selectedDate === index ? 'selected' : ''}`} onClick={() => onDate(index)}><small>{date.day}</small><strong>{date.date}</strong><small>{date.month}</small></button>)}</div></div><div className="booking-step"><div className="step-label"><span>02</span><strong>Choose a showtime</strong></div><div className="time-row">{times.map((time) => <button key={time} className={`time-option ${selectedTime === time ? 'selected' : ''}`} onClick={() => onTime(time)}>{time}</button>)}</div></div><div className="booking-step seat-step"><div className="step-label"><span>03</span><strong>Pick your seats <small>{selectedSeats.length ? `${selectedSeats.length} selected` : 'Select up to 6'}</small></strong></div><div className="screen"><span>SCREEN</span></div><div className="seat-grid">{['A','B','C','D','E','F','G'].map((row) => <div className="seat-row" key={row}><span className="row-label">{row}</span>{Array.from({ length: 8 }, (_, index) => `${row}${index + 1}`).map((seat) => <button key={seat} aria-label={`Seat ${seat}`} className={`seat ${occupiedSeats.includes(seat) ? 'occupied' : ''} ${selectedSeats.includes(seat) ? 'selected' : ''}`} onClick={() => onSeat(seat)} />)}</div>)}</div><div className="seat-legend"><span><i className="available" /> Available</span><span><i className="chosen" /> Selected</span><span><i className="taken" /> Taken</span></div></div><div className="booking-footer"><div><small>Total</small><strong>${selectedSeats.length * 16 || 0}.00</strong></div><button className="primary-button" disabled={!selectedSeats.length} onClick={onBook}>Confirm seats <ChevronRight size={17} /></button></div></>}</div></div>;
}

function TicketsView({ onBrowse }: { onBrowse: () => void }) {
  return <section className="tickets-view"><div className="section-kicker">YOUR MOVIÉ</div><h1>Your tickets.</h1><p className="tickets-intro">Everything you have coming up, in one place.</p><div className="ticket-list"><div className="ticket-card featured-ticket"><div className="ticket-date"><strong>28</strong><span>JUN</span></div><div className="ticket-details"><span className="ticket-status">UPCOMING</span><h3>Northbound</h3><p><CalendarDays size={14} /> Saturday, June 28 · 7:20 PM</p><p><MapPin size={14} /> Movié House · Screen 04</p></div><div className="ticket-qr"><div className="qr-pattern" /><span>View ticket</span></div></div><div className="ticket-card"><div className="ticket-date muted"><strong>16</strong><span>JUN</span></div><div className="ticket-details"><span className="ticket-status past">WATCHED</span><h3>The Last Light</h3><p><CalendarDays size={14} /> Monday, June 16 · 4:40 PM</p><p><MapPin size={14} /> Movié House · Screen 02</p></div><div className="ticket-score">★ 8.7</div></div></div><button className="text-button" onClick={onBrowse}>Browse more films <ChevronRight size={16} /></button></section>;
}

export default App;
