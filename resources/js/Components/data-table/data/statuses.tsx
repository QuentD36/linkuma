import { Badge } from "@/Components/ui/badge";
import { Check, CircleAlert, Loader, X } from "lucide-react";

export const statuses = [
    {
        value: 'pending',
        label: 'Pending',
        icon: Loader,
        render: () => <Badge> <Loader className="h-4 w-4 mr-2 animate-spin" /> Pending </Badge>
    },
    {
        value: 'success',
        label: 'Indexed',
        icon: Check,
        render: () => <Badge variant={'success'}> <Check className="h-4 w-4 mr-2" /> Indexed </Badge>
    },
    {
        value: 'failed',
        label: 'Not Indexed',
        icon: X,
        render: () => <Badge variant={'destructive'}> <X className="h-4 w-4 mr-2" /> Not Indexed </Badge>
    },
    {
        value: 'error',
        label: 'Error',
        icon: CircleAlert,
        render: () => <Badge variant={'destructive'}> <CircleAlert className="h-4 w-4 mr-2" /> Error </Badge>
    }
]
