import { useState } from 'react'

export default function Intro({ children }) {
    const [clicked, setClicked] = useState(false);

    const handleContinueClick = () => {
        setClicked(true)
    }

    return (
        <>
            {clicked ? (
                children
            ) : (
                <div className="fullscreen bg">
                    <div className="stack">
                        <a href="#" onClick={handleContinueClick}>
                            Cliquez pour continuer
                        </a>
                    </div>
                </div>
            )}
        </>
    )
}
