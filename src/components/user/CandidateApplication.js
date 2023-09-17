import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import FormikForm from '../common/FormikForm';
import {applicationFormSchema} from '../../utils/validation/yupValidations';
import {submitCandidateApplication} from '../../actions/asyncActions';

const formValues = {
  partyName: '',
};

const CandidateApplication = () => {
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async ({partyName, profilePic}) => {
    const applicationObj = {
      user: currentUser.email,
      partyName,
      partySymbol: profilePic,
      approved: false,
    };

    dispatch(submitCandidateApplication(applicationObj));
  };

  return (
    <FormikForm
      title={'Candidate Application'}
      validationSchema={applicationFormSchema}
      formValues={formValues}
      handleSubmit={handleSubmit}
      showImgPicker={true}
      btnText="Submit Application"
      imgText="Choose symbol image"
    />
  );
};

export default CandidateApplication;
