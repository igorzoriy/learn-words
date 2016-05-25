import React, { Component } from 'react'

export default class MockupPage extends Component {
    render () {
        return (
            <div>
                <h1>
                    Add new phrase (default)
                </h1>
                <form>
                    <input type="text" className="form-control" placeholder="Phrase" />
                    <input type="text" className="form-control" placeholder="Translation" />
                    <button type="submit" className="btn btn-primary">
                        Add
                    </button>
                </form>

                <h1>
                    Add new phrase (loading)
                </h1>
                <form>
                    <input type="text" className="form-control" placeholder="Phrase" disabled />
                    <input type="text" className="form-control" placeholder="Translation" disabled />
                    <button type="submit" className="btn btn-primary" disabled>
                        Add
                    </button>
                    <svg className="icon-refresh spinner">
                        <use xlinkHref="#icon-refresh" />
                    </svg>
                </form>

                <h1>
                    Add new phrase (errors)
                </h1>
                <form>
                    <input type="text" className="form-control" placeholder="Phrase" />
                    <input type="text" className="form-control" placeholder="Translation" />
                    <button type="submit" className="btn btn-primary">
                        Add
                    </button>
                    <div className="alert alert-danger" role="alert">
                        Some error.
                    </div>
                </form>

                <h1>
                    Add new phrase (success)
                </h1>
                <form>
                    <input type="text" className="form-control" placeholder="Phrase" />
                    <input type="text" className="form-control" placeholder="Translation" />
                    <button type="submit" className="btn btn-primary">
                        Add
                    </button>
                    <div className="alert alert-success" role="alert">
                        The phrase has been added successfully.
                    </div>
                </form>

                <h1>
                    Phrases list
                </h1>
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="list-item-phrase">
                            Phrase 1
                        </div>
                        <div className="list-item-translation">
                            Translation 1
                        </div>
                        <div>
                            <a href="#" className="list-item-control">
                                <svg className="icon-edit">
                                    <use xlinkHref="#icon-edit" />
                                </svg>
                            </a>
                            <a href="#" className="list-item-control">
                                <svg className="icon-remove">
                                    <use xlinkHref="#icon-remove" />
                                </svg>
                            </a>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="list-item-phrase">
                            Phrase 2
                        </div>
                        <div className="list-item-translation">
                            Translation 2
                        </div>
                        <div>
                            <a href="#" className="list-item-control">
                                <svg className="icon-edit">
                                    <use xlinkHref="#icon-edit" />
                                </svg>
                            </a>
                            <a href="#" className="list-item-control">
                                <svg className="icon-remove">
                                    <use xlinkHref="#icon-remove" />
                                </svg>
                            </a>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="list-item-phrase">
                            Phrase 3
                        </div>
                        <div className="list-item-translation">
                            Translation 3
                        </div>
                        <div>
                            <a href="#" className="list-item-control">
                                <svg className="icon-edit">
                                    <use xlinkHref="#icon-edit" />
                                </svg>
                            </a>
                            <a href="#" className="list-item-control">
                                <svg className="icon-remove">
                                    <use xlinkHref="#icon-remove" />
                                </svg>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}
