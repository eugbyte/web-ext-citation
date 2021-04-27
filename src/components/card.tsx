import React from "react";

interface Prop {
    children: any;
    className?: string;
    style?: Record<string, string | number>
}

export function Card({children, className, style}: Prop) {

    return <div className={`flex flex-col
        shadow-md
        rounded 
        ${className}`}
        style={style}>
        {children}
    </div>
}