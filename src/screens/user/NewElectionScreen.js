import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';

import globalStyles from '../../utils/styles/globalstyles';
import {dateFormatter, timeFormatter} from '../../utils/helpers';
import FormikForm from '../../components/common/FormikForm';
import {newElectionSchema} from '../../utils/validation/yupValidations';
import {createElection} from '../../actions/asyncActions';
import LoadingIndicator from '../../components/common/LoadingIndicator';

const NewElectionScreen = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [err, setErr] = useState(null);
  const toast = useToast();

  const {loading, message} = useSelector(state => state.model);
  const elections = useSelector(state => state.elections);
  const dispatch = useDispatch();

  const handleSubmit = ({electionName}) => {
    if (err) return;

    const alreadyPresent = elections.some(
      e => e.electionName.toLowerCase() === electionName.toLowerCase(),
    );
    if (alreadyPresent) {
      toast.show('An election with the same name is already present..', {
        placement: 'top',
        type: 'danger',
      });
      return;
    }

    dispatch(createElection({electionName, startDate, endDate}));
  };

  useEffect(() => {
    if (startDate < new Date()) {
      setErr('Please select a start date in future');
      return;
    }
    if (startDate > endDate) {
      setErr('Election cannot finish before it even started');
      return;
    }
    const diff = (endDate - startDate) / (1000 * 60 * 60);
    // if (diff < 1) {
    //   setErr('There must be at least one hour for an election');
    //   return;
    // }
    setErr(null);
  }, [startDate, endDate]);

  if (loading) {
    return <LoadingIndicator message={message} />;
  }

  return (
    <View>
      <View>
        <FormikForm
          title={'Create New Election'}
          btnText={'Create'}
          formValues={{electionName: ''}}
          handleSubmit={handleSubmit}
          validationSchema={newElectionSchema}>
          <PickDateTime
            label={'Start time'}
            date={startDate}
            setDate={setStartDate}
          />
          <PickDateTime
            label={'Finish time'}
            date={endDate}
            setDate={setEndDate}
          />
          {err ? <Text style={globalStyles.error}>{err}</Text> : null}
        </FormikForm>
      </View>
    </View>
  );
};

const PickDateTime = ({label, date, setDate}) => {
  const [open, setOpen] = useState(false);
  return (
    <View style={globalStyles.cardView}>
      <Text style={[globalStyles.text(), globalStyles.label]}>{label}</Text>
      <Text
        style={[
          globalStyles.input,
          globalStyles.text(),
          globalStyles.dimensions({width: '100%'}),
        ]}>
        {dateFormatter.format(date)}
      </Text>
      <Text style={[globalStyles.text()]}>{timeFormatter.format(date)}</Text>
      <TouchableOpacity
        style={[globalStyles.btn, globalStyles.spacings({mrgnTop: 10})]}
        onPress={() => setOpen(true)}>
        <Text style={[globalStyles.text(), globalStyles.txtColor('white')]}>
          Select {label}
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

export default NewElectionScreen;
