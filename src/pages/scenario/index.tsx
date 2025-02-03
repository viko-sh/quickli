import { type NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Input,
  Textarea,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Select,
  SelectOption,
} from "~/components/shared";
import { api } from "~/utils/api";
import Layout from "./layout";

const ScenarioListPage: NextPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newScenario, setNewScenario] = useState({
    name: "",
    description: "",
    income: "",
    type: "",
  });

  const utils = api.useUtils();

  const { data: scenarios, isLoading } = api.scenario.getAll.useQuery();

  const createScenario = api.scenario.create.useMutation({
    onSuccess: () => {
      setIsCreateDialogOpen(false);
      setNewScenario({ name: "", description: "", income: "", type: "" });
      void utils.scenario.getAll.invalidate();
    },
  });

  const handleCreate = () => {
    createScenario.mutate({
      name: newScenario.name,
      description: newScenario.description,
      income: newScenario.income,
      type: newScenario.type,
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-white">Loading scenarios...</p>
      </div>
    );
  }

  return (
    <Layout title="Quickli Scenarios">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white">Scenarios</h1>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-xl text-white/90">
                  Create New Scenario
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm text-black/90">Name</label>
                  <Input
                    value={newScenario.name}
                    onChange={(e) =>
                      setNewScenario((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Enter scenario name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-black/90">Description</label>
                  <Textarea
                    value={newScenario.description}
                    onChange={(e) =>
                      setNewScenario((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Enter scenario description"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-black/90">Income</label>
                  <Input
                    value={newScenario.income}
                    onChange={(e) =>
                      setNewScenario((prev) => ({
                        ...prev,
                        income: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-black/90">Income</label>
                  <Select
                    name="type"
                    value={newScenario.type}
                    onChange={(e) =>
                      setNewScenario((prev) => ({
                        ...prev,
                        type: e.target.value,
                      }))
                    }
                  >
                    <SelectOption value="">Select an option</SelectOption>
                    <SelectOption value="option1">Option 1</SelectOption>
                    <SelectOption value="option2">Option 2</SelectOption>
                  </Select>
                </div>
                <Button
                  onClick={handleCreate}
                  disabled={!newScenario.name || createScenario.isPending}
                  className="w-full bg-purple-800 text-white hover:bg-purple-700"
                >
                  {createScenario.isPending ? "Creating..." : "Create Scenario"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="mb-6 mt-6 border border-white/20 bg-transparent text-white hover:bg-white/10"
        >
          Create Scenario
        </Button>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {scenarios?.map((scenario) => (
            <Link
              key={scenario.id}
              href={`/scenario/${scenario.id}`}
              className="transition-transform hover:scale-105"
            >
              <Card>
                <CardHeader>
                  <CardTitle>{scenario.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {scenario.description && (
                    <p className="mb-4 text-gray-600">{scenario.description}</p>
                  )}
                  <p className="text-sm text-gray-400">
                    Created: {scenario.createdAt.toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {scenarios?.length === 0 && (
          <div className="mt-8 text-center">
            <p className="text-lg text-white">No scenarios found</p>
            <p className="text-sm text-gray-400">
              Create your first scenario to get started
            </p>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="mt-6 border border-white/20 bg-transparent text-white hover:bg-white/10"
            >
              Create Scenario
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ScenarioListPage;
