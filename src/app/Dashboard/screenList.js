import UserProfileScreen from '../../screens/UserProfileScreen';
import ElectionsScreen from '../../screens/ElectionsScreen';
import CandidateProfileScreen from '../../screens/CandidateProfileScreen';
import ApplicationsScreen from '../../screens/ApplicationsScreen';
import NewElectionScreen from '../../screens/NewElectionScreen';
import PollingScreen from '../../screens/PollingScreen';

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
