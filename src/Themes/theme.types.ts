export interface Theme{
    baseColors:{
        primary: string;
        secondary: string;
        error: string;
        clicked: string;
    };
    text:{
        primary: string;
        secondary: string;
    };
    components:{
        input:{
            backgroundColor: string;
            placeholderColor: string;
            textColor: string;
            padding: string;
        }
    }
}