"use client"

import { JSX, useEffect } from "react";

interface ErrorBoundaryProps {
    error: Error & { digest?: string };
    reset: () => void
}
    
export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps): JSX.Element {
    useEffect(() => {
        console.error(error)
    }, [error])
    return (
        <div>
            <h2>Something went wrong!</h2>
            <button type="button" onClick={(): void => reset()}>Try again</button>
        </div>
    )
};