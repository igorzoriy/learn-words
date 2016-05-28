import React, { Component } from 'react'

export default class Preloader extends Component {
    render () {
        return (
            <div className="preloader">
                <svg className="preloader-image">
                    <use xlinkHref="#icon-refresh" />
                </svg>
            </div>
        )
    }
}
