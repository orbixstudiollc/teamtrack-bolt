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
  action?: React.ReactNode;
  rowKey?: string;
}

export default function DataTable<T = any>({ columns, data = [], title, className = "", children, action }: DataTableProps) {
  return (
    <div className={`bg-card border border-border ${className}`}>
      {(title || action) && (
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          {title && <h3 className="font-secondary text-[16px] font-semibold text-foreground">{title}</h3>}
          {action}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#0A0A0A]">
              {columns.map((col, i) => {
                const colKey = col.key || col.accessor || String(i);
                return (
                  <th key={colKey}
                    className={`px-6 py-4 text-${col.align || "left"} font-primary text-[11px] font-semibold uppercase tracking-[1px] text-muted-foreground border-b border-border ${col.className || ""}`}
                    style={col.width ? { width: col.width } : undefined}>
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
                  <tr key={i} className={`border-b border-border last:border-b-0 ${i % 2 === 0 ? "bg-card" : "bg-[#0D0D0D]"} hover:bg-muted/10 transition-colors`}>
                    {columns.map((col, j) => {
                      const colKey = col.key || col.accessor || String(j);
                      return (
                        <td key={colKey}
                          className={`px-6 py-4 text-${col.align || "left"} font-primary text-[13px] text-foreground ${col.className || ""}`}>
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
