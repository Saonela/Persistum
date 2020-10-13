import React, {useEffect, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import {ArrowUpward} from "@material-ui/icons";
import "./ScrollToTopButton.css"

const MIN_SCROLL_TOP = 700;

function ScrollToTopButton({containerRef}) {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = containerRef.current;
        const onScroll = (e) => {
            setVisible(e.target.scrollTop >= MIN_SCROLL_TOP)
        };

        element.addEventListener('scroll', onScroll);
        return () => {
            element.removeEventListener('scroll', onScroll);
        }
    }, []);

    const scrollToTop = () => {
        containerRef.current.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
        <IconButton className={`app-border scroll-to-top-button ${visible ?'scroll-to-top-button--visible' : null}`}
                    title="Scroll to top"
                    aria-label="Scroll to top"
                    onClick={scrollToTop}>
            <ArrowUpward/>
        </IconButton>
    )
}

export default ScrollToTopButton;
