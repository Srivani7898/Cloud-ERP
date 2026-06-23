import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ScmTableProps = {
  title: string;
  description: string;
  headers: string[];
  rows: React.ReactNode[][];
};

export function ScmTable({
  title,
  description,
  headers,
  rows,
}: ScmTableProps) {
  return (
    <Card className="border-slate-200 dark:border-white/10 dark:bg-white/[0.06]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>

        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase tracking-[0.14em] text-slate-500 dark:border-white/10 dark:text-slate-400">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className={`px-3 py-3 font-medium ${
                    header === "Actions"
                      ? "text-center"
                      : ""
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-white/10">
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="transition hover:bg-slate-50 dark:hover:bg-white/[0.04]"
              >
                {row.map(
                  (cell, cellIndex) => {
                    const isActionsColumn =
                      headers[
                        cellIndex
                      ] === "Actions";

                    return (
                      <td
                        key={cellIndex}
                        className={`px-3 py-4 ${
                          isActionsColumn
                            ? "text-center"
                            : ""
                        }`}
                      >
                        {isActionsColumn ? (
                          <div className="flex justify-center">
                            {cell}
                          </div>
                        ) : (
                          cell
                        )}
                      </td>
                    );
                  }
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}