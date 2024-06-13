import { Link, Head } from '@inertiajs/react';
import { PageProps, Url } from '@/types';
import { Button } from '@/Components/ui/button';
import { columns } from '@/Components/data-table/columns';
import { DataTable } from '@/Components/data-table/data-table';

export default function Home({ urls }: PageProps<{ urls: Url[] }>) {


    return (
        <>
            <Head title="Home" />
            <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Linkuma - Url checker</h2>
                        <p className="text-muted-foreground">
                            Monitor the indexation of your urls
                        </p>
                    </div>
                </div>
                <DataTable data={urls} columns={columns} add={true} />
            </div>
        </>
    );
}
