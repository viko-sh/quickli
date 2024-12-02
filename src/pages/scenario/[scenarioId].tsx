import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

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
    <>
      <Head>
        <title>{`${scenario.name} - Quickli Scenario`}</title>
        <meta
          name="description"
          content={scenario.description ?? "Quickli Scenario Details"}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] p-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg bg-white/10 p-6 text-white">
            <h1 className="mb-4 text-4xl font-bold">{scenario.name}</h1>

            {scenario.description && (
              <p className="mb-6 text-lg text-gray-300">
                {scenario.description}
              </p>
            )}

            <div className="mt-4 text-sm text-gray-400">
              <p>Created: {scenario.createdAt.toLocaleDateString()}</p>
              <p>Last Updated: {scenario.updatedAt.toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ScenarioPage;
