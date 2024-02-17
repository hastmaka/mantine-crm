import PropTypes from "prop-types";
import { MantineProvider } from "@mantine/core";
import {theme} from "./theme.js";
import {themeSignal} from "../signals/themeSignal.js";
import {Notifications} from "@mantine/notifications";

export default function ThemeController ({children}) {
	return (
		<MantineProvider
			theme={theme}
			forceColorScheme={themeSignal.theme}
		>
			<Notifications position='top-center'/>
			{children}
		</MantineProvider>
	);
}

ThemeController.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.element,
		PropTypes.array,
		PropTypes.string
	]),
}
