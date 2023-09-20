import {Text} from 'react-native';
import React from 'react';
import globalStyles from '../../utils/styles/globalstyles';

const TextWithLabel = ({label, text, textAlign = 'center'}) => (
  <Text style={[globalStyles.text(textAlign)]}>
    <Text style={globalStyles.label}> {label}: </Text>
    {text}
  </Text>
);

export default TextWithLabel;
