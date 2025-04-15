import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/user/getUser", {
          withCredentials: true,
        });
        setUser(res.data.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg animate-pulse text-green-700">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center mt-10 text-red-500">User not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-extrabold mb-6 text-green-700 text-center">
        👤 Welcome, {user.firstName}!
      </h1>

      <div className="bg-white border border-green-100 shadow-md rounded-2xl p-6 mb-8 text-center">
        <p className="text-xl font-medium text-gray-800">
          <span className="text-green-600 font-semibold">Name:</span> {user.firstName} {user.lastName}
        </p>
        <p className="text-xl font-medium text-gray-800">
          <span className="text-green-600 font-semibold">Phone:</span> {user.phone}
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-green-600">🐄 Animals for Sale</h2>

      {user.posts.length === 0 ? (
        <p className="text-gray-600 text-center">No animals listed for sale.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {user.posts.map((post) => {
            const animal = post.itemId;
            if (!animal) return null;

            const breed = animal.Breed || "N/A";
            const price = animal.Price || "N/A";
            let image = null;

            if (post.modelType === "Cow") image = animal.CowImage1;
            else if (post.modelType === "Horse") image = animal.HorseImage1;
            else if (post.modelType === "Buffalo") image = animal.BuffaloImage1;
            else if (post.modelType === "Goat") image = animal.GoatImage1;

            return (
              <div
                key={post._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition duration-300 ease-in-out overflow-hidden"
              >
                {image && (
                  <img
                    src={image}
                    alt="Animal"
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <p className="text-lg font-bold text-green-700 mb-1">{post.modelType}</p>
                  <p className="text-gray-700"><span className="font-medium">Breed:</span> {breed}</p>
                  <p className="text-gray-700"><span className="font-medium">Price:</span> ₹{price}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
