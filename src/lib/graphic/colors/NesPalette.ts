/*
 * simple class that cottains all NES palette colors, just
in case we need to use them in color definitions for backgrounds
and or particle effects 
 */
export const NesPalette = (() => 
{
    const colors: { [key: string]: string } = 
    {
        // Column 0 (Grayscale and dark tones)
        BLACK: "#000000",
        DARK_GRAY: "#545454",
        DARK_BLUE: "#00127C",
        DARK_PURPLE: "#7C007C",
        DARK_RED: "#7C0000",
        DARK_BROWN: "#5F3F30",
        DARK_GREEN: "#007C00",
        DARK_CYAN: "#005F7C",
        GRAY_BLUE: "#30307C",

        // Column 1 (Darker tones)
        BLUE: "#0000FF",
        PURPLE: "#7C00FF",
        RED: "#FF0000",
        BROWN: "#7C3F00",
        GREEN: "#00FF00",
        CYAN: "#00FFFF",
        GRAY_PURPLE: "#54547C",
        GRAY_BROWN: "#5F5F5F",

         // Column 2 (Mid tones)
         MID_BLUE: "#5454FF",
         MID_PURPLE: "#A454FF",
         MID_RED: "#FF5454",
         MID_ORANGE: "#FF7C00",
         MID_GREEN: "#54FF54",
         MID_CYAN: "#54FFFF",
         SKY_BLUE: "#7C7CFF",
         GRASS_GREEN: "#7CFF7C",


           // Column 3 (Brighter tones)
        LIGHT_BLUE: "#B8B8FF",
        LIGHT_PURPLE: "#FFB8FF",
        LIGHT_RED: "#FFB8A4",
        ORANGE: "#FFB854",
        LIGHT_GREEN: "#B8FFB8",
        LIGHT_CYAN: "#B8FFFF",
        LIGHT_YELLOW: "#FFFFB8",
        TAN: "#FFE7C4",


        // Column 4 (Brightest tones)
        WHITE: "#FFFFFF",
        PALE_YELLOW: "#FFFFD8",
        PALE_BLUE: "#D8FFFF",
        PALE_GREEN: "#D8FFD8",
        PEACH: "#FFD8D8",
        BRIGHT_CYAN: "#A8DFFF",
        BRIGHT_ORANGE: "#FFA858",
        LIGHT_TAN: "#FFE8C8",


        // Extras (NES special shades)
        TEAL: "#005F5F",
        FOREST_GREEN: "#3F7C3F",
        NAVY_BLUE: "#00005F",
        DEEP_PURPLE: "#3F005F",
        BURGUNDY: "#5F003F",
        COPPER: "#7C5430",
        LIGHT_PEACH: "#FFC0A8",
        DARK_OLIVE: "#5F5730",
        LIGHT_OLIVE: "#A8B85F",
        SEA_GREEN: "#54A87C",
        LIGHT_SKY_BLUE: "#B8DFFB",
        GRAY_TAN: "#A89F94",
        GOLD: "#FFD700",
        LIGHT_ORANGE: "#FFB874",

        //TRANSPARENT:"transparent" not used
    };
    return Object.freeze(colors); // Hace que el objeto sea inmutable
})();
