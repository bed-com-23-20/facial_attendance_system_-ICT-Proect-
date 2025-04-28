import React from 'react';
import PropTypes from 'prop-types';

const CircularProgressBar = ({ size, progress, strokeWidth, color }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg
            width={size}
            height={size}
            className="block mx-auto"
        >
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#e6e6e6"
                strokeWidth={strokeWidth}
                fill="none"
                className="opacity-50"
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-300"
            />
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fill={color}
                className="font-medium"
            >
                {`${progress}%`}
            </text>
        </svg>
    );
};

CircularProgressBar.propTypes = {
    size: PropTypes.number.isRequired,
    progress: PropTypes.number.isRequired,
    strokeWidth: PropTypes.number,
    color: PropTypes.string,
};

CircularProgressBar.defaultProps = {
    strokeWidth: 10,
    color: '#4caf50',
};

export default CircularProgressBar;