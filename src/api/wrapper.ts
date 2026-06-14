
import { UserService } from './services/UserService';
import { FileService } from './services/FileService';


export const api = {
  // User endpoints
  getUsers: UserService.a2Cf543De9B4627B5E955D7Fc87E6Ba5,
  getUserById: UserService.a56E857A7D74E43Aa917B98549066E8,
  createUser: UserService.c0078D04Ffdac38200Fc4F23Fccfd55A,
  updateUser: UserService.e8Fb86235D2C32236C4359552153923,
  deleteUser: UserService.f71Cb7Cd7429Cab6A310F244Bec44C4,
  getFoodList: UserService.fc5Ceabf3C60Ca2Cd339Ed4A15888C10,
  
  // File endpoints
  getFile: FileService.fa30428495020Ddc037B40F1790Fcef3,
  deleteFile: FileService.fffad0540D2670Ec156390C0Ff863,
};
