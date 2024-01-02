import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Stack, useRouter} from 'react-native-auto-route';

const ModalLayout = () => {
  const router = useRouter();
  const _renderClose = () => (
    <TouchableOpacity onPress={router.back}>
      <Text>Close</Text>
    </TouchableOpacity>
  );

  return (
    <Stack
      screenOptions={{
        // Show close button in header for all screens in modal group
        headerRight: _renderClose,
      }}
    />
  );
};

export default ModalLayout;