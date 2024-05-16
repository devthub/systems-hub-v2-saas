'use server';

import { clerkClient, currentUser } from '@clerk/nextjs';
import { FilterQuery } from 'mongoose';
import { redirect } from 'next/navigation';

import dbConnect from '@/lib/config/db-connect';
import UserService from '@/lib/services/user/user-service';
import AgencyModel from '@/models/Agency.model';
import InvitationModel from '@/models/Invitation.model';
import NotificationModel from '@/models/Notification.model';
import SubAccountModel from '@/models/SubAccount.model';
import UserModel from '@/models/User.model';
import { Invitation } from '@/types/invitation.types';
import { User } from '@/types/user.types';

export const getAuthUserDetails = async (): Promise<User | null> => {
  const user = await currentUser();
  if (!user) return null;

  const userDetails = await UserService.getUserDetails({
    where: { email: user.emailAddresses[0].emailAddress },
  });

  return userDetails;
};

export const createTeamUser = async (agencyId: string, user: Partial<User>) => {
  if (user.role === 'AGENCY_OWNER') return null;
  const response = await UserModel.create({ ...user, agencyId });

  return response;
};

export const saveActivityLogsNotification = async ({
  agencyId,
  description,
  subAccountId,
}: {
  agencyId?: string;
  description: string;
  subAccountId?: string;
}) => {
  const loggedInUser = currentUser();
  const [authUser] = await Promise.all([loggedInUser, dbConnect()]);

  let userData;

  const query: FilterQuery<User> = {
    'agency.subAccounts.some.id': subAccountId,
  };

  if (!authUser) {
    const response = await UserModel.findOne(query)
      .populate({
        path: 'agency',
        model: AgencyModel,
        populate: { path: 'subAccounts', model: SubAccountModel },
      })
      .select('-password -hash -salt');

    if (response) {
      userData = response;
    }
  } else {
    userData = await UserModel.findOne({
      email: authUser?.emailAddresses[0].emailAddress,
    });
  }

  if (!userData) {
    // eslint-disable-next-line no-console
    console.log('Could not find a user!');
    return;
  }

  let foundAgencyId = agencyId;
  if (!foundAgencyId) {
    if (!subAccountId) {
      throw new Error('You need to provide at least an agency Id or subaccount Id');
    }

    const response = await SubAccountModel.findById(subAccountId);
    if (response) foundAgencyId = response.agencyId;
  }

  if (subAccountId) {
    const notificationData = {
      notification: `${userData.name} | ${description}`,
      user: userData._id,
      agency: foundAgencyId,
    };

    const newNotification = new NotificationModel(notificationData);

    try {
      await newNotification.save();
      // eslint-disable-next-line no-console
      console.log('Notification created successfully!');
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  } else {
    const notificationData = {
      notification: `${userData.name} | ${description}`,
      user: userData._id,
      agency: foundAgencyId,
    };

    const newNotification = new NotificationModel(notificationData);

    try {
      await newNotification.save();
      // eslint-disable-next-line no-console
      console.log('Notification created successfully!');
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  }
};

export const verifyAndAcceptInvitation = async () => {
  const userData = currentUser();
  const [user] = await Promise.all([userData, dbConnect()]);
  if (!user) return redirect('/sign-in');

  const query: FilterQuery<Invitation> = {
    email: user.emailAddresses[0].emailAddress,
    status: 'PENDING',
  };

  const invitationExists = (await InvitationModel.findOne(query).populate({
    path: 'agency',
    model: AgencyModel,
  })) as Invitation;

  if (invitationExists) {
    const userDetails = await createTeamUser(invitationExists.agency?._id?.toString(), {
      email: invitationExists.email,
      agency: invitationExists.agency,
      imgUrl: user.imageUrl,
      name: `${user.firstName} ${user.lastName}`,
      role: invitationExists.role,
    });

    await saveActivityLogsNotification({
      agencyId: invitationExists?.agency?._id.toString(),
      description: `Joined`,
      subAccountId: undefined,
    });

    if (userDetails) {
      await Promise.all([
        clerkClient.users.updateUserMetadata(user.id, {
          privateMetadata: { role: userDetails.role || 'SUBACCOUNT_USER' },
        }),

        InvitationModel.findByIdAndDelete({
          email: userDetails.email,
        }),
      ]);

      return userDetails.agency._id.toString();
    } else return null;
  } else {
    const userExists = await UserModel.findOne({
      email: user.emailAddresses[0].emailAddress,
    }).populate({ path: 'agency', model: AgencyModel });

    return userExists ? userExists.agency?._id : null;
  }
};
