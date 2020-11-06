import React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef: React.RefObject<NavigationContainerRef> = React.createRef();

export function navigate(name: string, params?: any): void {
  if (navigationRef.current != null) {
    navigationRef.current.navigate(name, params);
  }
}
