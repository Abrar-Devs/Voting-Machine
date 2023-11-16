import UserProfileScreen from '../../screens/UserProfileScreen';
import ElectionsScreen from '../../screens/ElectionsScreen';
import CandidateProfileScreen from '../../screens/CandidateProfileScreen';
import ApplicationsScreen from '../../screens/ApplicationsScreen';
import NewElectionScreen from '../../screens/NewElectionScreen';

export const userScreensList = [
  {
    key: 1,
    name: 'Your Profile',
    comp: UserProfileScreen,
  },
  {
    key: 2,
    name: 'Candidate Profile',
    comp: CandidateProfileScreen,
  },
];

export const adminScreenList = [
  ...userScreensList,
  {
    key: 3,
    name: 'All Elections',
    comp: ElectionsScreen,
  },
  {
    key: 4,
    name: 'New Election',
    comp: NewElectionScreen,
  },
  {
    key: 5,
    name: 'Applications',
    comp: ApplicationsScreen,
  },
];
