import UserProfileScreen from '../../screens/user/UserProfileScreen';
import CandidateProfileScreen from '../../screens/user/CandidateProfileScreen';
import PollingScreen from '../../screens/polling/PollingScreen';
import ElectionsScreen from '../../screens/user/ElectionsScreen';
import NewElectionScreen from '../../screens/user/NewElectionScreen';
import ApplicationsScreen from '../../screens/user/ApplicationsScreen';

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
    name: 'Polling',
    comp: PollingScreen,
  },
];

export const adminScreenList = [
  ...userScreensList,
  {
    key: 4,
    name: 'All Elections',
    comp: ElectionsScreen,
  },
  {
    key: 5,
    name: 'New Election',
    comp: NewElectionScreen,
  },
  {
    key: 6,
    name: 'Applications',
    comp: ApplicationsScreen,
  },
];
