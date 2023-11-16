import React from 'react';
import {useToast} from 'react-native-toast-notifications';
import LoadingIndicator from './LoadingIndicator';

const ToastAlert = ({message}) => {
  const toast = useToast();
  toast.show(message, {placement: 'top', duration: 1000});
  return <LoadingIndicator message={message} />;
};

export default ToastAlert;
