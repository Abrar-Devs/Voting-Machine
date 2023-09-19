import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import globalStyles from '../../utils/styles/globalstyles';
import {deleteElection, getAllElections} from '../../actions/asyncActions';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import ElectionCard from '../../components/polling/ElectionCard';

const ElectionsScreen = () => {
  const elections = useSelector(state => state.elections);
  const {loading, message} = useSelector(state => state.model);

  const dispatch = useDispatch();

  const handleDelete = id => {
    dispatch(deleteElection(id));
  };

  useEffect(() => {
    dispatch(getAllElections());
  }, []);

  if (loading) {
    return <LoadingIndicator message={message} />;
  }

  if (elections.length == 0)
    return (
      <Text style={globalStyles.boldText}>No Elections at the moment</Text>
    );

  return (
    <ScrollView>
      <View style={[globalStyles.container, globalStyles.flexGap(10)]}>
        {elections.map(item => (
          <ElectionCard
            key={item.id}
            {...item}
            btnText={'Delete'}
            handleBtnClick={handleDelete}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ElectionsScreen;
