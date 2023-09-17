import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Card} from '@rneui/themed';

import globalStyles from '../utils/styles/globalstyles';
import {approveCandidateApplication} from '../actions/asyncActions';

const ApplicationsScreen = () => {
  const dispatch = useDispatch();
  const applications = useSelector(state => state.applications);
  console.log('applications screen: ', applications);
  const approveApplication = id => {
    dispatch(approveCandidateApplication(id));
  };

  if (applications.length === 0)
    return (
      <View>
        <Text style={globalStyles.boldText}>No applications at the moment</Text>
      </View>
    );
  return (
    <ScrollView>
      <View style={styles.container}>
        {applications.map(item => (
          <Application
            key={item.id}
            {...item}
            approveApplication={approveApplication}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const Application = ({
  id,
  partyName,
  partySymbol,
  user,
  approveApplication,
}) => {
  return (
    <Card>
      <Card.Title style={globalStyles.boldText}>{user}</Card.Title>
      <Card.Divider />
      <Card.Image
        source={{
          uri: partySymbol,
        }}
      />
      <Text style={globalStyles.boldText}>Party: {partyName}</Text>
      <TouchableOpacity
        style={globalStyles.btn}
        onPress={() => approveApplication(id)}>
        <Text style={globalStyles.text}>Approve</Text>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
});
export default ApplicationsScreen;
