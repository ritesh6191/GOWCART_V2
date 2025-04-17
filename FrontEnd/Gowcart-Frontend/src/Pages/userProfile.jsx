import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/user/getUser", { withCredentials: true });
      setUser(res.data.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleDelete = async (post) => {
    if (!post?.modelType || !post?.itemId?._id) {
      console.error("Invalid post data:", post);
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
    if (!confirmDelete) return;

    try {
      await axios.post(
        `/post/delete/${post.modelType.toLowerCase()}/${post.itemId._id}`,
        {},
        { withCredentials: true }
      );

      setUser((prev) => ({
        ...prev,
        posts: prev.posts.filter((p) => p._id !== post._id),
      }));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg animate-pulse text-green-700">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center mt-10 text-red-500">User not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 pb-20">
      <h1 className="text-3xl font-extrabold mb-6 text-green-700 text-center">
        👤 Welcome, {user.firstName}!
      </h1>

              {/* Profile Info */}
        <div className="bg-white border border-green-200 shadow-sm rounded-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0 text-center sm:text-left">
            <div className="w-20 h-20 mx-auto sm:mx-0 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-700">
              {user.firstName[0]}
            </div>
            <div>
              <p className="text-xl font-medium text-gray-800">
                <span className="text-green-600 font-semibold">Name:</span> {user.firstName} {user.lastName}
              </p>
              <p className="text-xl font-medium text-gray-800">
                <span className="text-green-600 font-semibold">Phone:</span> {user.phone}
              </p>
            </div>
          </div>
        </div>


      {/* Animal Listings */}
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
                className="bg-white border-2 border-green-300 rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <div
                  onClick={() => navigate(`/animal/${post.modelType.toLowerCase()}/${animal._id}`)}
                  className="cursor-pointer"
                >
                  {image && (
                    <img
                      src={image}
                      alt="Animal"
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                  )}
                  <div className="p-4 space-y-1">
                    <h3 className="text-lg font-semibold text-green-700">{post.modelType}</h3>
                    <p className="text-gray-700 text-sm"><strong>Breed:</strong> {breed}</p>
                    <p className="text-gray-700 text-sm"><strong>Price:</strong> ₹{price}</p>
                  </div>
                </div>

                {/* Delete Button */}
                <div className="flex justify-end p-3 border-t border-green-100">
                  <button
                    onClick={() => handleDelete(post)}
                    className="bg-red-500 text-white px-3 py-1 text-sm rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
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
