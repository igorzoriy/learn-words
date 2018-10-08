import * as React from "react"

const Preloader: React.StatelessComponent<{}> = () => {
    return (
        <div className="preloader">
            <svg className="preloader-image">
                <use xlinkHref="#icon-refresh" />
            </svg>
        </div>
    )
}

export default Preloader
