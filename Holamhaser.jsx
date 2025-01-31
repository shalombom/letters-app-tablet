import React from 'react';
import './Holmhaser.css';

const HolmHaser = () => {
    return (
        <div className="warehouse-container">
            <div className="warehouse-row">
                <span>קמץ</span>
                <span>פתח</span>
                <span>צירה</span>
            </div>
            <div className="warehouse-row">
                <span>סגול</span>
                <span>שורק</span>
                <span className="holam">חיריק</span>
            </div>
            <div className="warehouse-row">
                <span>שווא</span>
                <span>חטף</span>
                <span>קובוץ</span>
            </div>
            <div className="warehouse-row">
                <span>תש</span>
                <span>אבוֹ</span>
                <span>גד</span>
            </div>
        </div>
    );
}

export default HolmHaser;