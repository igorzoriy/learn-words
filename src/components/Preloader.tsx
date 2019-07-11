import React from "react"

const Preloader: React.FunctionComponent = () => {
    return (
        <div className="preloader">
            <svg className="preloader-image">
                <use xlinkHref="#icon-refresh" />
            </svg>
        </div>
    )
}

export default Preloader
