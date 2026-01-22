import { NextResponse } from 'next/server';

export async function GET() {
    const url = 'https://rickandmortyapi.com/api/character';

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
        return NextResponse.json({ error: 'Error fetching characters' }, { status: res.status });
    }

    const data = await res.json();

    // Normalize results
    const characters = (data.results ?? []).map((c: any) => ({
        id: c.id,
        name: c.name,
        species: c.species,
        gender: c.gender,
        image: c.image,
        status: c.status,
    }));

    return NextResponse.json({ characters });
}
