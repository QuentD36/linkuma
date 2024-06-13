import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/Components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/Components/ui/drawer"
import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import { useForm } from "@inertiajs/react"
import { toast } from "sonner"

export default function AddUrls({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add URL(s)</DialogTitle>
                        <DialogDescription>
                            One or more urls (one per line)
                        </DialogDescription>
                    </DialogHeader>
                    <UrlsForm />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Add URL(s)</DrawerTitle>
                    <DrawerDescription>
                        One or more urls (one per line)
                    </DrawerDescription>
                </DrawerHeader>
                <UrlsForm className="px-4" />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

function UrlsForm({ className }: React.ComponentProps<"form">) {

    const { data, setData, post, processing, errors, transform } = useForm({
        urls: '',
    })

    function submit(e: React.SyntheticEvent) {
        e.preventDefault()
        transform((data) => ({ ...data, urlsArray: data.urls.split('\n').filter((url) => url.trim() !== '') }))
        post(route('store'), { data: { ...data } })
    }

    React.useEffect(() => {
        Object.entries(errors).forEach(([key, value]) => {
            toast.error(value)
        })
    }, [errors])

    return (
        <form className={cn("grid items-start gap-4", className)} onSubmit={submit}>
            <div className="grid gap-2">
                <Label htmlFor="urls">List</Label>
                <Textarea id="urls" placeholder="https://example.com" value={data.urls} onChange={(e) => setData('urls', e.target.value)} />
            </div>
            <Button type="submit">Validate</Button>
        </form>
    )
}
