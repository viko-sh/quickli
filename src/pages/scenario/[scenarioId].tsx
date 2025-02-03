import { type NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Layout from "./layout";
import Link from "next/link";

const ScenarioPage: NextPage = () => {
  const router = useRouter();
  const scenarioId = router.query.scenarioId as string;

  const {
    data: scenario,
    isLoading,
    error,
  } = api.scenario.getOne.useQuery(
    { scenarioId },
    {
      enabled: !!scenarioId,
    },
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-white">Loading scenario...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  if (!scenario) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-white">Scenario not found</p>
      </div>
    );
  }

  return (
    <Layout title={`${scenario.name} - Quickli Scenario`}>
      <div className="mx-auto max-w-4xl">
        <Link
          className="w-100 mb-3 block rounded-lg bg-purple-800 px-4 py-2 text-center text-white hover:bg-purple-700"
          href="/scenario"
        >
          Back to scenarios
        </Link>
        <div className="rounded-lg bg-white/10 p-6 text-white">
          <h1 className="mb-4 text-4xl font-bold">{scenario.name}</h1>

          {scenario.description && (
            <p className="mb-6 text-lg text-gray-300">{scenario.description}</p>
          )}

          <div className="mt-4 text-sm text-gray-400">
            <p>Created: {scenario.createdAt.toLocaleDateString()}</p>
            <p>Last Updated: {scenario.updatedAt.toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ScenarioPage;
