import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
    styles: {
        global: (props) => ({
            body: {
                bg: props.colorMode === 'dark' ? 'grey.800' : 'white'
            }
        })
    }
});
export default theme;
