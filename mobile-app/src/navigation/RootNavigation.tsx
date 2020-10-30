
import { NavigationContainerRef } from '@react-navigation/native';
import * as React from 'react';


export const navigationRef: React.RefObject<NavigationContainerRef> = React.createRef();

export function navigate(name: string): void {
    if (navigationRef.current != null) {
        navigationRef.current.navigate(name);
    }
//   navigationRef.current.navigate(name, params);
}