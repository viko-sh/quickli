import { type NextPage } from "next";
import React, { useState } from "react";

const MagicPage: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [magicLink, setMagicLink] = useState<string | null>(null);

  const handleRequestMagicLink = async (): Promise<void> => {
    if (!email) {
      alert("Please enter an email address.");
      return;
    }

    try {
      setIsLoading(true);

      // Generate a fake magic token for demo purposes
      const magicToken = btoa(email + "-" + Date.now()); // Encode email & timestamp

      // Construct the magic link
      const link = `${window.location.origin}/auth/login#token=${magicToken}`;

      // Update state to show the link below the button
      setMagicLink(link);

      // In a real app, you’d send this via an API request
      // await fetch('/api/auth/magic-link', { method: 'POST', body: JSON.stringify({ email }) });
    } catch (error) {
      console.error("Error requesting magic link:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-xl font-semibold text-gray-800">
          Request Magic Link
        </h1>
        <p className="mb-6 text-sm text-gray-600">
          Enter your email address to receive a login link.
        </p>

        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleRequestMagicLink}
          disabled={!email || isLoading}
          className={`w-full rounded-md px-4 py-2 text-white ${
            !email || isLoading
              ? "cursor-not-allowed bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Sending..." : "Send Magic Link"}
        </button>

        {/* Magic Link Display */}
        {magicLink && (
          <div className="mt-4 text-sm text-gray-700">
            <p className="mb-2">Your magic link:</p>
            <a
              href={magicLink}
              className="break-all rounded-md bg-gray-200 px-3 py-2 text-blue-600 hover:text-blue-800"
            >
              {magicLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MagicPage;
