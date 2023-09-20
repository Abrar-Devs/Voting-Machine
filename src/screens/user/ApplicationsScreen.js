import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Card} from '@rneui/themed';

import globalStyles from '../../utils/styles/globalstyles';
import {
  approveCandidateApplication,
  getCandidateApplications,
} from '../../actions/asyncActions';
import LoadingIndicator from '../../components/common/LoadingIndicator';

const ApplicationsScreen = () => {
  const dispatch = useDispatch();
  const applications = useSelector(state => state.applications);
  const {loading, message} = useSelector(state => state.model);

  const approveApplication = id => {
    dispatch(approveCandidateApplication(id));
  };

  useEffect(() => {
    dispatch(getCandidateApplications());
  }, []);

  if (loading) return <LoadingIndicator message={message} />;

  if (applications.length === 0)
    return (
      <View>
        <Text style={globalStyles.boldText}>No applications at the moment</Text>
      </View>
    );

  return (
    <ScrollView>
      <Text style={[globalStyles.label, globalStyles.boldText]}>
        Applications to Approve
      </Text>
      <View style={[globalStyles.container, globalStyles.flexGap(10)]}>
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
}) => (
  <View style={[globalStyles.cardView, globalStyles.boxShadow()]}>
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
      <Text style={globalStyles.text()}>Approve</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
});
export default ApplicationsScreen;
