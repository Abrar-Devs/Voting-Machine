import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Heading = ({text}) => {
  return (
    <View style={styles.headingContainer}>
      <Text style={styles.headingText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    backgroundColor: 'transparent', // Set a transparent background
    padding: 10,
    marginBottom: 10,
  },
  headingText: {
    fontSize: 24,
    color: '#333', // Change text color to a darker shade
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Heading;
