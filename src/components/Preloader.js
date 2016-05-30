import React from 'react'
import Component from './Component'

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
