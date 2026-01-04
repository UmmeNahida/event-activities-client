/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(dashboard)/users/view/page.tsx

import ContainerDiv from "@/components/shared/ContainerDiv";
import { viewUserProfileData } from "@/services/auth/getUserInfo";
import Image from "next/image";

type ViewProfileProps = {
  params: Promise<{ id: string }>;
};

const ViewProfile = async ({ params }: ViewProfileProps) => {
  const { id } = await params;

  if (!id) {
    return <div>User id not found</div>;
  }

  const user = await viewUserProfileData(id);

  if (!user) {
    return <div>Failed to load user</div>;
  }

  return (
    <ContainerDiv>
      <div className="min-h-screen py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-10 flex gap-6 items-center">
          <Image
            width="300"
            height="300"
            src={user.image}
            alt={user.name}
            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-100"
          />

          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-800">
              {user.name}
            </h1>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-500">{user.location}</p>

            <span className="inline-block mt-3 px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-700">
              {user.role}
            </span>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-2">About</h2>
          <p className="text-gray-600">{user.bio}</p>
        </div>

        {/* Interests & Hobbies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {user.interests?.map((item: string) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold mb-3">Hobbies</h3>
            <div className="flex flex-wrap gap-2">
              {user.hobbies?.map((item: string) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Joined Events */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold mb-4">Joined Events</h2>

          {user.eventsJoined?.length === 0 ? (
            <p className="text-gray-500">No events joined</p>
          ) : (
            <div className="space-y-3">
              {user.eventsJoined.map((join: any) => (
                <div
                  key={join.id}
                  className="flex justify-between items-center border rounded-lg p-4"
                >
                  <div>
                    <p className="font-medium">{join.event.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(join.event.date).toDateString()}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      join.paid
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {join.paid ? "Paid" : "Unpaid"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reviews */}
        {user.role === "HOST" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-semibold mb-4">Reviews Received</h2>

            {user.reviewsReceived?.length === 0 ? (
              <p className="text-gray-500">No reviews received</p>
            ) : (
              <div className="space-y-3">
                {user.reviewsReceived.map((review: any) => (
                  <div
                    key={review.id}
                    className="border rounded-lg p-4"
                  >
                    <p className="text-gray-700">{review.comment}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Rating: {review.rating}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {user.role === "USER" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-semibold mb-4">Reviews Given</h2>

            {user.reviewsGiven?.length === 0 ? (
              <p className="text-gray-500">No reviews given</p>
            ) : (
              <div className="space-y-3">
                {user.reviewsGiven.map((review: any) => (
                  <div
                    key={review.id}
                    className="border rounded-lg p-4"
                  >
                    <p className="text-gray-700">{review.comment}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Rating: {review.rating}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </ContainerDiv>
  );
};

export default ViewProfile;
