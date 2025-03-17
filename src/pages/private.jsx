import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const Private = () => {
  const handleSignout = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error));
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Private Page</h2>
        <p className="text-gray-600 mb-6">Welcome to your private dashboard.</p>
        <button 
          onClick={handleSignout} 
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Sign Out
        </button>
      </div>
    </section>
  );
};
