import React from 'react';
import { Text, TouchableOpacity, Platform } from 'react-native';

const ChallengeCardJumbo = ({ shadowColor }) => {
  return (
    <TouchableOpacity
      style={Platform.select({
        ios: {
          shadowColor,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 5,
        },
        android: {
          elevation: 10,
        },
      })}
    >
      <Text>lsdkfl;sdfsdlfk</Text>
    </TouchableOpacity>
  );
};

export default ChallengeCardJumbo;
