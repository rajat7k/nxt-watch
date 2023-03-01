import { action, decorate, observable } from "mobx";
import { darkTheme, lightTheme } from "../../constants/ThemeConstants";


class ThemeStore{
    currentTheme;
    constructor(){
        this.currentTheme=lightTheme
    }
    ToggleTheme(){
        if (this.currentTheme.themeName === 'dark') {
            this.currentTheme=lightTheme
        }
        else {
            this.currentTheme=darkTheme
        }
    }
}

decorate(ThemeStore,{
    currentTheme:observable,
    ToggleTheme:action
})

export default ThemeStore