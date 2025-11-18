"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        async function fetchCharacters() {
            setLoading(true);
            setError(null);
            setSuccess(false);

            try {
                const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
                if (!res.ok) {
                    throw new Error("Error al obtener personajes");
                }
                const data = await res.json();
                setCharacters(data.results);
                setInfo(data.info);
                setSuccess(true);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchCharacters();
    }, [page]);

    return (
        <main className="container py-4">
            <h1 className="mb-4 text-center" style={{ color: "var(--color-primary)" }}>
                Rick and Morty — Personajes
            </h1>

            {/*Status messages */}
            {loading && <SkeletonGrid />}
            {error && (
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            )}
            {success && !loading && (
                <div className="row g-4">
                    {characters.map((char) => (
                        <div key={char.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <CharacterCard character={char} />
                        </div>
                    ))}
                </div>
            )}

            {/*Bootstrap Pagination */}
            {info && (
                <nav aria-label="Page navigation" className="mt-4">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${!info?.prev ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                style={{
                                    backgroundColor: "var(--color-primary)",
                                    color: "var(--color-accent)",
                                    borderColor: "var(--color-primary)",
                                }}
                                onClick={() => setPage(page - 1)}
                                disabled={!info?.prev}
                            >
                                Anterior
                            </button>
                        </li>
                        <li className="page-item disabled">
              <span
                  className="page-link"
                  style={{
                      backgroundColor: "var(--color-dark)",
                      color: "var(--color-accent)",
                  }}
              >
                Página {page}
              </span>
                        </li>
                        <li className={`page-item ${!info?.next ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                style={{
                                    backgroundColor: "var(--color-secondary)",
                                    color: "#fff",
                                    borderColor: "var(--color-secondary)",
                                }}
                                onClick={() => setPage(page + 1)}
                                disabled={!info?.next}
                            >
                                Siguiente
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </main>
    );
}

function CharacterCard({ character }) {
    return (
        <article
            className="card h-100 shadow-sm"
            style={{ borderColor: "var(--color-primary)" }}
        >
            <img
                src={character.image}
                alt={character.name}
                className="card-img-top"
                style={{ objectFit: "cover", height: "300px" }}
            />
            <div
                className="card-body"
                style={{
                    backgroundColor: "var(--color-accent)",
                    color: "var(--color-dark)",
                }}
            >
                <h5 className="card-title" style={{ color: "var(--color-primary)" }}>
                    {character.name}
                </h5>
                <p className="card-text mb-1">
                    <strong>Species:</strong> {character.species}
                </p>
                <p className="card-text mb-1">
                    <strong>Gender:</strong> {character.gender}
                </p>
                <p className="card-text">
                    <strong>State:</strong> {character.status}
                </p>
            </div>
        </article>
    );
}

/* Skeleton Loader */
function SkeletonGrid() {
    const skeletons = Array.from({ length: 8 });
    return (
        <div className="row g-4">
            {skeletons.map((_, i) => (
                <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div
                        className="card h-100 shadow-sm"
                        style={{ borderColor: "var(--color-primary)" }}
                    >
                        <div
                            className="card-img-top"
                            style={{
                                backgroundColor: "#e0e0e0",
                                height: "300px",
                            }}
                        ></div>
                        <div className="card-body">
                            <div
                                style={{
                                    backgroundColor: "#e0e0e0",
                                    height: "20px",
                                    width: "60%",
                                    marginBottom: "10px",
                                }}
                            ></div>
                            <div
                                style={{
                                    backgroundColor: "#e0e0e0",
                                    height: "15px",
                                    width: "80%",
                                    marginBottom: "6px",
                                }}
                            ></div>
                            <div
                                style={{
                                    backgroundColor: "#e0e0e0",
                                    height: "15px",
                                    width: "50%",
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
