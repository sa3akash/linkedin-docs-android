import React from 'react';
import { PrimaryButton, ButtonProps } from './PrimaryButton';

export const LoadingButton: React.FC<ButtonProps> = (props) => {
  return <PrimaryButton {...props} isLoading={true} />;
};
