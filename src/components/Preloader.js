import React from 'react'

const Preloader = () => {
    return (
        <div className="preloader">
            <svg className="preloader-image">
                <use xlinkHref="#icon-refresh" />
            </svg>
        </div>
    )
}

Preloader.displayName = 'Preloader'

export default Preloader
