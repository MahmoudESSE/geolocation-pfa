import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/utils/api";

const TrackerCardList = () => {
  const { data: trackers } = api.tracker.getAll.useQuery();
  if (!!!trackers) {
    return <></>;
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
              <CardFooter className="border-t px-6 py-4">
                <Button>Configure</Button>
              </CardFooter>
            </Card>
          </>
        );
      })}
    </>
  );
};

export default TrackerCardList;
