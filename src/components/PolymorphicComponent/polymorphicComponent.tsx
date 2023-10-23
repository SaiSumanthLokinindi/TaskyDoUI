import { ComponentPropsWithRef, ComponentPropsWithoutRef, ElementType, ReactNode, forwardRef, useRef } from "react";

type PolymorphicRef<T extends React.ElementType> = ComponentPropsWithRef<T>['ref'];

type PolymorphicComponentProps<T extends ElementType> = {
    as?: T;
    children?: ReactNode;
} & ComponentPropsWithoutRef<T>;




const PolymorphicComponent  = forwardRef(<T extends ElementType = 'span'>({as, children, ...restProps}: PolymorphicComponentProps<T>, ref?:PolymorphicRef<T>)=>{
    
    const Component = as ?? 'span';

    if(children){
        return <Component ref={ref} {...restProps}>{children}</Component>
    }
    
    return <Component ref={ref} {...restProps}/>
});


export default PolymorphicComponent;














