import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import CandidateApplication from '../../components/user/CandidateApplication';
import CandidateProfile from '../../components/user/CandidateProfile';
import {getCandidateProfile} from '../../actions/asyncActions';
import LoadingIndicator from '../../components/common/LoadingIndicator';

const CandidateProfileScreen = () => {
  const dispatch = useDispatch();

  const candidate = useSelector(state => state.candidate);
  const {loading, message} = useSelector(state => state.model);

  useEffect(() => {
    dispatch(getCandidateProfile());
  }, []);

  if (loading) return <LoadingIndicator message={message} />;
  if (!candidate) return <CandidateApplication />;
  return <CandidateProfile />;
};

export default CandidateProfileScreen;
