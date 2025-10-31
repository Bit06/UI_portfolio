import React from 'react';
import { LaptopFrame } from './LaptopFrame';
import { PhoneFrame } from './PhoneFrame';

interface CompositeFrameProps {
    laptopSrc: string;
    laptopAlt: string;
    isLaptopScrollable?: boolean;
    phoneSrc: string;
    phoneAlt: string;
    isPhoneScrollable?: boolean;
}

export const CompositeFrame: React.FC<CompositeFrameProps> = ({
    laptopSrc,
    laptopAlt,
    isLaptopScrollable,
    phoneSrc,
    phoneAlt,
    isPhoneScrollable
}) => {
    return (
        <div className="relative flex justify-center items-center">
            <div className="relative w-full z-0 pr-12 sm:pr-24">
                <LaptopFrame 
                    src={laptopSrc} 
                    alt={laptopAlt} 
                    isScrollable={isLaptopScrollable} 
                />
            </div>
            <div className="absolute right-0 bottom-4 w-1/3 max-w-[160px] sm:max-w-xs z-10">
                <PhoneFrame 
                    src={phoneSrc} 
                    alt={phoneAlt} 
                    isScrollable={isPhoneScrollable} 
                />
            </div>
        </div>
    );
};