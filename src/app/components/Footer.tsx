import Image from 'next/image';
import React from 'react';

const Footer = () => {
    return (
        <div className='w-full h-auto bg-gray-900 p-4 flex flex-col items-center justify-center'>
            <div className='flex items-center gap-2'>
                <p className='text-white'>Powered By Gemini</p>
                <Image
                    src="https://www.gstatic.com/lamda/images/gemini_sparkle_red_4ed1cbfcbc6c9e84c31b987da73fc4168aec8445.svg"
                    alt="Gemini Logo"
                    height={25}
                    width={25}
                />
            </div>
        </div>
    );
};

export default Footer;
