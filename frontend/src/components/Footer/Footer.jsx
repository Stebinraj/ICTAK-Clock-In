import React from 'react';

const Footer = () => {
    return (
        <>
            <footer className='footer'>
                <div className=" text-center fixed-bottom">
                    <div className="-footer text-muted">
                        <h5>Copyright © {new Date().getFullYear()}</h5>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer