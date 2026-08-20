import { useState, useEffect, useCallback } from 'react';
import { Keyboard, KeyboardEvent, Platform, LayoutAnimation } from 'react-native';

export interface KeyboardAvoidanceOptions {
  extraOffset?: number;
  animate?: boolean;
}

export const useKeyboardAvoidance = (options: KeyboardAvoidanceOptions = {}) => {
  const { extraOffset = 20, animate = true } = options;
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const onShow = (e: KeyboardEvent) => {
      if (animate) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }
      setKeyboardHeight(e.endCoordinates.height + extraOffset);
      setKeyboardVisible(true);
    };

    const onHide = () => {
      if (animate) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }
      setKeyboardHeight(0);
      setKeyboardVisible(false);
    };

    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, onShow);
    const hideSub = Keyboard.addListener(hideEvent, onHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [animate, extraOffset]);

  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  return {
    keyboardHeight,
    isKeyboardVisible,
    containerPaddingBottom: keyboardHeight,
    dismissKeyboard,
  };
};
