import { useEffect } from 'react';
import PropTypes from "prop-types";

export default function useEnterKeySubmit(inputRef, callBack) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter' && document.activeElement === inputRef.current) {
                // Trigger click on the submit button only if the input is focused
                callBack({e, ref: inputRef})
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [inputRef]);
}

useEnterKeySubmit.propTypes = {
    inputRef: PropTypes.oneOfType([
        PropTypes.func,
        // Or the instance of a DOM native element (see the note about SSR)
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ])
}