'use client';
export default function Error({reset}:{reset:()=>void}){return <main className="setup"><p className="eyebrow">IMIKIA</p><h1>We couldn’t load the website content.</h1><p>The database may be unavailable or not configured. Please try again shortly.</p><button className="button" onClick={reset}>Try again</button></main>}
