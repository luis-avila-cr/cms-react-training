import Comic from './components/Comic/Comic';
import comics from './data/comics';

export default function Home() {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
            padding: '2rem'
        }}>
            {comics.map(comic => (
                <Comic key={comic.id} comic={comic} />
            ))}
        </div>
    );
}
