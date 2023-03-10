import clsx from 'clsx'
import { FunctionComponent } from 'react'

type TableProps = {
  className?: string
  data: any[][]
  headers: string[]
}

const Table: FunctionComponent<TableProps> = (props) => {
  return (
    <table className={clsx('border-collapse table-auto text-left w-full text-sm', props.className)}>
      <thead>
        <tr className="border-b border-surface-4">
          {props.headers.map((h) => (
            <th key={h} className="sticky py-2 pl-2 z-10 top-0 font-semibold ">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-b border-surface-4">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="py-2 pl-2 leading-6 whitespace-pre ">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
