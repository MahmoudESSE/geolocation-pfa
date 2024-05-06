import { SubmitHandler, useForm } from "react-hook-form"
import { DialogFooter, DialogHeader } from "./ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { TrackerSchema, TrackerType } from "@/server/helpers/trackerValidator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./ui/button"


interface FormProps {
  title: string
  submitText: string
  tracker?: TrackerType,
  action: (tracker: TrackerType) => void
}
const TrackerForm = (
  { title, submitText, tracker: initialValues, action }: FormProps
) => {
  const form = useForm<TrackerType>({
    resolver: zodResolver(TrackerSchema),
    defaultValues: initialValues
  })
  const submitHandler: SubmitHandler<TrackerType> = (tracker) => {
    console.log("Submitting ...");

    console.log(tracker);
    action(tracker)
  }
  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <DialogHeader>
          <h3 className="text-lg font-semibold">{title}</h3>
        </DialogHeader>
        <div className="py-2">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tracker</FormLabel>
                <FormControl>
                  <Input placeholder="Nom du tracker" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="imei"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>International Mobile Equipment Identity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="IMEI"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="speed"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vitesse</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Vitesse"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button type="submit">{submitText}</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

export {
  TrackerForm
}
