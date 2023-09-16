import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';

import CandidateApplication from '../components/user/CandidateApplication';
import CandidateProfile from '../components/user/CandidateProfile';

const CandidateProfileScreen = () => {
  const candidate = useSelector(state => state.candidate);

  if (!candidate) return <CandidateApplication />;
  return <CandidateProfile />;
};

export default CandidateProfileScreen;
