import UserProfileScreen from '../../screens/UserProfileScreen';
import ElectionsScreen from '../../screens/ElectionsScreen';
import CandidateProfileScreen from '../../screens/CandidateProfileScreen';
import ApplicationsScreen from '../../screens/ApplicationsScreen';

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
  {
    key: 3,
    name: 'Elections',
    comp: ElectionsScreen,
  },
];

export const adminScreenList = [
  ...userScreensList,
  {
    key: 4,
    name: 'Applications',
    comp: ApplicationsScreen,
  },
];
