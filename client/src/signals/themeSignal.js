import {deepSignal} from "deepsignal/react";

export const themeSignal = deepSignal({
    theme: 'dark',

    toggleTheme: () => {
        const t = themeSignal.theme
        themeSignal.theme = t === 'dark' ? 'light' : 'dark'
    }
})
