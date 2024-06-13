import { columns } from "@/Components/data-table/columns";
import { DataTable } from "@/Components/data-table/data-table";
import { Url } from "@/types";
import { useEffect, useState } from "react";

function Checker({ urls }: { urls: Url[] }) {

    const [urlsUpdated , setUrls] = useState<Url[]>(urls);

    useEffect(() => {
        window.Echo.channel('url')
            .listen('UpdateUrl', (e: any) => {
                setUrls(e.urls);
            });
    }, []);

    return (
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Linkuma - Url checker</h2>
                    <p className="text-muted-foreground">
                        Résults
                    </p>
                </div>
            </div>
            <DataTable data={urlsUpdated} columns={columns} add={false} />
        </div>
    )
}

export default Checker;