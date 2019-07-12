import React, { FunctionComponent } from "react"

export const Preloader: FunctionComponent = () => (
    <div className="preloader">
        <svg className="preloader-image">
            <use xlinkHref="#icon-refresh" />
        </svg>
    </div>
)
