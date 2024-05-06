import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/utils/api";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TrackerForm } from "@/components/trackerForm";
import { type TrackerType } from "@/server/helpers/trackerValidator";

const TrackerCardList = () => {
  const { data: trackers } = api.tracker.getAll.useQuery();
  const utils = api.useUtils();
  const { mutate: deleteTrackerMutation } = api.tracker.delete.useMutation({
    onSuccess: async () => {
      await utils.tracker.getAll.invalidate();
    },
  });

  const { mutate: updateTrackerMutate } = api.tracker.update.useMutation({
    onSuccess: async () => {
      await utils.tracker.getAll.invalidate();
    },
  });

  if (!!!trackers) {
    return <></>;
  }

  function deleteTracker(id: number) {
    console.log("Deleted: " + id);
    deleteTrackerMutation({ id: id });
  }
  function editTracker(id: number, tracker: TrackerType) {
    console.log("Modified: " + id);
    updateTrackerMutate({
      id,
      ...tracker,
    });
  }

  return (
    <>
      {trackers.map((tracker) => {
        return (
          <>
            <Card>
              <CardHeader>
                <CardTitle>{tracker.name}</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter className="flex items-center gap-4 border-t px-6 py-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="border-emerald-600">Modifier</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <TrackerForm
                      title={"Modifier Tracker " + tracker.name}
                      submitText="Sauvegarder"
                      tracker={tracker}
                      action={(formTracker) =>
                        editTracker(tracker.id, formTracker)
                      }
                    />
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  onClick={() => deleteTracker(tracker.id)}
                >
                  Supprimer
                </Button>
              </CardFooter>
            </Card>
          </>
        );
      })}
    </>
  );
};

export default TrackerCardList;
