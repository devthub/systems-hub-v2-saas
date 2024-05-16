import { FilterQuery } from 'mongoose';

import dbConnect from '@/lib/config/db-connect';
import { RegisterFormValues, registerSchema } from '@/lib/validation-schemas/register-schema';
import AgencyModel from '@/models/Agency.model';
import AgencySideBarOptionModel from '@/models/AgencySideBarOption.model';
import PermissionModel from '@/models/Permission.model';
import SubAccountModel from '@/models/SubAccount.model';
import SubAccountSideBarOptionsModel from '@/models/SubAccountSideBarOptions.model';
import UserModel from '@/models/User.model';
import { User } from '@/types/user.types';
import { stripe } from '../stripe/get-stripe';

export interface LoginFormValues {
  usernameOrEmail: string;
  password: string;
  otpCode?: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const authenticate = async ({ usernameOrEmail, password, otpCode }: LoginFormValues) => {
  await dbConnect();

  // const user: Partial<User> | undefined | null = null;

  const userExists = await UserModel.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  }).select('+password');

  if (!userExists) {
    throw new Error('User not found!');
  }

  const isMatch = await userExists.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid credentials!');
  }

  // const isOtpCodeVerified = await userExists.verifyOtp(otpCode);
  // if (!isOtpCodeVerified) {
  //   throw new Error('Invalid/Expired code!');
  // }

  await userExists.save();

  if (userExists) {
    if (!userExists?.stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: userExists.email,
      });

      userExists.stripeCustomerId = customer.id;
      await userExists.save();
    }
  }

  const flatUser: User = JSON.parse(JSON.stringify(userExists));

  const user = {
    _id: flatUser._id,
    isAdmin: flatUser.isAdmin,
    role: flatUser.role,
    email: flatUser.email,
    username: flatUser.username,
    imgUrl: flatUser.imgUrl || null,
    stripeCustomerId: flatUser.stripeCustomerId,
  };

  return { data: { ok: true, user } };
};

const createNewUser = async (registerInput: RegisterFormValues) => {
  await dbConnect();

  await registerSchema.validate(registerInput, {
    abortEarly: false,
    stripUnknown: true,
  });

  const newUser = new UserModel({
    email: registerInput.email,
    password: registerInput.password,
    username: registerInput.username,
  });

  const user = newUser.save();

  return user;
};

const getUserDetails = async ({ where }: { where: FilterQuery<User> }): Promise<User | null> => {
  await dbConnect();

  const userExists = UserModel.findOne(where)
    .populate({
      path: 'agency',
      model: AgencyModel,
      populate: [
        { path: 'sidebarOptions', model: AgencySideBarOptionModel },
        {
          path: 'subAccounts',
          model: SubAccountModel,
          populate: { path: 'sidebarOptions', model: SubAccountSideBarOptionsModel },
        },
      ],
    })
    .populate({
      path: 'permissions',
      model: PermissionModel,
    })
    .select('-password -hash -salt');

  if (!userExists) return null;

  return userExists;
};

const UserService = {
  authenticate,
  createNewUser,
  getUserDetails,
};

export default UserService;
