/* eslint-disable @typescript-eslint/no-explicit-any */
interface Column {
  key?: string;
  accessor?: string;
  label?: string;
  header?: string;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: any, row: any) => React.ReactNode;
  className?: string;
}

interface DataTableProps {
  columns: Column[];
  data?: any[];
  title?: string;
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

export default function DataTable<T = any>({ columns, data = [], title, className = "", children }: DataTableProps) {
  return (
    <div className={`bg-card border border-border ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-foreground font-secondary text-base font-semibold">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col, i) => {
                const colKey = col.key || col.accessor || String(i);
                return (
                  <th
                    key={colKey}
                    className={`px-6 py-3 text-${col.align || "left"} text-muted-foreground font-primary text-xs font-medium tracking-wider uppercase ${col.className || ""}`}
                    style={col.width ? { width: col.width } : undefined}
                  >
                    {col.label || col.header || ""}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {children
              ? children
              : data.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-b-0 hover:bg-muted/20">
                    {columns.map((col, j) => {
                      const colKey = col.key || col.accessor || String(j);
                      return (
                        <td
                          key={colKey}
                          className={`px-6 py-4 text-${col.align || "left"} text-foreground font-primary text-[13px] ${col.className || ""}`}
                        >
                          {col.render ? col.render(row[colKey], row) : String(row[colKey] ?? "")}
                        </td>
                      );
                    })}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
