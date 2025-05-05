import './Loading.css';


import React from 'react'

const Loading = () => {
    return (
        <div className="cube-wrapper">
            <div className="cube-folding">
                <span className="leaf1"></span>
                <span className="leaf2"></span>
                <span className="leaf3"></span>
                <span className="leaf4"></span>
            </div>
            <span className="loading" data-name="Loading">Loading</span>
        </div>
    )
}

export default Loading

