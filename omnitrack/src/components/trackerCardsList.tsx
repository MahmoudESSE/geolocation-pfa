import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/utils/api";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { TrackerForm } from "./trackerForm";
import { TrackerType } from "@/server/helpers/trackerValidator";

const TrackerCardList = () => {
  const { data: trackers } = api.tracker.getAll.useQuery();
  if (!!!trackers) {
    return <></>;
  }
  function deleteTracker(id: number) {
    console.log("Deleted: " + id);
  }
  function editTracker(id: number, tracker: TrackerType) {
    console.log("modified: " + id);
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
              <CardFooter className="border-t px-6 py-4 flex gap-4 items-center">

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="border-emerald-600"
                    >
                      Modifier
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <TrackerForm
                      title={"Modifier Tracker " + tracker.name}
                      submitText="Sauvegarder"
                      tracker={tracker}
                      action={(formTracker) => editTracker(tracker.id, formTracker)}
                    />
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" onClick={() => deleteTracker(tracker.id)}>Supprimer</Button>
              </CardFooter>
            </Card>
          </>
        );
      })}
    </>
  );
};

export default TrackerCardList;
