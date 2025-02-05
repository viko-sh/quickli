import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const MagicLogin: NextPage = () => {
  const [magicToken, setMagicToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Extract token from URL hash
    const hash = window.location.hash;
    const tokenMatch = hash.match(/token=([^&]+)/);

    if (tokenMatch) {
      setMagicToken(tokenMatch[1]);

      // Simulate authentication (In a real app, verify the token via an API call)
      setTimeout(() => {
        alert("Magic link verified! Redirecting...");
        void router.push("/scenario"); // Redirect after login success
      }, 2000);
    } else {
      alert("Invalid or missing magic token.");
      void router.push("/magic"); // Redirect back to login page if token is missing
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-md">
        <h1 className="mb-4 text-xl font-semibold text-gray-800">
          Logging in...
        </h1>
        {magicToken ? (
          <p className="text-sm text-gray-600">Verifying your magic link...</p>
        ) : (
          <p className="text-sm text-red-600">Invalid magic token.</p>
        )}
      </div>
    </div>
  );
};

export default MagicLogin;
